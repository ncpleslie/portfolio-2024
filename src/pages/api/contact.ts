import z from "zod";
import type { APIRoute } from "astro";
import type { ContactResponse } from "../../types/contact_response";
import { Resend } from "resend";
import { env } from "../../env/server";

const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } = env;

const contactSchema = z.object({
  name: z.string().min(1, "name is required").max(100),
  email: z.string().min(1, "email is required").email(),
  message: z
    .string({ required_error: "message is required" })
    .min(1, "message is required")
    .max(5000),
  csrf_token: z.string().min(1, "security token is missing"),
  form_timestamp: z.string().min(1, "form timestamp is missing"),
  website: z.string().optional().default(""), // Honeypot field
});

const MIN_FORM_SUBMIT_TIME = 3000; // 3 seconds minimum

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const contactFormData = Object.fromEntries(data.entries());

  const parseResult = contactSchema.safeParse(contactFormData);
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;

    // Only return user-facing field errors (exclude security fields)
    const userFacingErrors = [];
    if (errors.name) userFacingErrors.push(...errors.name);
    if (errors.email) userFacingErrors.push(...errors.email);
    if (errors.message) userFacingErrors.push(...errors.message);

    // If security fields are missing, show generic error instead of exposing internals
    if (errors.csrf_token || errors.form_timestamp) {
      return new Response(
        JSON.stringify({
          message: "Please refresh the page and try again",
        } satisfies ContactResponse),
        { status: 400 },
      );
    }

    return new Response(
      JSON.stringify({
        message:
          userFacingErrors.length > 0
            ? "Please check your input"
            : "Missing required fields",
        issues: userFacingErrors,
      } satisfies ContactResponse),
      { status: 400 },
    );
  }

  // CSRF Token Validation (Double Submit Cookie Pattern)
  const csrfCookie = cookies.get("csrf_token")?.value;
  if (!csrfCookie || csrfCookie !== parseResult.data.csrf_token) {
    return new Response(
      JSON.stringify({
        message: "Invalid security token",
      } satisfies ContactResponse),
      { status: 403 },
    );
  }

  // Honeypot Check - if filled, it's likely a bot
  if (parseResult.data.website) {
    return new Response(
      JSON.stringify({
        message: "Invalid submission",
      } satisfies ContactResponse),
      { status: 400 },
    );
  }

  // Time-based Bot Detection - form submitted too quickly
  const formTimestamp = parseInt(parseResult.data.form_timestamp);
  const currentTime = Date.now();
  const timeDiff = currentTime - formTimestamp;

  if (timeDiff < MIN_FORM_SUBMIT_TIME) {
    return new Response(
      JSON.stringify({
        message: "Please take your time filling out the form",
      } satisfies ContactResponse),
      { status: 400 },
    );
  }

  // Additional sanity check for timestamp not being in the future
  if (formTimestamp > currentTime) {
    return new Response(
      JSON.stringify({
        message: "Invalid form submission",
      } satisfies ContactResponse),
      { status: 400 },
    );
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New message from nickleslie.dev`,
      html: `From: ${parseResult.data.name}<br><br>
      Email: ${parseResult.data.email}<br><br>
      Message: ${parseResult.data.message}<br><br>`,
    });

    return new Response(
      JSON.stringify({
        message: "Success!",
      } satisfies ContactResponse),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "An unknown error has occurred",
      } satisfies ContactResponse),
      { status: 500 },
    );
  }
};
