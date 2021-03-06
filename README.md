[https://vercel.com/guides/nextjs-prisma-postgres](https://vercel.com/guides/nextjs-prisma-postgres)
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## See DB
```bash
npx prisma studio
```

## Create tables in database
```bash
npx prisma db push
```

## Run after change schema
```bash
npx prisma generate
```

## Example raw query w/ prisma
```js
const result = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${email}
```
[more info](https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access)
