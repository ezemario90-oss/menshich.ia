import prisma from "../../../src/lib/prisma";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, phoneNumberId, accessToken } = req.body;
  if (!userId || !phoneNumberId || !accessToken) return res.status(400).json({ error: "Parámetros faltantes" });

  const acct = await prisma.account.create({
    data: {
      userId,
      provider: "whatsapp",
      providerAccountId: phoneNumberId,
      access_token: accessToken,
    },
  });
  res.json({ ok: true, id: acct.id });
}