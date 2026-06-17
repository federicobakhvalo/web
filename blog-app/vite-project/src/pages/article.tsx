import type { IArticle } from "@/feautures/blog/blog.interface";
import BlogLayout from "@/feautures/blog/ui/blog-layout";
import { BlogNotFoundLayout } from "@/feautures/blog/ui/blog-not-found-layout";
import { mockArticles } from "@/mocks/data";
import type { PathParams, ROUTES } from "@/shared/config/route-config";

import { useParams, useSearchParams } from "react-router-dom";

function ArticlePage() {
  // useTypedParams called here as requested — BlogLayout also supports receiving `id` prop
  const { id } = useParams<PathParams[typeof ROUTES.MAIN.ARTICLE]>();

  const article = (mockArticles as IArticle[]).find((a) => a.id === Number(id));

  if (!article) {
    return <BlogNotFoundLayout />;
  }
  return <BlogLayout blog={article} />;

  //   return <BlogLayout id={params.id} />;
}

export const Component = ArticlePage;
