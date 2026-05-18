# Production Deployment

This project is a Laravel 12 + Inertia React application. The most reliable deployment path is a Docker-capable host such as Render, Railway, Fly.io, or a VPS. Vercel is not recommended for the full application because the backend expects a persistent PHP/Laravel runtime, database-backed sessions/cache/queues, and container-style startup.

## Recommended Target

Use Render or Railway with the production `Dockerfile` at the repository root.

The development `compose.yaml` is intentionally unchanged and should still be used for local work.

## Required Services

- Web service built from `Dockerfile`
- External MySQL database
- Real SMTP provider for mail

## Required Environment Variables

Start from `src/.env.production.example`.

Important values to set in the host dashboard:

- `APP_KEY`: generate locally with `php artisan key:generate --show`
- `APP_URL`: your deployed HTTPS URL
- `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM_ADDRESS`

Recommended production values:

```env
APP_ENV=production
APP_DEBUG=false
LOG_CHANNEL=stderr
DB_CONNECTION=mysql
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
RUN_MIGRATIONS=true
RUN_CORE_SEEDERS=true
```

## Render

1. Push the repository to GitHub.
2. Create a new Render Blueprint or Web Service.
3. Use the root directory `04_Student_Article_Publication_Platform` if deploying from the parent repository.
4. Select Docker runtime.
5. Add a MySQL database from your preferred provider.
6. Add all production environment variables.
7. Deploy.

The included `render.yaml` gives Render a starting point, but database secrets and `APP_KEY` still need to be set in the dashboard.

## Railway

1. Create a new Railway project from GitHub.
2. Set the service root to `04_Student_Article_Publication_Platform`.
3. Railway should detect the `Dockerfile`.
4. Add a MySQL service or connect an external MySQL database.
5. Add the production environment variables.
6. Deploy.

Railway provides a `PORT` variable automatically. The container startup script configures Apache to listen on that port.

## First Deploy Checklist

- Confirm the app opens at `/`.
- Register/login with a test account.
- Confirm migrations ran.
- Submit and publish a test article.
- Send a password reset email using the real SMTP provider.
- Check logs for permission, database, or mail errors.

## Notes

Uploaded files stored on the local filesystem may not persist across redeploys on many container hosts. For long-term production use, move uploads to S3-compatible storage and set `FILESYSTEM_DISK=s3`.
