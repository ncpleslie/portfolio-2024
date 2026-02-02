# [nickleslie.dev](https://nickleslie.dev)

A portfolio website created with [Astro](https://astro.build/) and deployed to [Vercel](https://vercel.com)

## Development

All content is stored in `YAML` files for ease of configuration. These can be found in the [src](./src/content) directory.

This application uses [resend](https://resend.com/) for handling emails when a message is sent through the contact field.
Ensure there is a `.env` in the root of the application.
Include the following:

```
RESEND_API_KEY:myresendapikey
RESEND_DOMAIN=mydomain.com
EMAIL_FROM=My domain <myemail@example.com>
EMAIL_TO=myemail@example.com
```

```
pnpm dev
pnpm build
pnpm lint
```
