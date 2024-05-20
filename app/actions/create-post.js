"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(prevState, formData) {
  console.log(formData, prevState);
  const title = formData.get("title");
  const date = formData.get("date");
  const content = formData.get("content");
  const url = formData.get("url");

  const res = await fetch("http://localhost:3000/api/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, date, content, url }),
  });

  if (res.ok) {
    revalidatePath("/");
    redirect("/");
  } else {
    return { message: "error in post" };
  }
}
