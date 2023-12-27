# Clarity

Your Not Local Brain for your Digital Classroom.

## What is Clarity?

Clarity is a self host-able Dockerized application
that allows you to create a digital classroom
for your students.

## Tech Stack

Clarity uses a very popular typescript stack known as
[Create T3 App](https://create.t3.app).

It consists of the following technologies:

- [Next.js](https://nextjs.org)
- [TypeScript](https://typescriptlang.org)
- [TRPC](https://trpc.io)
- [Prisma](https://prisma.io)
- [PostgreSQL](https://postgresql.org)
- [TailwindCSS](https://tailwindcss.com)
- [Docker](https://docker.com)

## Getting Started

You can get started with Clarity locally by first cloning the repository:

```bash
git clone https://github.com/newtoallofthis123/clarity.git
```

Next, fill in the .env.sample file with your own values and rename it to .env.

```bash
DATABASE_URL="file:./db.sqlite"
NEXTAUTH_URL="http://0.0.0.0:3000"
EMAIL_SERVER="smtp://smtp.your-email.com"
```

Then, you can run the following command to start the development server:

```bash
npm i
npm run dev
```

This will perform all the database migrations using the prisma cli and start the development server.

## Building to Production

The easier way to get started is to use the docker-compose file provided in the repository.

```bash
docker-compose up -d
```

This will create a production build of the application and start the server.

## Contributing

If you would like to contribute to Clarity, please feel free to open a pull request or issue.

## License

Clarity is licensed under the MIT License. More under [LICENSE](LICENSE).

## Contributors

- Ishan Joshi
- Mamillapalli Prudhvi
- Chinmay Venu Kishore
- G Nikash

## Made for Mark XXIV