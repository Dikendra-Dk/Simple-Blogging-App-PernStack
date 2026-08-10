import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Link to="/" className="font-serif text-2xl tracking-tight text-ink">
          The Simple Blog
        </Link>
        <Link
          to="/new"
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-paper hover:bg-brand/90 transition-colors"
        >
          Write a post
        </Link>
      </nav>
    </header>
  );
}