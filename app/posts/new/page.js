// app/posts/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus, useFormState } from "react-dom";
import { createPost } from "../../actions/create-post";

const initialState = {
  message: null,
};

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [state, formAction] = useFormState(createPost, initialState);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form action={formAction}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            name="title"
            type="text"
            className="mt-1 block w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            name="date"
            type="date"
            className="mt-1 block w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            name="content"
            className="mt-1 block w-full"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
