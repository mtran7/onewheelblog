import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getPostListings } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();
  // const posts = await getPosts();
  // use above to organize and get from server
  // const posts = [
  //   { slug: "my-first-post", title: "My First Post!" },
  //   { slug: "my-first-one-wheel", title: "My First one-wheel!" },
  // ];

  return json({ posts });
  // alternatively can use json
  // const postsString = JSON.stringify({ posts });
  //   return new Response(postsString, {
  //     headers: { "Content-Type": "application/json" },
  //   });
};

export default function PostsRoute() {
  const { posts } = useLoaderData() as LoaderData;
  return (
    <main>
      <h1>Posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to={post.slug}
            prefetch="intent"
            className="text-blue-600 underline"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </main>
  );
}
