import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { revalidatePath } from "next/cache";

const POSTS_PER_PAGE = 5;

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, "");

    return {
      slug,
      data,
    };
  });

  return posts;
}

export default async function Home(context) {
  console.log(context.searchParams.page);
  const posts = await getPosts();
  let currentPage =
    context.searchParams?.page === undefined || !context.searchParams?.page
      ? 1
      : parseInt(context.searchParams?.page);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  async function checkIfPostHasChanged() {
    "use server";
    const checkPosts = await getPosts();
    const didChange = posts.length !== checkPosts.length;
    if (didChange) {
      revalidatePath("/");
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome to My Blog</h1>
      </div>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link className="text-blue-500" href={`/posts/${post.slug}`}>
              {post.data.title} - {post.data.date}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link href={`/?page=${i + 1}`}>
            <button
              key={i + 1}
              className={`mx-1 px-3 py-1 ${
                i + 1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
