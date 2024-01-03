import type { APIRoute } from "astro";
import type { ContactResponse } from "../../types/contact_response";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      } satisfies ContactResponse),
      { status: 400 },
    );
  }
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    await resend.emails.send({
      from: import.meta.env.EMAIL_FROM,
      to: import.meta.env.EMAIL_TO,
      subject: `New message from nickleslie.dev`,
      html: `From: ${name}<br><br>
      Email: ${email}<br><br>
      Message: ${message}<br><br>`,
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
        message: "Error!",
      } satisfies ContactResponse),
      { status: 500 },
    );
  }
};
