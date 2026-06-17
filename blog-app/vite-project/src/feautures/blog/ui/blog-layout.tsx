import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/shared/components/ui/card";

import type { IArticle } from "@/feautures/blog/blog.interface";

import { Button } from "@/shared/components/ui/button";

interface Props {
  blog: IArticle;
}

export function BlogLayout({ blog }: Props) {
  //   const params = useTypedParams();
  //   const id = propId ?? params.id;

  //   const article = (mockArticles as IArticle[]).find((a) => a.id === id);

  return (
    <main className="p-4">
      <Card className="max-w-3xl m-auto">
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription className="mt-1">{blog.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4 text-sm text-muted-foreground">
            By {blog.author} • {new Date(blog.createdAt).toLocaleString()}
          </div>
          <article className="prose max-w-none">
            <p>{blog.content}</p>
          </article>
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div>
              <Button asChild>
                <a href={`/articles/${blog.id + 1}/`}>Next blog</a>
              </Button>
            </div>
            <div>Tags: {blog.tags?.join(", ")}</div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default BlogLayout;
