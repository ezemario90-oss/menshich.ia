# Script PowerShell para pruebas automáticas mengsinch.ia
$baseUrl = "http://localhost:3000"

Write-Host "Verificando /health..."
Invoke-RestMethod "$baseUrl/health" | ConvertTo-Json | Write-Host

Write-Host "Login admin..."
$loginPayload = @{ username = "admin"; password = "admin123" } | ConvertTo-Json
$loginResult = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -ContentType "application/json" -Body $loginPayload
$token = $loginResult.token
Write-Host "Token JWT obtenido: $token"

Write-Host "Listando productos..."
Invoke-RestMethod "$baseUrl/admin/products" -Headers @{ Authorization = "Bearer $token" } | ConvertTo-Json | Write-Host

Write-Host "Creando producto de ejemplo..."
$productPayload = @{ name = "Producto test"; description = "desc"; priceCents = 9999; imageUrl = ""; variants = @(@{ size = "42"; stock = 5 }) } | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/admin/products" -Method Post -ContentType "application/json" -Headers @{ Authorization = "Bearer $token" } -Body $productPayload | ConvertTo-Json | Write-Host

Write-Host "Listando settings de canales..."
Invoke-RestMethod "$baseUrl/admin/settings" -Headers @{ Authorization = "Bearer $token" } | ConvertTo-Json | Write-Host

Write-Host "Listando pedidos..."
Invoke-RestMethod "$baseUrl/admin/orders" -Headers @{ Authorization = "Bearer $token" } | ConvertTo-Json | Write-Host

Write-Host "Pruebas automáticas finalizadas."
