# Définir l'image de base pour la phase de build
FROM node:lts as build

# Définir le dossier de travail
WORKDIR /app

# Copier le package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances du projet
RUN yarn install

# Copier le reste du code source de l'application
COPY . .

# Construire l'application pour production
RUN yarn build

# Début de la phase de production, utilisation de Nginx pour servir les fichiers statiques
FROM nginx:stable-alpine

# Copier les fichiers statiques de la phase de build
COPY --from=build /app/build /usr/share/nginx/html

# Copier le fichier de configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx au démarrage du conteneur
CMD ["nginx", "-g", "daemon off;"]
