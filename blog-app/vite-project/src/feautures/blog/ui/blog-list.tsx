import React, { useMemo, useState } from "react";
import type { IArticleInfo } from "@/feautures/blog/blog.interface";
import { mockArticles } from "@/mocks/data";
import BlogSmallInfo from "./blog-small-info";
import { Button } from "@/shared/components/ui/button";

interface Props {
  pageSize?: number;
  articles?: IArticleInfo[];
}

export function BlogList({ pageSize = 4, articles: initialArticles }: Props) {
  const articles = useMemo(
    () => initialArticles || (mockArticles as IArticleInfo[]),
    [initialArticles],
  );
  const [page, setPage] = useState(1);

  const total = articles.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const start = (page - 1) * pageSize;
  const visible = articles.slice(start, start + pageSize);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((a) => (
          <BlogSmallInfo key={a.id} article={a} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
          >
            Next
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: pages }).map((_, i) => {
            const idx = i + 1;
            return (
              <Button
                key={idx}
                size="sm"
                variant={idx === page ? "default" : "ghost"}
                onClick={() => setPage(idx)}
              >
                {idx}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
