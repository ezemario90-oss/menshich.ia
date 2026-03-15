#!/usr/bin/env bash
set -euo pipefail

# Configuración por defecto
REPO_URL="${1:-https://github.com/ezemario90-oss/multi-channel-sales-step4-admin.git}"
DEST_DIR="${2:-step4-admin}"
USE_SSH="${3:-0}"  # 0 = HTTPS (default), 1 = SSH

echo "Iniciando bootstrap para Step 4 Admin"
echo "Repositorio objetivo: ${REPO_URL}"
echo "Destino local: ${DEST_DIR}"
echo "Usar SSH?: ${USE_SSH}"

# Verificaciones básicas
command -v git >/dev/null 2>&1 || { echo "Git no está instalado. Instálalo y vuelve a intentarlo."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js no está instalado. Instálalo y vuelve a intentarlo."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm no está instalado. Instálalo y vuelve a intentarlo."; exit 1; }
command -v npx >/dev/null 2>&1 || { echo "npx no está disponible. Asegúrate de que npm incluyó npx."; exit 1; }

# Clonar o preparar carpeta
if [ -d "${DEST_DIR}/.git" ]; then
  echo "Ya existe el repositorio local en ${DEST_DIR}, usando como base existente."
else
  echo "Clonando repositorio..."
  if [ "${USE_SSH}" -eq 1 ]; then
    # Convertir URL HTTPS a SSH si es necesario
    if [[ "${REPO_URL}" =~ ^https://github.com/.+/.+\.git$ ]]; then
      OWNER=$(echo "${REPO_URL}" | awk -F/ '{print $4}')
      REPO=$(echo "${REPO_URL}" | awk -F/ '{print $5}' | sed 's/\.git$//')
      REMOTE_SSH="git@github.com:${OWNER}/${REPO}.git"
    else
      REMOTE_SSH="${REPO_URL}"
    fi
    git clone "${REMOTE_SSH}" "${DEST_DIR}"
  else
    git clone "${REPO_URL}" "${DEST_DIR}"
  fi
fi

cd "${DEST_DIR}"

# Copiar .env de ejemplo si no existe
if [ -f backend/.env ]; then
  echo "backend/.env ya existe."
else
  if [ -f backend/.env.example ]; then
    echo "Copiando backend/.env.example a backend/.env"
    cp backend/.env.example backend/.env
  else
    echo "ATENCIÓN: No se encontró backend/.env.example. Crea backend/.env manualmente."
  fi
fi

# Instalar dependencias
echo "Instalando dependencias (backend)..."
cd backend
npm install

echo "Instalando dependencias (frontend)..."
cd ../frontend
npm install
cd ..

# Prisma: generar cliente y migrar (si hay DATABASE_URL)
echo "Generando Prisma y migraciones (si procede)..."
cd backend
npx prisma generate || true
if grep -q "DATABASE_URL" backend/.env; then
  echo "DATABASE_URL encontrada. Ejecutando migraciones..."
  npx prisma migrate dev --name init || true
else
  echo "DATABASE_URL no encontrada en backend/.env. No se ejecutarán migraciones. Configura DATABASE_URL y vuelve a migrar manualmente."
fi
cd ..

# Iniciar el stack (en segundo plano)
echo "Iniciando backend en segundo plano..."
( cd backend && npm run dev > backend.log 2>&1 & echo $! > backend.pid )

echo "Iniciando frontend admin en segundo plano..."
( cd frontend && npm run dev > frontend.log 2>&1 & echo $! > frontend.pid )

echo "Verifica logs si es necesario:"
echo "Backend log: ${DEST_DIR}/backend.log"
echo "Frontend log: ${DEST_DIR}/frontend.log"

echo "Verificación rápida (opcional):"
echo " Salud: curl http://localhost:3000/health"
echo " Admin productos (GET): curl http://localhost:3000/admin/products"

echo "Todo listo. Si necesitas detener:"
echo "kill \$(cat ${DEST_DIR}/backend.pid)  # detiene backend"
echo "kill \$(cat ${DEST_DIR}/frontend.pid) # detiene frontend"
