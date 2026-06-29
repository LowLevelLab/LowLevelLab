# Low Level Labs

The official website for **Low Level Labs**, an open-source collective building compilers, memory allocators, and bare-metal infrastructure.

This website is built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Motion** (Framer Motion). It dynamically fetches information about the organization, projects, and contributors directly from the GitHub API.


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


