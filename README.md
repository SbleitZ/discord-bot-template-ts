# Instalación
  1. Clona el proyecto usando el siguiente comando:
   ```bash
    git clone https://github.com/SbleitZ/discord-bot-template-ts.git
   ```
  2. Accede al archivo:

   ```bash
   cd discord-bot-template-ts
   ```
  3. Instala los paquetes:
   ```bash
   npm install
   ```
  4. Inicia el modo desarrollador:
   ```bash
   npm run dev
   ```
## Comandos
- npm run build
- npm run deploy:commands
- npm run dev -> Iniciaras el bot en modo Desarrollador
- npm run start -> Iniciaras el bot en modo producción

### Si vienes del video
1. Actualiza los paquetes con este comando
Actualiza los paquetes del sistema:
- sudo apt update
- clear
Instala nvm:
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
recarga el perfil de tu terminal
- source ~/.bashrc
Comprobar si esta instalado
- nvm --versión
Instalamos node
- nvm install --lts
node or defecto
- nvm alias default node
verificamos instalacion
- node -v
- npm -v
### Manten activo el bot
nohup npm run start > output.log 2>&1 &