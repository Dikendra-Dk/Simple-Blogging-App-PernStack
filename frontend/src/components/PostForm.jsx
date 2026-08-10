import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api";

export default function PostForm({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode !== "edit") return;

    getPost(id)
      .then((post) => {
        setForm({
          title: post.title,
          author: post.author,
          content: post.content,
        });
      })
      .catch(() => setError("Post not found."))
      .finally(() => setLoading(false));
  }, [id, mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      setError("title, author and content are required");
      return;
    }

    try {
      if (mode === "edit") {
        const updated = await updatePost(id, form);
        navigate(`/posts/${updated.id}`);
      } else {
        const created = await createPost(form);
        navigate(`/posts/${created.id}`);
      }
    } catch (err) {
      setError("Could not save the post.");
    }
  };

  if (mode === "edit" && loading) {
    return <p className="mx-auto max-w-3xl px-4 py-12 text-ink/60">Loading…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl text-ink">
        {mode === "edit" ? "Edit post" : "Write a new post"}
      </h1>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-ink">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-md border border-ink/20 px-4 py-2 outline-none focus:border-brand"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-2 block text-sm font-medium text-ink">
            Author
          </label>
          <input
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full rounded-md border border-ink/20 px-4 py-2 outline-none focus:border-brand"
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-medium text-ink">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="10"
            value={form.content}
            onChange={handleChange}
            className="w-full rounded-md border border-ink/20 px-4 py-2 outline-none focus:border-brand"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-paper hover:bg-brand/90"
          >
            {mode === "edit" ? "Save changes" : "Publish"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md border border-ink/20 px-4 py-2 text-sm hover:bg-ink/5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}