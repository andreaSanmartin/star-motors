# --- Etapa 1: compilar Angular (Angular 11 requiere Node 14) ---
FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json ./
# jspdf descarga FileSaver.js desde GitHub: forzar HTTPS en lugar de SSH
RUN git config --global url."https://github.com/".insteadOf ssh://git@github.com/ \
 && npm ci
COPY . .
# Por defecto compila con src/environments/environment.ts (backends en localhost).
# Usa --build-arg NG_CONFIGURATION=production para usar environment.prod.ts
ARG NG_CONFIGURATION=
RUN if [ -n "$NG_CONFIGURATION" ]; then npx ng build --configuration=$NG_CONFIGURATION; else npx ng build; fi

# --- Etapa 2: servir los archivos estáticos con Nginx ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
