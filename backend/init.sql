CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- a couple of sample posts so the app isn't empty on first run
INSERT INTO posts (title, author, content) VALUES
('Welcome to the blog', 'Admin', 'This is your first post. Edit or delete it, then write your own!'),
('Why PERN?', 'Admin', 'Postgres, Express, React and Node all speak JSON and JavaScript, which keeps the whole stack in one language.');