import { useEffect, useState } from "react";
import { getPosts } from "../api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError("Could not load posts. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="mx-auto max-w-3xl px-4 py-12 text-ink/60">Loading…</p>;
  if (error) return <p className="mx-auto max-w-3xl px-4 py-12 text-red-600">{error}</p>;
  if (posts.length === 0)
    return (
      <p className="mx-auto max-w-3xl px-4 py-12 text-ink/60">
        No posts yet. Be the first to write one.
      </p>
    );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}