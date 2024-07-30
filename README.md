# walacor-template

[Official Walacor Documentation](https://admindoc.walacor.com/admin-documentation/latest/the-platform-application-an-introduction)

## Getting Started

To create a new Walacor project, use the following command:

```bash
npx create-walacor-app <project-name>
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## About Walacor

An Enterprise level secure data platform with a database look and feel while integrating industry best practices, including blockchain, to provide a quantum resistant tamper-proof data repository.

### Introduction

The primary design goal of the document is to assist users with their knowledge of the Platform application.

However, there is a lot going on under the hood and it is important to gain some knowledge to make best use of The Platform.

### Immutability

Because the platform integrates blockchain, an important difference that one must be aware of is immutability. EVERYTHING (Data, Schema, Users, etc.) submitted to the platform is part of a never changing audit log that can never be deleted.

The Platform handles the heavy lifting of this for the user and, in general, allows the user to interact with it as one does with most databases. However, it is best to keep this in mind when doing things like Schema design.
