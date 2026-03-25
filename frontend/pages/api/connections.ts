
type UserWithId = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
};

type SessionWithId = Session & { user?: UserWithId };
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import type { Session } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./lib/prisma";
// ...existing code...

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions) as SessionWithId | null;
  if (!session?.user?.id) return res.status(401).json({ error: "No autenticado" });

  const userId = session.user.id;
  const accounts = await prisma.account.findMany({
    where: { userId: Number(userId) },
  });

  res.json({ connections: accounts.map((a) => ({
    id: a.id,
    provider: a.provider,
    providerAccountId: a.providerAccountId,
    connectedAt: a.createdAt,
  })) });
}