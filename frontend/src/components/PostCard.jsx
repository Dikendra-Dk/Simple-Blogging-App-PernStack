import { Link } from "react-router-dom";

function excerpt(text, length = 160) {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

export default function PostCard({ post }) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/posts/${post.id}`}
      className="block border-b border-ink/10 py-8 first:pt-0 group"
    >
      <p className="text-xs uppercase tracking-wide text-ink/50">
        {post.author} · {date}
      </p>
      <h2 className="mt-2 font-serif text-2xl text-ink group-hover:text-brand transition-colors">
        {post.title}
      </h2>
      <p className="mt-3 text-ink/70 leading-relaxed">
        {excerpt(post.content)}
      </p>
    </Link>
  );
}