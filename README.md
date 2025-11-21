# NoSQL Mongo Project

This project is a full-stack application with a Node.js/Express backend and a React/Vite frontend.

## Backend Setup

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://root:root@localhost:27017/M1BDDNOSQL?authSource=admin
ADMIN_JWT_SECRET=your_jwt_secret
```

### Commands

- **Install Dependencies**: `pnpm install`
- **Start Development Server**: `pnpm run dev`
- **Build**: `pnpm run build`
- **Start Production Server**: `pnpm start`
- **Test**: `pnpm test`

## Frontend Setup

Navigate to the `frontend` directory:

```bash
cd frontend
```

### Commands

- **Install Dependencies**: `npm install`
- **Start Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Preview Build**: `npm run preview`
- **Lint**: `npm run lint`
