# 🚀 buddyscript

A professional, high-performance full-stack application generated with **[Shakil-Stack](https://github.com/shakil-ahmed-billal/shakil-stack-cli)**. This boilerplate is designed for developer productivity, type safety, and seamless production deployment.

---

## ✨ Features

- **Frontend**: Modern [Next.js](https://nextjs.org/) with App Router, Turbopack, and React 19.
- **Backend**: Robust [Express.js](https://expressjs.com/) server with TypeScript.
- **ORM**: [Prisma](https://www.prisma.io/) for type-safe database access and migrations.
- **Authentication**: Pre-configured authentication flows (Login/Register).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with modern linear gradient syntax.
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for powerful validation.
- **UI Components**: Premium, accessible components using **Base UI** and **Shadcn** patterns.
- **State Management**: [TanStack Query](https://tanstack.com/query) for efficient data fetching.
- **Architecture**: Modular, folder-based structure for maximum maintainability.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (Turbopack)
- **State**: TanStack Query v5
- **Forms**: React Hook Form + Zod Resolver
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Framework**: Express.js
- **Database**: PostgreSQL (via Prisma)
- **Validation**: Zod
- **Auth**: JWT / Better-Auth compatible

---

## 📂 Project Structure

```text
buddyscript/
├── backend/                # 🖥️ Express Backend
│   ├── src/
│   │   ├── app.ts          # Express App Entry
│   │   ├── server.ts       # Server Entry
│   │   ├── modules/        # Domain-driven modules
│   │   └── config/         # Server configuration
│   └── prisma/             # 🗄️ Database Schema & Migrations
├── frontend/               # 🎨 Next.js Frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   ├── components/     # UI & Shared Components
│   │   ├── services/       # API Action handlers
│   │   └── lib/            # Utilities & Config
├── .env                    # 🔐 Shared Environment Variables
├── pnpm-workspace.yaml     # 📦 Workspace Configuration
└── README.md               # 📖 Project Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: >= 20.0.0
- **pnpm**: Recommended (v9+)
- **PostgreSQL**: Running instance

### 2. Environment Setup
Update the root `.env` file with your database credentials and secret keys.

### 3. Database Migration
Navigate to the backend directory and run migrations:
```bash
cd backend
pnpm prisma migrate dev --name init
```

### 4. Run Development Servers
From the project root:
| Command | Action |
| :--- | :--- |
| `pnpm dev:backend` | Starts Express server & Prisma Studio |
| `pnpm dev:frontend` | Starts Next.js application |

---

## 💻 CLI Tools

This project supports the **Shakil-Stack CLI** for rapid development:
- **Add Module**: `npx shakil-stack-cli update` (Automatically generates Backend & Frontend modules)

---

## 📄 License

Built with ⚡ by **Shakil Ahmed Billal**. Licensed under the [MIT License](LICENSE).
