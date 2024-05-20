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
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [state, formAction] = useFormState(createPost, initialState);
  const { pending, error, success } = useFormStatus();

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Create a New Post
      </h1>
      <form action={formAction} className="space-y-6">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="url"
          >
            URL
          </label>
          <input
            id="url"
            name="url"
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full"
          disabled={pending}
        >
          {pending ? "Creating..." : "Create Post"}
        </button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
        {success && (
          <p className="text-green-500 mt-4">Post created successfully!</p>
        )}
      </form>
    </div>
  );
}
