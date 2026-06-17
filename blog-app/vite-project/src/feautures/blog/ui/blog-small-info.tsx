import React from "react";
import type { IArticleInfo } from "@/feautures/blog/blog.interface";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  article: IArticleInfo;
}

export function BlogSmallInfo({ article }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Author: {article.author}
        </div>
      </CardContent>
      <CardFooter className="justify-between flex flex-wrap items-center">
        <p className="text-xs text-muted-foreground">
          {article.createdAt.toLocaleDateString()}
        </p>
        <div className="text-xs text-muted-foreground">
          <Button asChild>
            <Link to={`/articles/${article.id}`}>Read More</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default BlogSmallInfo;
