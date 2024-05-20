"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function createPost(prevState, formData) {
  console.log(formData, prevState);
  const title = formData.get("title");
  const date = formData.get("date");
  const content = formData.get("content");
  const url = formData.get("url");

  if ((!title || !date || !content, !url)) {
    return new Response("Missing fields", { status: 400 });
  }

  const slug = title.toLowerCase().replace(/ /g, "-");
  const postContent = `---
title: "${title}"
date: "${date}"
url: "${url}"
---

${content}`;

  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  console.log(filePath, "filePath");
  fs.writeFileSync(filePath, postContent);
  await revalidatePath("/");
  redirect("/");
}
