# 🎮 PLAYMARKET - API Back-End

API REST pour marketplace de jeux vidéo (Node.js, Express, PostgreSQL, MongoDB)

---

## 🛠️ Prérequis

- Node.js >= 16.x
- PostgreSQL >= 12.x
- MongoDB >= 5.x

---

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Configuration

### Créer le fichier `.env` (voir `.env.example`)

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/playmarket
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=playmarket
PG_USER=postgres
PG_PASSWORD=your_password
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Initialiser les bases de données

```bash
# PostgreSQL
psql -U postgres -d playmarket < BDD/playmarket
psql -U postgres -d playmarket < BDD/migration_add_role.sql

# MongoDB (optionnel)
mongoimport --db playmarket --collection gameDetails --file BDD/playmarket.gameDetails.json --jsonArray
mongoimport --db playmarket --collection activityLogs --file BDD/playmarket.activityLogs.json --jsonArray
mongoimport --db playmarket --collection recommendations --file BDD/playmarket.recommendations.json --jsonArray
```

---

## 🚀 Lancement

```bash
npm run dev    # Développement
npm start      # Production
```

Serveur : `http://localhost:3000`

---

## 🏗️ Architecture

```
PLAYMARKET/
├── config/          # Configuration BDD
├── controller/      # Controllers (POO)
├── services/        # Business Logic
├── model/           # Models (PostgreSQL + MongoDB)
├── routes/          # Routes API
├── middlewares/     # Auth, Validation, Errors
└── server.js        # Point d'entrée
```

**Stack :** Express.js + MVC + POO + Services

---

## 🌐 Routes API Principales

### Publiques
- `GET /api/status` - Status serveur
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Rafraîchir token
- `GET /api/games` - Liste jeux
- `GET /api/games/:id` - Détails jeu

### Protégées (JWT)
- `GET /api/auth/me` - Profil utilisateur
- `POST /api/orders` - Créer commande
- `GET /api/orders/user/:userId` - Commandes utilisateur

### Admin uniquement
- `GET /api/users` - Liste utilisateurs
- `POST /api/games` - Créer jeu
- `PATCH /api/games/:id/stock` - Modifier stock
- `GET /api/orders` - Toutes les commandes

---

## 🔐 Sécurité

- **JWT** : Access Token (15min) + Refresh Token (7j)
- **Bcrypt** : Hashage passwords (10 rounds)
- **Rate Limiting** : 100 req/15min (global), 5 req/15min (auth), 10 req/15min (refresh)
- **CORS** : Origins configurables via `.env`
- **Validation** : express-validator sur tous les endpoints
- **Rôles** : user / admin

---

## 🗄️ Bases de données

### PostgreSQL (Relationnel)
- `users` - Utilisateurs + auth
- `games` - Catalogue jeux
- `orders` + `order_items` - Commandes

### MongoDB (NoSQL)
- `gameDetails` - Détails jeux (images, vidéos, tags)
- `activityLogs` - Logs d'activité
- `recommendations` - Recommandations

---

## 📚 Technologies

| Tech | Usage |
|------|-------|
| Express.js | Framework web |
| PostgreSQL | BDD relationnelle |
| MongoDB | BDD NoSQL |
| JWT | Authentication |
| bcrypt | Hashage passwords |
| express-rate-limit | Rate limiting |
| express-validator | Validation |

---

## 👥 Auteurs

Karim Feki - Ismael Genet
---

TP Bachelor EFREI B3

