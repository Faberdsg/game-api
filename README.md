🎮 Game-Api

📋 API REST construida con NestJS que permite gestionar partidas y jugadores en un juego multijugador.  
Actualmente se encuentra en su primera fase, enfocada en operaciones básicas de creación, listado, actualización y eliminación.

🚀 Tecnologías utilizadas

✅ NestJS
✅ TypeScript
✅ PostgreSQL (NeonTech)
✅ Postman (para pruebas)

⚙️ Instalación y uso

1. Clona el repositorio:

git clone https://github.com/Faberdsg/game-api.git
cd game-api

2. Instala dependencias:
   npm install

3. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

PORT=3000
DATABASE_URL=postgresql://<usuario>:<contraseña>@<url-neon>/<nombre_db>

4. Ejecuta el proyecto en modo desarrollo:

npm run start:dev

🧪 Pruebas con Postman

Puedes probar los endpoints usando Postman. Opcionalmente, puedes importar la colección Game-Api.postman_collection.json incluida en la carpeta docs.

Pasos para importar:

1. Abre Postman

2. Ve a "Collections" → "Import"

3. Selecciona el archivo .json exportado

📁 Endpoints disponibles

Método Ruta Descripción
GET /games (Lista todas las partidas)
POST /games (Crea una nueva partida)
GET /players (Lista todos los jugadores)
POST /players (Crea un nuevo jugador)
PUT /players/:id (Actualiza un jugador existente)
DELETE /players/:id (Elimina un jugador por ID)

🧠 Notas

La base de datos está alojada en NeonTech (PostgreSQL en la nube).
Se aplicaron validaciones usando DTOs y Pipes de NestJS.

👤 Autor
Faber Serna
GitHub: [enlace próximamente]

📌 Estado del proyecto
🟡 Primera fase completada
