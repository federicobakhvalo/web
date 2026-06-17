import type { IArticle } from "@/feautures/blog/blog.interface";
import type { IUser } from "@/feautures/user/user";

type HashedUser = IUser & { password: string };

export const mockUsers: HashedUser[] = [
  {
    id: 1,
    name: "John",
    password: "hashed_password",
  },
];

export const mockArticles: IArticle[] = [
  {
    id: 1,
    title: "Breaking News: Market Shifts",
    content: "A concise overview of the topic.",
    author: "John",
    createdAt: new Date(),
    dateISO: new Date().toISOString(),
    description: "A concise overview of the topic.",
    tags: ["productivity", "design"],
  },

  {
    id: 2,
    title: "How to Build Better Habits",
    content: "Key insights and practical tips.",
    author: "John",
    createdAt: new Date(),
    dateISO: new Date().toISOString(),
    description: "Key insights and practical tips.",
    tags: ["productivity", "health"],
  },

  {
    id: 3,
    title: "The Future of Web Development",
    content: "A deep dive into current trends.",
    author: "John",
    createdAt: new Date(),
    dateISO: new Date().toISOString(),
    description: "A deep dive into current trends.",
    tags: ["development", "javascript"],
  },

  {
    id: 4,
    title: "A Guide to Remote Work",
    content: "Advice from industry experts.",
    author: "John",
    createdAt: new Date(),
    dateISO: new Date().toISOString(),
    description: "Advice from industry experts.",
    tags: ["remote", "productivity"],
  },
];
