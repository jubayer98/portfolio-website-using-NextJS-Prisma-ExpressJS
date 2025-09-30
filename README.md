# 🌐 B5A7 Portfolio

A full-stack personal portfolio website built with **Next.js** (frontend), **Express.js**, and **Prisma** (backend).  
Showcases blogs, projects, and includes a secure owner dashboard.

---

## 🚀 Live Demo

- **Frontend (Next.js)**: [https://b5a7-frontend.vercel.app](https://b5a7-frontend.vercel.app)  
- **Backend (Express + Prisma)**: [https://b5a7-backend.vercel.app](https://b5a7-backend.vercel.app)  
- **Database**: Neon (PostgreSQL)

---

## 📖 Project Overview

This project is a dynamic personal portfolio site featuring:

- Public pages for **blogs**, **projects**, and **about me**
- Private, secure **dashboard** for the owner to manage blogs/projects
- Modern UI with **Tailwind CSS**, responsive layouts, and interactive elements
- **ISR** (Incremental Static Regeneration) for fast, fresh public content

---

## ✨ Features

### 🔓 Public
- **Blogs**  
  - All blogs page (ISR)  
  - Individual blog pages (ISR with `getStaticPaths`)  
- **Projects Showcase**  
  - Thumbnails, links, live demos, features  
  - ISR for dynamic project updates  
- **About Me**  
  - Static personal info and bio (SSG)

### 🔒 Private (Owner Only)
- **Authentication & Authorization**  
  - JWT-based login  
  - Secure password hashing with bcrypt  
- **Dashboard**  
  - CRUD (Create, Read, Update, Delete) for blogs/projects  
  - Protected routes, owner-only access

### 🎨 UI/UX Enhancements
- Responsive design (Tailwind)
- Skeleton loaders, hover animations, polished cards
- Accessible HTML and components
- `react-hot-toast` for feedback

### ⚠️ Error Handling
- Zod validation for forms
- User-friendly API/network error messages
- Unauthorized actions blocked with proper feedback

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [React Hot Toast](https://react-hot-toast.com/)

**Backend**
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) ORM
- [PostgreSQL (Neon)](https://neon.tech/)
- [JWT](https://jwt.io/) + [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Zod](https://zod.dev/) for validation

**Deployment**
- Frontend: Vercel
- Backend: Fly.io (Dockerized Express server)
- Database: Neon (Free Postgres tier)

---

## ⚡ Setup Instructions

### 1. Clone repos

```bash
# Frontend
git clone https://github.com/jubayer98/portfolio-website-using-NextJS-Prisma-ExpressJS.git
cd portfolio-website-using-NextJS-Prisma-ExpressJS/b5a7-frontend

# Backend
git clone https://github.com/jubayer98/portfolio-website-using-NextJS-Prisma-ExpressJS.git
cd portfolio-website-using-NextJS-Prisma-ExpressJS/b5a7-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

**Backend `.env`**
```env
DATABASE_URL="postgresql://<user>:<password>@<neon-host>/<db>?sslmode=require&pgbouncer=true&connection_limit=1"
JWT_ACCESS_SECRET="super-long-secret"
JWT_REFRESH_SECRET="another-super-long-secret"
CORS_ORIGIN="http://localhost:3000"
PORT=4000
```

**Frontend `.env.local`**
```env
NEXT_PUBLIC_API_BASE="http://localhost:4000/api"
```

### 4. Database

```bash
npx prisma db push
npx prisma generate
npm run seed   # optional, seeds an admin user
```

### 5. Run locally

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

Visit:

- Frontend → [http://localhost:3000](http://localhost:3000)
- Backend → [http://localhost:4000](http://localhost:4000)

---

## 🔑 Credentials (for testing)

```txt
Admin Email: ContactWithMeForDetails
Password: ContactWithMeForDetails
```
*(Seeded in backend using `src/seed.ts`)*

---

## 📹 Demo Video

A 10–15 min walkthrough covering:

- Project overview
- Features
- Auth & dashboard demo
- Blog & project management
- Deployment & live links

*(Add your video link here, e.g., Google Drive or YouTube)*

---

## 📂 Repository Structure

- **b5a7-frontend**: Next.js app (App Router)
- **b5a7-backend**: Express + Prisma API

Each repo contains its own `README.md`, environment setup, and deployment instructions.

---

## 📝 Notes

- Uses **ISR** for public content freshness without rebuilds.
- Strict validation and error handling implemented for full marks.
- Built with scalability and clean code practices in mind.

---

## 👤 Author

**Jubayer Alam**

- GitHub: [@jubayer98](https://github.com/jubayer98)
