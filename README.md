# 🎮 PLAYMARKET - API Back-End

Une API REST complète pour une marketplace de jeux vidéo, développée avec Node.js, Express, PostgreSQL et MongoDB.

## 📋 Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Architecture](#architecture)
- [Routes API](#routes-api)
- [Sécurité](#sécurité)
- [Technologies](#technologies)

---

## 🛠️ Prérequis

- **Node.js** >= 16.x
- **PostgreSQL** >= 12.x
- **MongoDB** >= 5.x
- **npm** ou **yarn**

---

## 📦 Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd PLAYMARKET

# Installer les dépendances
npm install
```

---

## ⚙️ Configuration

### 1. Créer le fichier `.env`

```bash
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/playmarket

# PostgreSQL Configuration
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=playmarket
PG_USER=postgres
PG_PASSWORD=your_postgres_password

# JWT Secret (pour l'authentification)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# JWT Refresh Secret
JWT_REFRESH_SECRET=your_super_secret_refresh_jwt_key_change_this_in_production
```

### 2. Initialiser la base de données PostgreSQL

```bash
# Créer la base de données
psql -U postgres
CREATE DATABASE playmarket;

# Importer le schéma
psql -U postgres -d playmarket < BDD/playmarket
```

### 3. Ajouter le champ 'role' dans PostgreSQL

```bash
# Exécuter la migration
psql -U postgres -d playmarket < BDD/migration_add_role.sql
```

### 4. Importer les données MongoDB (optionnel)

```bash
mongoimport --db playmarket --collection gameDetails --file BDD/playmarket.gameDetails.json --jsonArray
mongoimport --db playmarket --collection activityLogs --file BDD/playmarket.activityLogs.json --jsonArray
mongoimport --db playmarket --collection recommendations --file BDD/playmarket.recommendations.json --jsonArray
```

---

## 🚀 Lancement

```bash
# Mode développement avec nodemon
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:3000`

---

## 🏗️ Architecture

```
PLAYMARKET/
├── config/
│   ├── db.mongo.js          # Configuration MongoDB
│   └── db.postgres.js       # Configuration PostgreSQL
├── controller/              # Contrôleurs (logique de routing)
│   ├── Authcontroller.js
│   ├── Usercontroller.js
│   ├── Productscontroller.js
│   ├── Profilecontroller.js
│   └── Ordercontroller.js
├── services/                # Business Logic
│   ├── Auth.service.js
│   ├── User.service.js
│   ├── Products.service.js
│   ├── Profile.service.js
│   └── Order.service.js
├── model/                   # Modèles de données
│   ├── User.model.js        # PostgreSQL
│   ├── Products.model.js    # PostgreSQL
│   ├── Order.model.js       # PostgreSQL
│   ├── OrderItem.model.js   # PostgreSQL
│   └── Profile.model.js     # MongoDB
├── routes/                  # Définition des routes
│   ├── auth.Routes.js
│   ├── user.Routes.js
│   ├── products.Routes.js
│   ├── profile.Routes.js
│   └── order.Routes.js
├── middlewares/             # Middlewares personnalisés
│   ├── auth.middleware.js
│   ├── roles.middleware.js
│   ├── validation.middleware.js
│   └── error.middleware.js
├── BDD/                     # Dumps et migrations
├── server.js                # Point d'entrée
├── package.json
└── .env
```

### Séparation des couches (MVC + Services)

- **Routes** : Définissent les endpoints et appliquent les middlewares
- **Controllers** : Gèrent les requêtes/réponses HTTP
- **Services** : Contiennent la logique métier
- **Models** : Accèdent aux bases de données

---

## 🌐 Routes API

### 🔓 Routes Publiques

#### Status
- `GET /api/status` - Vérifier l'état du serveur

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Rafraîchir le token

#### Jeux
- `GET /api/games` - Liste de tous les jeux
- `GET /api/games/:id` - Détails d'un jeu

#### Détails des jeux (MongoDB)
- `GET /api/mongo/gamedetails` - Tous les détails
- `GET /api/mongo/gamedetails/:gameId` - Détails d'un jeu

---

### 🔒 Routes Protégées (Authentification requise)

#### Profil utilisateur
- `GET /api/auth/me` - Informations de l'utilisateur connecté

#### Activités
- `POST /api/mongo/activity` - Logger une activité
- `GET /api/mongo/activity/:userId` - Activités d'un utilisateur

#### Recommandations
- `GET /api/mongo/recommendations/:userId` - Recommandations d'un utilisateur
- `PUT /api/mongo/recommendations/:userId` - Mettre à jour les recommandations

#### Commandes
- `GET /api/orders/:id` - Détails d'une commande
- `GET /api/orders/user/:userId` - Commandes d'un utilisateur
- `POST /api/orders` - Créer une commande

---

### 👑 Routes Admin uniquement

#### Utilisateurs
- `GET /api/users` - Liste de tous les utilisateurs
- `GET /api/users/:id` - Détails d'un utilisateur

#### Jeux
- `POST /api/games` - Créer un jeu
- `PATCH /api/games/:id/stock` - Mettre à jour le stock

#### Détails des jeux
- `POST /api/mongo/gamedetails` - Créer des détails
- `PUT /api/mongo/gamedetails/:gameId` - Modifier des détails

#### Activités
- `GET /api/mongo/activity` - Toutes les activités

#### Recommandations
- `GET /api/mongo/recommendations` - Toutes les recommandations

#### Commandes
- `GET /api/orders` - Toutes les commandes

---

## 🔐 Sécurité

### 1. JWT Authentication
- **Access Token** : Expire dans 15 minutes
- **Refresh Token** : Expire dans 7 jours
- Header requis : `Authorization: Bearer <token>`

### 2. Hashage des mots de passe
- Utilisation de **bcrypt** avec salt rounds = 10

### 3. Rate Limiting
- **Global** : 100 requêtes / 15 min par IP
- **Auth** : 5 tentatives / 15 min par IP

### 4. CORS
- Configuré pour accepter les requêtes cross-origin
- Headers autorisés : `Origin, X-Requested-With, Content-Type, Accept, Authorization`

### 5. Validation des données
- Utilisation d'**express-validator**
- Validation côté serveur de tous les inputs

### 6. Gestion des rôles
- **user** : Accès de base
- **admin** : Accès complet

### 7. Gestion centralisée des erreurs
- Toutes les erreurs passent par le middleware `errorHandler`
- Logs détaillés pour le débogage

---

## 🛡️ Exemples d'utilisation

### Inscription

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Connexion

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Récupérer les jeux (route protégée admin)

```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <votre_token>" \
  -d '{
    "title": "Elden Ring",
    "price": 59.99,
    "stock": 100
  }'
```

---

## 🧪 Technologies utilisées

| Technologie | Rôle |
|------------|------|
| **Express.js** | Framework web Node.js |
| **PostgreSQL** | Base de données relationnelle (Users, Games, Orders) |
| **MongoDB** | Base de données NoSQL (Logs, Détails, Recommandations) |
| **JWT** | Authentification par tokens |
| **bcrypt** | Hashage des mots de passe |
| **express-rate-limit** | Limitation des requêtes |
| **express-validator** | Validation des données |
| **pg-promise** | Client PostgreSQL |
| **mongoose** | ODM MongoDB |
| **dotenv** | Gestion des variables d'environnement |

---

## 📝 Notes importantes

### Répartition SQL vs NoSQL

**PostgreSQL (Données structurées + relationnelles)** :
- Users : Informations utilisateurs avec authentification
- Games : Catalogue des jeux
- Orders & OrderItems : Gestion des commandes (relations complexes)

**MongoDB (Données non structurées + logs)** :
- gameDetails : Détails riches (images, vidéos, tags)
- activityLogs : Historique d'actions utilisateurs
- recommendations : Recommandations personnalisées

---

## 👥 Auteurs

[Vos noms ici]

---

## 📄 Licence

Ce projet est réalisé dans le cadre d'un TP Bachelor EFREI.

