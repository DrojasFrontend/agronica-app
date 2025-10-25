# 🚀 Guía de Configuración Git

## Inicializar Git y Subir a GitHub

### 1. Inicializar repositorio local

```bash
cd /Users/daniel/Documents/agronica-app
git init
```

### 2. Agregar archivos al staging

```bash
git add .
```

### 3. Primer commit

```bash
git commit -m "Initial commit: KOZ SmartSoil Dashboard v1.0.0"
```

### 4. Crear repositorio en GitHub

Ve a [https://github.com/new](https://github.com/new) y crea un nuevo repositorio:
- Nombre: `agronica-app`
- Descripción: `Dashboard de riego inteligente para agricultura de precisión`
- **NO inicialices con README, .gitignore o LICENSE** (ya los tenemos)

### 5. Conectar con GitHub

```bash
git remote add origin https://github.com/TU_USUARIO/agronica-app.git
```

O si usas SSH:

```bash
git remote add origin git@github.com:TU_USUARIO/agronica-app.git
```

### 6. Renombrar rama principal a main (si es necesario)

```bash
git branch -M main
```

### 7. Push inicial

```bash
git push -u origin main
```

---

## Comandos Git Comunes

### Ver estado de archivos
```bash
git status
```

### Ver cambios
```bash
git diff
```

### Agregar archivos específicos
```bash
git add archivo.js
git add components/
```

### Commit con mensaje
```bash
git commit -m "Add: nueva funcionalidad"
```

### Push cambios
```bash
git push
```

### Pull cambios
```bash
git pull
```

### Ver historial
```bash
git log --oneline
```

### Crear nueva rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### Cambiar de rama
```bash
git checkout main
```

### Merge de rama
```bash
git checkout main
git merge feature/nueva-funcionalidad
```

---

## Estructura de Branches Recomendada

```
main (producción)
└── develop (desarrollo)
    ├── feature/nuevas-funcionalidades
    ├── fix/correcciones
    └── hotfix/correcciones-urgentes
```

### Workflow recomendado:

1. **Feature nueva:**
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/nombre-feature
   # ... trabajas ...
   git add .
   git commit -m "Add: descripción"
   git push -u origin feature/nombre-feature
   # ... crear Pull Request a develop ...
   ```

2. **Bug fix:**
   ```bash
   git checkout develop
   git checkout -b fix/descripcion-bug
   # ... arreglas ...
   git commit -m "Fix: descripción"
   git push -u origin fix/descripcion-bug
   # ... crear Pull Request a develop ...
   ```

3. **Hotfix urgente:**
   ```bash
   git checkout main
   git checkout -b hotfix/descripcion
   # ... arreglas ...
   git commit -m "Hotfix: descripción"
   git push -u origin hotfix/descripcion
   # ... crear Pull Request a main ...
   ```

---

## Convenciones de Commit

Usa prefijos descriptivos:

- `Add:` - Nueva funcionalidad
- `Update:` - Actualización de funcionalidad existente
- `Fix:` - Corrección de bug
- `Refactor:` - Refactorización de código
- `Style:` - Cambios de estilo (CSS, formato)
- `Docs:` - Documentación
- `Test:` - Pruebas
- `Chore:` - Mantenimiento, configuración

Ejemplos:
```bash
git commit -m "Add: componente de alertas"
git commit -m "Fix: cálculo incorrecto de humedad"
git commit -m "Update: mejora de diseño responsive"
git commit -m "Docs: actualización de README"
git commit -m "Refactor: simplificación de ChartSection"
git commit -m "Style: ajuste de colores en métricas"
```

---

## .gitignore

El proyecto ya incluye un `.gitignore` que excluye:

- ✅ `node_modules/` - Dependencias
- ✅ `.next/` - Build de Next.js
- ✅ `.env*.local` - Variables de entorno locales
- ✅ `.DS_Store` - Archivos del sistema macOS
- ✅ `*.log` - Archivos de log
- ✅ `.vercel/` - Configuración de Vercel

---

## Verificar antes de subir

### Checklist:

```bash
# 1. Verifica que no hay archivos sensibles
git status

# 2. Revisa los cambios
git diff

# 3. Asegúrate de que el build funciona
npm run build

# 4. Verifica que no hay errores de lint
npm run lint

# 5. Todo bien? Sube!
git push
```

---

## Archivos del Repositorio

✅ **Incluidos en Git:**
- `components/` - Componentes React
- `data/` - Datos JSON
- `pages/` - Páginas Next.js
- `styles/` - Estilos CSS
- `public/` - Assets estáticos
- `package.json` - Dependencias
- `next.config.js` - Configuración
- `README.md` - Documentación
- `LICENSE` - Licencia MIT
- `.gitignore` - Archivos excluidos
- `.gitattributes` - Configuración Git
- `.editorconfig` - Configuración del editor
- `CONTRIBUTING.md` - Guía de contribución
- `CHANGELOG.md` - Registro de cambios

❌ **Excluidos de Git:**
- `node_modules/` - Dependencias (se instalan con npm)
- `.next/` - Build (se genera)
- `.env.local` - Variables locales (secretas)
- Archivos de sistema y logs

---

## Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/agronica-app.git
```

### Error: "failed to push"
```bash
git pull --rebase origin main
git push
```

### Deshacer último commit (sin perder cambios)
```bash
git reset --soft HEAD~1
```

### Ver remotes configurados
```bash
git remote -v
```

---

¡Listo! Tu proyecto está preparado para Git 🎉

