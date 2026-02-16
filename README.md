# IgniteMind Academy

A full-stack educational platform built with Next.js 16, Drizzle ORM, and Neon PostgreSQL.

## Features

- **Interactive Quiz System**: Test knowledge with various subjects
- **Progress Tracking**: Track improvement over time with detailed analytics
- **Student Dashboard**: View past quiz results and performance
- **Admin Dashboard**: Manage students and view all results
- **Contact Form**: Capture inquiries from prospective students

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Hosting**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Neon PostgreSQL account

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ignitemind-academy
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

4. Update `.env.local` with required values:
\`\`\`env
DATABASE_URL=your_neon_connection_string
RESEND_API_KEY=your_resend_api_key

# Google Analytics (GA4)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-R86B7P2EWR
\`\`\`

5. Initialize the database:
\`\`\`bash
# Start development server first
npm run dev

# Then visit: http://localhost:3000/api/db/init
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Management

- Generate migrations: \`npm run db:generate\`
- Push schema to database: \`npm run db:push\`
- Open Drizzle Studio: \`npm run db:studio\`

## Project Structure

\`\`\`
src/
├── app/
│   ├── api/
│   │   ├── contact/        # Contact form API
│   │   ├── db/init/        # Database initialization
│   │   ├── quiz/results/   # Quiz results API
│   │   └── quiz/save/      # Save quiz results
│   ├── admin/              # Admin dashboard
│   ├── dashboard/          # Student dashboard
│   ├── quiz/               # Quiz taking page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── db.ts               # Database connection
│   └── schema.ts           # Drizzle schema definitions
\`\`\`

## API Endpoints

- `POST /api/quiz/save` - Save quiz results
- `GET /api/quiz/save` - Get student results by email
- `GET /api/quiz/results` - Get all results (admin)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)
- `GET /api/db/init` - Initialize database tables

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard:
   - `DATABASE_URL`
   - `RESEND_API_KEY`
3. Deploy!

## License

MIT
