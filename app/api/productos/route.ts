import { NextResponse } from "next/server";

export async function GET() {
  // Mock de productos
  const productos = [
    { id: 1, nombre: "Producto A", stock: 120, precio: "$25.00" },
    { id: 2, nombre: "Producto B", stock: 80, precio: "$40.00" },
    { id: 3, nombre: "Producto C", stock: 50, precio: "$15.00" },
  ];
  return NextResponse.json(productos);
}
