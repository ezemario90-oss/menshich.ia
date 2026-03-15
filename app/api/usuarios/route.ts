import { NextResponse } from "next/server";

export async function GET() {
  const usuarios = [
    { id: 1, nombre: "Juan Pérez", correo: "juan@cliente.com", rol: "Admin" },
    { id: 2, nombre: "Ana Gómez", correo: "ana@cliente.com", rol: "Usuario" },
    { id: 3, nombre: "Luis Torres", correo: "luis@cliente.com", rol: "Usuario" },
  ];
  return NextResponse.json(usuarios);
}
