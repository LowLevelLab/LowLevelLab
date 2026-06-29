# Low Level Labs

The official website for **Low Level Labs**, an open-source collective building compilers, memory allocators, and bare-metal infrastructure.

This website is built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Motion** (Framer Motion). It dynamically fetches information about the organization, projects, and contributors directly from the GitHub API.

## Features

- **Dynamic Projects**: Automatically fetches public repositories from the LowLevelLab GitHub organization.
- **Team Directory**: Lists members and contributors from the organization.
- **Fluid Experience**: Smooth scroll animations with Lenis scroll integration and custom micro-animations powered by Framer Motion.
- **Next.js & Turbopack**: High-performance, SEO-friendly, and modern development server.

## Getting Started

### Prerequisites

Make sure you have Node.js installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LowLevelLab/LowLevelLab.git
   cd LowLevelLab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build & Production

To build the project for production:

```bash
npm run build
npm run start
```

### Environment Variables

To prevent rate limiting when calling the GitHub API, you can add GitHub Personal Access Tokens (PATs) in a `.env.local` file:

```env
PAT_1=your_github_token_here
```

## Deployment on Vercel

This project is fully ready for deployment on Vercel:

1. Import your repository into Vercel.
2. The framework will be automatically detected as Next.js.
3. Configure environment variables (like `PAT_1` if needed).
4. Deploy!
