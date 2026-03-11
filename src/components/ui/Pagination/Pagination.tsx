import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { netflixTheme } from "../../../theme/colors";

const useStyles = makeStyles({
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "32px 0 48px",
    flexWrap: "wrap",
    '@media (max-width: 960px)': {
      gap: "4px",
      padding: "24px 16px 32px",
    },
    '@media (min-width: 2560px)': {
      gap: "12px",
      padding: "48px 0 64px",
    },
    '@media (min-width: 3840px)': {
      gap: "16px",
      padding: "64px 0 80px",
    },
  },
  button: {
    minWidth: "40px",
    height: "40px",
    padding: "0 12px",
    '@media (max-width: 960px)': {
      minWidth: "32px",
      height: "32px",
      padding: "0 8px",
      fontSize: "12px",
    },
    borderRadius: "4px",
    border: "none",
    backgroundColor: netflixTheme.background.card,
    color: netflixTheme.text.primary,
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "var(--card-hover)",
    },
    "&:disabled": {
      opacity: 0.3,
      cursor: "default",
      "&:hover": {
        backgroundColor: netflixTheme.background.card,
      },
    },
    '@media (min-width: 2560px)': {
      minWidth: "56px",
      height: "56px",
      padding: "0 16px",
      fontSize: "20px",
    },
    '@media (min-width: 3840px)': {
      minWidth: "72px",
      height: "72px",
      padding: "0 20px",
      fontSize: "26px",
    },
  },
  active: {
    backgroundColor: netflixTheme.accent,
    color: "#fff",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: netflixTheme.accent,
    },
  },
  ellipsis: {
    color: netflixTheme.text.secondary,
    fontSize: "14px",
    padding: "0 4px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    background: "none",
    minWidth: "40px",
    height: "40px",
    '@media (min-width: 2560px)': {
      minWidth: "56px",
      height: "56px",
      fontSize: "20px",
    },
    '@media (min-width: 3840px)': {
      minWidth: "72px",
      height: "72px",
      fontSize: "26px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: netflixTheme.text.primary,
    },
  },
  pageInput: {
    width: "60px",
    height: "40px",
    borderRadius: "4px",
    border: `1px solid ${netflixTheme.accent}`,
    backgroundColor: netflixTheme.background.card,
    color: netflixTheme.text.primary,
    fontSize: "14px",
    fontWeight: 500,
    textAlign: "center",
    outline: "none",
    "&:focus": {
      borderColor: netflixTheme.text.primary,
    },
    '@media (min-width: 2560px)': {
      width: "80px",
      height: "56px",
      fontSize: "20px",
    },
    '@media (min-width: 3840px)': {
      width: "100px",
      height: "72px",
      fontSize: "26px",
    },
  },
});

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const classes = useStyles();
  const maxPages = Math.min(totalPages, 500);
  const [editingEllipsis, setEditingEllipsis] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingEllipsis !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingEllipsis]);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (maxPages <= 7) {
      for (let i = 1; i <= maxPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("left-ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(maxPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < maxPages - 2) pages.push("right-ellipsis");
    pages.push(maxPages);
    return pages;
  };

  const handleEllipsisClick = (index: number) => {
    setEditingEllipsis(index);
    setInputValue("");
  };

  const submitPage = () => {
    const page = parseInt(inputValue, 10);
    if (page >= 1 && page <= maxPages) {
      onPageChange(page);
    }
    setEditingEllipsis(null);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitPage();
    } else if (e.key === "Escape") {
      setEditingEllipsis(null);
      setInputValue("");
    }
  };

  if (maxPages <= 1) return null;

  return (
    <div className={classes.pagination}>
      <button
        className={classes.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {getPageNumbers().map((page, index) =>
        typeof page === "string" ? (
          editingEllipsis === index ? (
            <input
              key={`input-${index}`}
              ref={inputRef}
              className={classes.pageInput}
              type="number"
              min={1}
              max={maxPages}
              value={inputValue}
              placeholder="#"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={submitPage}
            />
          ) : (
            <button
              key={`ellipsis-${index}`}
              className={classes.ellipsis}
              onClick={() => handleEllipsisClick(index)}
              title="Go to page..."
            >
              ...
            </button>
          )
        ) : (
          <button
            key={page}
            className={`${classes.button} ${page === currentPage ? classes.active : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className={classes.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
      >
        Next
      </button>
    </div>
  );
};
