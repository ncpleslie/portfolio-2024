import type { APIRoute } from "astro";
import type { ContactResponse } from "../../types/contact_response";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
        statusCode: 400,
      } as ContactResponse),
      { status: 400 },
    );
  }
  console.log("We have data", name, email, message);
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
      statusCode: 200,
    } as ContactResponse),
    { status: 200 },
  );
};
