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
    <article className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          {data.title}
        </h1>
        <p className="text-gray-500 text-center">
          {new Date(data.date).toLocaleDateString()}
        </p>
      </header>
      <section className="prose lg:prose-xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
    </article>
  );
}
