import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface CustomPaginationProps {
  links: PaginationLink[];
  className?: string;
  showIcons?: boolean;
  compact?: boolean;
}

export function CustomPagination({
  links,
  className = "",
  showIcons = true,
  compact = false,
}: CustomPaginationProps) {
  if (links.length <= 1) return null;

  const firstPage = links[0];
  const lastPage = links[links.length - 1];
  const prevPage = links.find(link => link.label.includes("Previous") || links[1]);
  const nextPage = links.find(link => link.label.includes("Next") || links[links.length - 2]);
  const pageLinks = compact ? [] : links.slice(1, -1);

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* First Page */}
        {showIcons && firstPage.url && (
          <PaginationItem>
            <PaginationLink href={firstPage.url} isActive={firstPage.active}>
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">Primera página</span>
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Previous Page */}
        {prevPage && prevPage.url && (
          <PaginationItem>
            <PaginationLink href={prevPage.url} isActive={prevPage.active}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Numbered Pages (hidden in compact mode) */}
        {!compact &&
          pageLinks.map((link, index) => (
            <PaginationItem key={index}>
              {link.url ? (
                <PaginationLink
                  href={link.url}
                  isActive={link.active}
                  className={
                    link.active
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                >
                  {link.label}
                </PaginationLink>
              ) : (
                <span className="px-3 py-1 text-gray-500 dark:text-gray-400">
                  {link.label}
                </span>
              )}
            </PaginationItem>
          ))}

        {/* Next Page */}
        {nextPage && nextPage.url && (
          <PaginationItem>
            <PaginationLink href={nextPage.url} isActive={nextPage.active}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Siguiente</span>
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Last Page */}
        {showIcons && lastPage.url && (
          <PaginationItem>
            <PaginationLink href={lastPage.url} isActive={lastPage.active}>
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Última página</span>
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}