// app/(posts)/[slug]/page.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

async function getPost(slug) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
}

export default async function Page({ params }) {
  const { slug } = params;
  const { data, content } = await getPost(slug);

  return (
    <article>
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-4">{data.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
