# 🔐 Full-Stack Authentication System

> A modern, secure authentication system built with cutting-edge technologies. Features beautiful UI, robust security, and production-ready architecture.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0-f9f1e1?style=for-the-badge&logo=bun)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.0-06b6d4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

## 🌟 Overview

This full-stack authentication system combines modern frontend excellence with robust backend architecture. Built for developers who want a production-ready authentication solution with beautiful UX and enterprise-grade security.

### ⚡ Quick Demo
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:3030](http://localhost:3030)
- **Features**: Sign up, login, profile management, dark/light themes

---

## 🏗️ Architecture

<table>
<tr>
<td width="50%">

### 🎨 Frontend Stack
- **Next.js 15** - React with App Router
- **shadcn/ui** - Beautiful component library
- **Tailwind CSS** - Utility-first styling
- **next-themes** - Theme management
- **TypeScript** - Type safety

</td>
<td width="50%">

### ⚙️ Backend Stack
- **Bun.js** - Lightning-fast runtime
- **Elysia.js** - Modern frontend framework
- **Drizzle ORM** - Type-safe database
- **PostgreSQL** - Robust data storage
- **JWT + bcrypt** - Secure authentication

</td>
</tr>
</table>

---

## ✨ Features

### 🖥️ Frontend Highlights
- 🎨 **Modern Design** - Clean, professional interface with split-screen layout
- 🌙 **Theme System** - Dark/light mode with system preference detection
- 📱 **Responsive** - Mobile-first design that works everywhere
- ⚡ **Performance** - Optimized with Next.js 15 and modern best practices
- 🔒 **Form Validation** - Client-side validation with smooth UX

### 🛡️ Backend Highlights
- 🔐 **JWT Authentication** - Secure token-based auth with refresh tokens
- 🛡️ **Password Security** - bcrypt hashing with salt rounds
- ✅ **Input Validation** - Zod schemas for bulletproof data validation
- 🗄️ **Database Management** - Drizzle ORM with migrations
- 🚀 **High Performance** - Bun.js for maximum speed

---

## 🚀 Quick Start

### Prerequisites
```bash
# Install Bun (recommended)
curl -fsSL https://bun.sh/install | bash

# Or ensure you have Node.js 18+
node --version

# PostgreSQL (local or cloud)
psql --version
```

### 1. 📥 Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd auth-system

# Install backend dependencies
cd backend
bun install

# Install frontend dependencies
cd ../frontend
bun install
```

### 2. ⚙️ Environment Setup
```
# Backend environment (Create .env file in server folder)
```

**Required Environment Variables:**
```.env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=auth_db

# JWT Secrets (generate strong secrets!)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
ACCESS_TOKEN_SECRET=your-access-token-secret-64-chars
REFRESH_TOKEN_SECRET=your-refresh-token-secret-64-chars

# Server Configuration
PORT=3030
NODE_ENV=development
```

> 💡 **Security Tip**: Use `openssl rand -hex 64` to generate secure secrets

### 3. 🗄️ Database Setup
```bash
cd server

# Generate database schema
bun run db:generate

# Run migrations
bun run db:migrate

# Optional: Open Drizzle Studio to view your database
bun run db:studio
```

### 4. 🎬 Launch
```bash
# Terminal 1: Start backend server
cd server
bun run dev
# ✅ Backend running on http://localhost:3030

# Terminal 2: Start frontend
cd frontend
bun run dev
# ✅ Frontend running on http://localhost:3000
```

**🎉 You're ready!** Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
signuplogin/
├── 🌐 frontend/                # Next.js Frontend
│   ├── 🗂 .next/              # Next.js build output
│   ├── ⭐ favicon.ico         # Favicon
│   ├── 💾 globals.css         # Global styles
│   ├── 🌐 layout.tsx          # Root layout
│   ├── 🌐 page.tsx            # Main authentication page
│   ├── 🛠 components/         # Reusable components
│   │   ├── 📦 ui/            # shadcn/ui components
│   │   │   ├── alert.tsx     # Alert component
│   │   │   ├── avatar.tsx    # Avatar component
│   │   │   ├── badge.tsx     # Badge component
│   │   │   ├── button.tsx    # Button component
│   │   │   ├── card.tsx      # Card component
│   │   │   ├── dropdown-menu.tsx # Dropdown menu
│   │   │   ├── input.tsx     # Input component
│   │   │   ├── label.tsx     # Label component
│   │   │   ├── separator.tsx # Separator component
│   │   │   ├── tabs.tsx      # Tabs component
│   │   │   ├── toggle.tsx    # Toggle component
│   │   │   ├── theme-provider.tsx # Theme provider
│   │   │   ├── theme-toggle.tsx # Theme toggle
│   │   │   └── user-profile.tsx # User profile
│   │   └── lib/              # Utility libraries
│   ├── 📦 node_modules/      # Dependency directory
│   ├── 🔧 .gitignore         # Git ignore file
│   ├── 🔒 bun.lock           # Bun lock file
│   ├── 📄 components.json    # Component configuration
│   ├── 📄 next-env.d.ts      # TypeScript environment
│   ├── ⚙ next.config.ts     # Next.js configuration
│   └── 📦 package.json       # Package configuration
│
└── ⚙️ backend/               # Bun.js Backend
    ├── 📂 drizzle/           # Drizzle ORM migrations
    ├── 📂 node_modules/      # Dependency directory
    ├── 📂 src/               # Source code
    │   ├── ⚙ config/        # Configuration files
    │   │   └── env.ts       # Environment validation
    │   ├── 🌐 env.ts         # Environment file
    │   ├── 🗄 db/            # Database operations
    │   │   ├── connection.ts # Database connection
    │   │   ├── migrate.ts    # Migration runner
    │   │   └── schema/      # Schema definitions
    │   │       └── schema.ts # User table schema
    │   ├── 🌐 routes/        # API routes
    │   │   └── auth.ts      # Authentication endpoints
    │   ├── 📋 schemas/       # Validation schemas
    │   │   └── auth.ts      # Authentication schema
    │   ├── 🛠 utils/         # Utility functions
    │   │   ├── jwt.ts       # JWT utilities
    │   │   └── password.ts  # Password hashing
    │   ├── 🚀 index.js      # Main server entry
    │   └── 🚀 index.ts      # TypeScript entry
    ├── 📄 .env               # Environment variables
    ├── 🔧 .gitignore         # Git ignore file
    ├── 🔒 bun.lock           # Bun lock file
    ├── ⚙ drizzle.config.ts  # Drizzle configuration
    ├── 📦 package.json       # Package configuration
    ├── 📄 README.md          # Project documentation
    └── ⚙ tsconfig.json      # TypeScript configuration
```

---

## 🔌 API Documentation

### Base URL: `http://localhost:3030`

<details>
<summary><strong>🔐 POST /auth/signup</strong> - Create Account</summary>

**Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```
</details>

<details>
<summary><strong>🔓 POST /auth/login</strong> - Sign In</summary>

**Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```
</details>

<details>
<summary><strong>👤 GET /auth/me</strong> - Get Profile</summary>

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```
</details>

<details>
<summary><strong>🔄 POST /auth/refresh</strong> - Refresh Token</summary>

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```
</details>

---

## 🗄️ Database Schema

### 👥 Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `serial` | `PRIMARY KEY` |
| `email` | `varchar(255)` | `UNIQUE, NOT NULL` |
| `password` | `varchar(255)` | `NOT NULL` |
| `firstName` | `varchar(100)` | `NULLABLE` |
| `lastName` | `varchar(100)` | `NULLABLE` |
| `isVerified` | `boolean` | `DEFAULT false` |
| `createdAt` | `timestamp` | `DEFAULT now()` |
| `updatedAt` | `timestamp` | `DEFAULT now()` |

---

## 🛠️ Development

### Backend Commands
```bash
cd backend

# 🚀 Development server with hot reload
bun run dev

# 📊 Database operations
bun run db:generate     # Generate new migration
bun run db:migrate      # Apply migrations
bun run db:studio       # Open Drizzle Studio
bun run db:seed         # Seed database (if implemented)

# 🧪 Testing
bun run test           # Run tests
bun run test:watch     # Watch mode

# 🔍 Code quality
bun run lint           # ESLint
bun run type-check     # TypeScript check
```

### Frontend Commands
```bash
cd frontend

# 🚀 Development server
bun run dev

# 🏗️ Build & deploy
bun run build          # Production build
bun run start          # Start production server
bun run preview        # Preview build

# 🧪 Testing & quality
bun run test           # Run tests
bun run lint           # ESLint
bun run type-check     # TypeScript check
```

---

## 🚀 Deployment

### 📦 Build for Production
```bash
# Backend
cd backend
bun run build

# Frontend
cd frontend
bun run build
```

---

## 👨‍💻 Author

**Prasun Ghimire**
- GitHub: [@prasunghimire404](https://github.com/prasunghimire404)
- LinkedIn: [Prasun Ghimire](https://www.linkedin.com/in/prasun-ghimire-6657b3297/)
- Email: prasunghimire05@gmail.com

---

<div align="center">

Made with ❤️ by developers, for developers

</div>