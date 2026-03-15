# PowerShell bootstrap script for Step 4 Admin
# Clona, instala dependencias, copia .env, genera migraciones y arranca backend/frontend

param(
    [string]$RepoUrl = "https://github.com/ezemario90-oss/multi-channel-sales-step4-admin.git",
    [string]$DestDir = "step4-admin",
    [int]$UseSSH = 0 # 0 = HTTPS, 1 = SSH
)

Write-Host "Iniciando bootstrap para Step 4 Admin"
Write-Host "Repositorio objetivo: $RepoUrl"
Write-Host "Destino local: $DestDir"
Write-Host "Usar SSH?: $UseSSH"

# Verificaciones básicas
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Write-Error "Git no está instalado."; exit 1 }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Error "Node.js no está instalado."; exit 1 }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Write-Error "npm no está instalado."; exit 1 }
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) { Write-Error "npx no está disponible."; exit 1 }

# Clonar o preparar carpeta
if (Test-Path "$DestDir/.git") {
    Write-Host "Ya existe el repositorio local en $DestDir, usando como base existente."
} else {
    Write-Host "Clonando repositorio..."
    if ($UseSSH -eq 1) {
        $RepoUrl = $RepoUrl -replace "https://github.com/", "git@github.com:" -replace ".git$", ".git"
    }
    git clone $RepoUrl $DestDir
}

Set-Location $DestDir

# Copiar .env de ejemplo si no existe
if (Test-Path "backend/.env") {
    Write-Host "backend/.env ya existe."
} elseif (Test-Path "backend/.env.example") {
    Write-Host "Copiando backend/.env.example a backend/.env"
    Copy-Item "backend/.env.example" "backend/.env"
} else {
    Write-Warning "No se encontró backend/.env.example. Crea backend/.env manualmente."
}

# Instalar dependencias
Write-Host "Instalando dependencias (backend)..."
Set-Location "backend"
npm install

Write-Host "Instalando dependencias (frontend)..."
Set-Location "../frontend"
npm install
Set-Location ".."

# Prisma: generar cliente y migrar (si hay DATABASE_URL)
Write-Host "Generando Prisma y migraciones (si procede)..."
Set-Location "backend"
npx prisma generate
if (Select-String -Path ".env" -Pattern "DATABASE_URL") {
    Write-Host "DATABASE_URL encontrada. Ejecutando migraciones..."
    npx prisma migrate dev --name init
} else {
    Write-Warning "DATABASE_URL no encontrada en backend/.env. No se ejecutarán migraciones. Configura DATABASE_URL y vuelve a migrar manualmente."
}
Set-Location ".."

# Iniciar el stack (en segundo plano)
Write-Host "Iniciando backend en segundo plano..."
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "backend" -RedirectStandardOutput "backend.log" -RedirectStandardError "backend.log" -WindowStyle Hidden

Write-Host "Iniciando frontend admin en segundo plano..."
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "frontend" -RedirectStandardOutput "frontend.log" -RedirectStandardError "frontend.log" -WindowStyle Hidden

Write-Host "Verifica logs si es necesario:"
Write-Host "Backend log: $DestDir/backend.log"
Write-Host "Frontend log: $DestDir/frontend.log"

Write-Host "Verificación rápida (opcional):"
Write-Host " Salud: curl http://localhost:3000/health"
Write-Host " Admin productos (GET): curl http://localhost:3000/admin/products"

Write-Host "Todo listo. Para detener procesos, ciérralos desde el Administrador de tareas o usa Stop-Process."
