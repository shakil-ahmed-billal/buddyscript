# BuddyScript - Advanced Social Network Architecture

BuddyScript is a high-performance social networking platform built with a modern technology stack, focusing on speed, scalability, and premium user experience. It features a robust real-time feed, advanced caching mechanisms, and a highly responsive UI with optimistic updates.

## Core Features

### Real-Time Feed and Interactions
- **Optimistic UI Updates**: Interactions like liking a post, creating comments, and deleting content happen instantly in the UI before the server confirmation, providing a zero-latency experience.
- **Advanced Caching**: Utilizes Redis for backend data caching to minimize database hits and ensure sub-second API response times for the global feed.
- **Infinite Scrolling**: Optimized data fetching with React Query (TanStack Query) for a seamless browsing experience.

### Performance Optimization
- **Image Optimization**: Integrated Next.js Image component for automatic format conversion (WebP/AVIF), responsive resizing, and lazy loading.
- **Database Indexing**: Strategically placed database indexes on high-traffic fields (authorId, visibility, createdAt) to ensure complex queries remain performant at scale.
- **Perceived Performance**: Custom skeleton loaders replace generic spinners to keep the user engaged during initial data hydration.

### Secure Authentication
- **Role-Based Access Control**: Secure authentication powered by Better-Auth with support for Google OAuth and traditional email/password flows.
- **Session Management**: Advanced session tracking with automatic token refreshing and secure cookie-based storage.

## Technology Stack

| Category | Technology |
| :--- | :--- |
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, Lucide React, Shadcn UI |
| State Management | TanStack Query (React Query) |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Caching | Redis (ioredis) |
| Authentication | Better-Auth, JSON Web Tokens (JWT) |
| Storage | Cloudinary (Image Hosting) |

## CLI and Development

BuddyScript uses a monorepo-style structure for clean separation of concerns between the frontend and backend.

### Project Structure
- **/frontend**: Next.js application core.
- **/backend**: Express API server and Prisma ORM configuration.

### Getting Started

1. **Install Dependencies**:
   Run the following command in the root and both subdirectories:
   ```bash
   pnpm install
   ```

2. **Environment Configuration**:
   Create `.env` files in both `frontend/` and `backend/` directories based on the provided templates. Ensure `REDIS_URL` and `DATABASE_URL` are correctly set.

3. **Database Setup**:
   Run Prisma migrations to initialize your schema:
   ```bash
   cd backend
   npx prisma db push
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
