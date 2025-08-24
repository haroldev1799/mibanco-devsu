# FrontendHeroesApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

### ⚙️ Dockerfile
Se usan **2 etapas** (multi-stage build):

1. **Builder (Node.js)**  
   - Instala dependencias (`npm ci`)  
   - Instala Angular CLI  
   - Compila Angular (`npm run build -- --configuration production`)

2. **Runtime (Nginx)**  
   - Usa **nginx:stable-alpine** (ligero y rápido)  
   - Genera un **certificado SSL autofirmado**  
   - Copia la carpeta `dist/` compilada a `/usr/share/nginx/html`  
   - Configura Nginx para servir la SPA (Single Page Application).

```dockerfile
# ─── Stage 1: Builder ─────────────────────────────
FROM node:22.18.0-slim AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli@19
COPY . .
RUN npm run build -- --configuration production

# ─── Stage 2: Runtime con Nginx ──────────────────
FROM nginx:stable-alpine

RUN apk add --no-cache openssl
RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/selfsigned.key \
  -out /etc/nginx/ssl/selfsigned.crt \
  -subj "/CN=localhost"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/frontend-heroes-app /usr/share/nginx/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
