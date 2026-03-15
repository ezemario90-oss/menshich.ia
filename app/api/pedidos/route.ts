import { NextResponse } from "next/server";

export async function GET() {
  const pedidos = [
    { id: 1, cliente: "Juan Pérez", estado: "Entregado", total: "$120.00" },
    { id: 2, cliente: "Ana Gómez", estado: "Pendiente", total: "$80.00" },
    { id: 3, cliente: "Luis Torres", estado: "Cancelado", total: "$50.00" },
  ];
  return NextResponse.json(pedidos);
}
