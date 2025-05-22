# 🏢 Office Management System (OMS) - UI

[![GitHub stars](https://img.shields.io/github/stars/MeetDesai21/OMS-UI.svg)](https://github.com/MeetDesai21/OMS-UI/stargazers) [![GitHub forks](https://img.shields.io/github/forks/MeetDesai21/OMS-UI.svg)](https://github.com/MeetDesai21/OMS-UI/network) [![GitHub issues](https://img.shields.io/github/issues/MeetDesai21/OMS-UI.svg)](https://github.com/MeetDesai21/OMS-UI/issues) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white)

**OMS (Office Management System)** is a modern web-based ticketing platform designed to streamline internal office operations such as service requests, issue tracking, and task management. This repository contains the **frontend UI**, built using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/), providing a fast, responsive, and intuitive interface for employees and admins.

> 💼 Developed and led by the **Business Analyst** of the project, this UI is a key module in the larger OMS ticketing system.

---

## 🚀 Key Features

- 🎫 Ticket Creation & Tracking Interface
- 🔍 Request Filtering & Status Views
- 👤 Role-based Access (Admin, Employee, Support Staff)
- ⚡ Fast-loading with Next.js 14
- 🎨 Clean, Responsive UI using Tailwind CSS
- 🧱 Component-based, scalable architecture

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Package Managers:** `pnpm`, `npm`, and `bun` supported
- **Bundling & Config:** PostCSS, Tailwind, TypeScript

---

## 📁 Project Structure

```
├── app/                 # Next.js App Directory
├── components/          # Reusable UI Components
├── hooks/               # Custom React Hooks
├── lib/                 # Utility Functions
├── public/              # Static Assets
├── styles/              # Global Styles
├── next.config.mjs      # Next.js Config
├── tailwind.config.ts   # Tailwind CSS Config
├── tsconfig.json        # TypeScript Config
├── package.json         # Project Metadata & Scripts
```

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MeetDesai21/OMS-UI.git
   cd OMS-UI
   ```

2. **Install dependencies:**

   Using **pnpm**:
   ```bash
   pnpm install
   ```

   Or using **npm**:
   ```bash
   npm install
   ```

   Or using **bun**:
   ```bash
   bun install
   ```

---

## 🧪 Running the App

To start the local development server:

```bash
pnpm dev
# or
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧰 Scripts

- `dev` – Start local dev server
- `build` – Create a production build
- `start` – Start production server
- `lint` – Run linting checks

---

## 🔒 Authentication & Roles *(Planned)*

- 🔐 Secure login/logout for all users
- 👨‍💼 Admin: View all tickets, assign tasks
- 👨‍💻 Employee: Raise and track tickets
- 🧑‍🔧 Support Staff: Manage assigned tickets

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Developed by

Lead Business Analyst: [Meet Desai](https://github.com/MeetDesai21)

---

> 💡 *This UI is a part of a larger Office Management System initiative to improve operational efficiency, issue tracking, and inter-departmental coordination within organizations.*
