# 🌐 B5A7 Portfolio

A full-stack personal portfolio website built with **Next.js**, **Express.js**, and **Prisma**.  
This project showcases blogs, projects, and an owner-only dashboard with secure authentication.

---

## 🚀 Live Demo

- **Frontend (Next.js)**: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)  
- **Backend (Express + Prisma)**: [https://your-backend.fly.dev](https://your-backend.fly.dev)  
- **Database**: Neon (PostgreSQL)

---

## 📖 Project Overview

This portfolio serves as a dynamic personal website with:

- Public pages for **blogs**, **projects**, and **about me**
- Private, secure **dashboard** for the owner to manage blogs and projects
- Modern UI with **Tailwind CSS**, responsive layouts, and interactive elements
- **ISR** (Incremental Static Regeneration) for fast and fresh public content

---

## ✨ Features

### 🔓 Public
- **Blogs**  
  - All blogs page (ISR)  
  - Individual blog page (ISR with `getStaticPaths`)  

- **Projects Showcase**  
  - Thumbnails, links, live site, features list  
  - ISR for dynamic updates  

- **About Me**  
  - Static personal info and bio (SSG)

### 🔒 Private (Owner Only)
- **Authentication & Authorization**  
  - JWT-based login system  
  - Secure password hashing with bcrypt  

- **Dashboard**  
  - Create, read, update, delete (CRUD) for blogs and projects  
  - Owner-only access with protected routes  

### 🎨 UI/UX Enhancements
- Responsive design with Tailwind utility classes  
- Skeleton loaders, hover animations, polished cards  
- Accessibility-compliant HTML and components  
- `react-hot-toast` for success/error feedback  

### ⚠️ Error Handling
- Zod validation with clear form errors  
- User-friendly messages for API/network failures  
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
- [JWT](https://jwt.io/) + [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for auth  
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
git clone https://github.com/your-username/b5a7-frontend.git
cd b5a7-frontend

# Backend
git clone https://github.com/your-username/b5a7-backend.git
cd b5a7-backend
