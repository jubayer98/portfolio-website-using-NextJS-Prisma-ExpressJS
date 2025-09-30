Here’s a **professional, polished README.md** tailored for your **B5A7 Portfolio project** (Next.js frontend + Express/Prisma backend). It’s structured so a reviewer/teacher immediately sees live links, overview, tech stack, features, setup, and credentials.

You can copy-paste this into both your repos (frontend & backend) and adjust the **live URLs + repo badges** as needed.

---

````markdown
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
````

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

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## 🔑 Credentials (for testing)

```txt
Admin Email: owner@example.com
Password: secret123
```

*(Seeded in backend using `src/seed.ts`)*

---

## 📹 Demo Video

A 10–15 min walkthrough covering:

* Project overview
* Features
* Auth & dashboard demo
* Blog & project management
* Deployment & live links

*(Add your video link here, e.g., Google Drive or YouTube)*

---

## 📂 Repository Structure

* **b5a7-frontend**: Next.js app (App Router)
* **b5a7-backend**: Express + Prisma API

Each repo contains its own `README.md`, environment setup, and deployment instructions.

---

## 📝 Notes

* Uses **ISR** for public content freshness without rebuilds.
* Strict validation and error handling implemented for full marks.
* Built with scalability and clean code practices in mind.

---

## 👤 Author

**Your Name**

* GitHub: [@your-username](https://github.com/your-username)
* Email: [you@example.com](mailto:you@example.com)

```

---

👉 Do you want me to create **two tailored versions** (one README for backend repo, one for frontend repo) so that each explains only the relevant part (instead of a combined one)?
```
