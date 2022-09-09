import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Post };

export async function getPostListings() {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
}

export async function getPosts() {
  return prisma.post.findMany();
  //   Getting instead from db server

  //   const posts = [
  //     { slug: "my-first-post", postTitle: "My First Post!" },
  //     { slug: "my-first-one-wheel", postTitle: "My First one-wheel!" },
  //   ];

  return posts;
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  slug: string,
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.update({ data: post, where: { slug } });
}

export async function deletePost(slug: string) {
  return prisma.post.delete({ where: { slug } });
}
