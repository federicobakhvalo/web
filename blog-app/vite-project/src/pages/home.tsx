import type { IArticleInfo } from "@/feautures/blog/blog.interface";
import BlogList from "@/feautures/blog/ui/blog-list";
import { mockArticles } from "@/mocks/data";

function HomePage() {
  const articles = mockArticles as IArticleInfo[];

  return (
    <main className="p-4">
      <h1 className="mb-4 text-xl font-medium">Latest Articles</h1>
      <BlogList pageSize={4} articles={articles} />
    </main>
  );
}

export const Component = HomePage;
