import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost } from "../api";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPost(id)
      .then(setPost)
      .catch(() => setError("Post not found."));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    await deletePost(id);
    navigate("/");
  };

  if (error) return <p className="mx-auto max-w-3xl px-4 py-12 text-red-600">{error}</p>;
  if (!post) return <p className="mx-auto max-w-3xl px-4 py-12 text-ink/60">Loading…</p>;

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/" className="text-sm text-brand hover:underline">
        ← Back to all posts
      </Link>
      <h1 className="mt-4 font-serif text-4xl text-ink">{post.title}</h1>
      <p className="mt-2 text-sm uppercase tracking-wide text-ink/50">
        {post.author} · {date}
      </p>
      <div className="mt-8 whitespace-pre-wrap leading-relaxed text-ink/90">
        {post.content}
      </div>
      <div className="mt-10 flex gap-3 border-t border-ink/10 pt-6">
        <Link
          to={`/posts/${post.id}/edit`}
          className="rounded-md border border-ink/20 px-4 py-2 text-sm hover:bg-ink/5"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}