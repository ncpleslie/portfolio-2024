import z from "zod";
import type { APIRoute } from "astro";
import type { ContactResponse } from "../../types/contact_response";
import { Resend } from "resend";
import { env } from "../../env/server";

const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } = env;

const contactSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "name is required").email(),
    message: z
      .string({ required_error: "Message is required" })
      .min(1, "Message is required"),
  })
  .required();

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const contactFormData = Object.fromEntries(data.entries());

  const parseResult = contactSchema.safeParse(contactFormData);
  if (!parseResult.success) {
    const issues = Object.values(
      parseResult.error.flatten().fieldErrors,
    ).flat();
    console.log(issues);
    return new Response(
      JSON.stringify({
        message: `Missing required fields`,
        issues: issues,
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
