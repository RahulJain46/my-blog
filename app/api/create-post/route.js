// app/api/create-post/route.js
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const { title, date, content } = await req.json();

  if (!title || !date || !content) {
    return new Response("Missing fields", { status: 400 });
  }

  const slug = title.toLowerCase().replace(/ /g, "-");
  const postContent = `---
title: "${title}"
date: "${date}"
---

${content}`;

  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  console.log(filePath, "filePath");
  fs.writeFileSync(filePath, postContent);
  await revalidatePath("/");

  return new Response("Post created", { status: 201 });
}
