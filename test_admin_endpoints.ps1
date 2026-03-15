# PowerShell script para pruebas automáticas de endpoints admin y health
# Ejecuta requests a los endpoints clave y muestra resultados

$baseUrl = "http://localhost:3000"

Write-Host "Verificando /health..."
Invoke-RestMethod "$baseUrl/health" | ConvertTo-Json | Write-Host

Write-Host "Listando productos (admin)..."
Invoke-RestMethod "$baseUrl/admin/products" | ConvertTo-Json | Write-Host

Write-Host "Creando producto de ejemplo (admin)..."
$payload = @{ name = "Zapatos de prueba"; description = "desc"; priceCents = 9999; imageUrl = ""; variants = @(@{ size = "42"; stock = 5 }) } | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/admin/products" -Method Post -ContentType "application/json" -Body $payload | ConvertTo-Json | Write-Host

Write-Host "Listando settings de canales..."
Invoke-RestMethod "$baseUrl/admin/settings" | ConvertTo-Json | Write-Host

Write-Host "Pruebas automáticas finalizadas."
