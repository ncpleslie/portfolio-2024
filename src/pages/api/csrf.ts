import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const csrfToken = crypto.randomUUID();

  cookies.set("csrf_token", csrfToken, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return new Response(JSON.stringify({ token: csrfToken }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
