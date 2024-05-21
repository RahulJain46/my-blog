import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { revalidatePath } from "next/cache";
import { RefreshCache } from "./posts/[slug]/refresh-cache";

// Define the number of posts per page
const POSTS_PER_PAGE = 7;

// Function to retrieve all posts from the filesystem
async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "posts");

  // Synchronously read all filenames in the posts directory
  const filenames = fs.readdirSync(postsDirectory);

  // Map through each filename and retrieve its content and metadata
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
  // Fetch all posts
  const posts = await getPosts();

  // Sort posts by ISO date in descending order
  posts.sort((a, b) => new Date(b.data.isoDate) - new Date(a.data.isoDate));

  // Determine the current page from the query parameters
  const currentPage = context.searchParams?.page
    ? parseInt(context.searchParams.page)
    : 1;

  // Calculate total pages and the posts for the current page
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Function to check if any posts have changed and revalidate the path
  async function checkIfPostHasChanged() {
    "use server";
    const checkPosts = await getPosts();
    const didChange = posts.length !== checkPosts.length;
    if (didChange) {
      revalidatePath("/");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            Welcome to My Blog
          </h1>
        </div>
        <RefreshCache check={checkIfPostHasChanged} />
        <ul className="space-y-6">
          {currentPosts.map((post) => (
            <li
              key={post.slug}
              className="border-b pb-4 border-gray-200 hover:bg-gray-50 transition duration-300"
            >
              <Link href={`/posts/${post.slug}`} className="block">
                <p className="text-2xl font-semibold text-blue-600 hover:underline">
                  {post.data.title}
                </p>
                <p className="text-gray-500">{post.data.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link href={`/?page=${i + 1}`} key={i + 1}>
            <button
              className={`px-4 py-2 rounded-md ${
                i + 1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
