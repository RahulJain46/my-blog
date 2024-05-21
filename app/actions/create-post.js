"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function createPost(prevState, formData) {
  // Extract form data
  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");
  const author = formData.get("author");

  // Validate required fields
  if (!title || !content || !url) {
    return new Response("Missing fields", { status: 400 });
  }

  // Generate date strings
  const currentDate = new Date();
  const isoDateString = currentDate.toISOString();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const date = `${year}-${month}-${day}`;

  // Create slug from title
  const slug = title.toLowerCase().replace(/ /g, "-");

  // Create post content in markdown format
  const postContent = `---
title: "${title}"
isoDate: "${isoDateString}"
date: "${date}"
author: "${author}"
url: "${url}"
---

${content}`;

  // Define posts directory and file path
  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);

  // Ensure the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  // Write the post content to the file
  fs.writeFileSync(filePath, postContent);

  // Revalidate the path to update the content
  await revalidatePath("/");

  // Redirect to home page after creation
  redirect("/");
}
