import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
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
    <article className="max-w-3xl flex justify-start flex-col mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <header className="mb-8 flex justify-start flex-col">
        <p className="text-gray-500 text-left">{data.date}</p>
        <h1 className="text-4xl font-extrabold text-left text-gray-900 mb-4">
          {data.title}
        </h1>
      </header>
      <Image
        src={data.url}
        alt="Blog image"
        width={700} // Set a default width
        height={400} // Set a default height
        layout="responsive"
        objectFit="contain"
        className="rounded-lg shadow-lg mb-8"
      />
      <p className="text-blue-500 text-left text-1xl">By {data.author}</p>
      <section className="prose lg:prose-xl text-1xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
    </article>
  );
}
