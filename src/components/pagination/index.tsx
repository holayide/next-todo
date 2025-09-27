import { Button } from "../button";
import { createPaginationRange } from "../../lib/index";
import type { TaskResponse } from "@/types/type";

import { ChevronRight, ChevronLeft } from "lucide-react";

type PaginationProps = {
  data: TaskResponse;
  onPageChange: (page: number) => void;
};

export function Pagination({ data, onPageChange }: PaginationProps) {
  const {
    page = 1,
    totalPages = 1,
    hasNextPage = false,
    hasPreviousPage = false,
  } = data?.meta || {};

  const paginationRange = createPaginationRange(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
        className="cursor-pointer hover:bg-pag-hover transition-colors disabled:opacity-50 bg-input-bg border border-foreground text-foreground"
      >
        <span className="hidden xs:block">Previous</span>
        <ChevronLeft className="block xs:hidden" />
      </Button>

      <div className="flex gap-2 flex-wrap">
        {/* {paginationRange.map((pageNum, idx) =>
          pageNum === "..." ? (
            <span key={idx + 1} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === page
                  ? "bg-blue-600 text-white cursor-not-allowed"
                  : "bg-input-bg hover:bg-pag-hover cursor-pointer"
              }`}
            >
              {pageNum}
            </button>
          )
        )} */}

        {paginationRange.map((pageNum, idx) =>
          pageNum === "..." ? (
            <span key={idx + 1} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              className={`px-3 py-1 rounded ${
                pageNum === page
                  ? "bg-blue-600 text-white cursor-not-allowed"
                  : "bg-input-bg hover:bg-pag-hover cursor-pointer"
              }`}
            >
              {pageNum}
            </button>
          )
        )}
      </div>

      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="cursor-pointer hover:bg-pag-hover transition-colors disabled:opacity-50 bg-input-bg border border-foreground text-foreground"
      >
        <span className="hidden xs:block">Next</span>
        <ChevronRight className="block xs:hidden" />
      </Button>
    </div>
  );
}
