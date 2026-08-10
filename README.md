# Simple PERN Blog

A minimal blog app: PostgreSQL + Express + React (Vite) + Tailwind CSS, all running in Docker.

## Run it

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api/posts
- Postgres: localhost:5432 (user: bloguser, pass: blogpass, db: blogdb)

First boot creates the `posts` table and two sample posts (see `backend/init.sql`).

Stop with `Ctrl+C`, or `docker compose down`. To wipe the database and start
fresh: `docker compose down -v` (the `-v` removes the volume, including your data).

## Project structure

```
pern-blog/
├── docker-compose.yml     # orchestrates db + backend + frontend
├── backend/                # Express REST API
│   ├── Dockerfile
│   ├── init.sql            # runs once, creates the posts table
│   └── src/
│       ├── index.js        # app entry point
│       ├── db.js           # pg connection pool
│       └── routes/posts.js # CRUD endpoints
└── frontend/                # React + Vite + Tailwind
    ├── Dockerfile
    └── src/
        ├── App.jsx          # routes
        ├── api.js           # axios calls to the backend
        ├── pages/            # Home, PostDetail, NewPost, EditPost
        └── components/       # Navbar, PostCard, PostForm
```

## API

| Method | Path              | Body                              |
|--------|-------------------|------------------------------------|
| GET    | /api/posts        | —                                   |
| GET    | /api/posts/:id    | —                                   |
| POST   | /api/posts        | `{ title, author, content }`       |
| PUT    | /api/posts/:id    | `{ title, author, content }`       |
| DELETE | /api/posts/:id    | —                                   |

## Next steps to extend this

- Add authentication (JWT) so only logged-in users can create/edit/delete
- Add pagination to `GET /api/posts`
- Add a production Dockerfile for the frontend (multi-stage build → nginx)
- Add categories/tags, a search box, or markdown rendering for post content# Simple-Blogging-App-PernStack
