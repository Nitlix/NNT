//==================================================================
//
// Prisma Client
// Run "npx prisma db push" to update the database records.
// Run "npx prisma generate" to update the Prisma Client types.
// Run "npx prisma studio" to open the Prisma Studio.
//
//==================================================================

import { PrismaClient } from "@/prisma/generated/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
