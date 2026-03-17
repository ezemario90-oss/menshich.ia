import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";

import type { Session } from "next-auth";
import prisma from "../../src/lib/prisma";

  const session = await getServerSession(req, res, authOptions) as Session | null;
  if (!session?.user?.id) return res.status(401).json({ error: "No autenticado" });

  const userId = session.user.id;
  const accounts = await prisma.account.findMany({
    where: { userId },
  });

  res.json({ connections: accounts.map((a) => ({
    id: a.id,
    provider: a.provider,
    providerAccountId: a.providerAccountId,
    connectedAt: a.createdAt,
  })) });
}