'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { paginationStyles } from '@/lib/blog-design-tokens';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 7 pages: [1] ... [current-1, current, current+1] ... [last]
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={paginationStyles.container}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${paginationStyles.button} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={isActive ? paginationStyles.activeButton : paginationStyles.button}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${paginationStyles.button} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
