import { useState } from "react";

function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setIsBookmarked((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isBookmarked ? "Hapus bookmark" : "Simpan lowongan"}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.75A2.75 2.75 0 0 1 8.75 2h6.5A2.75 2.75 0 0 1 18 4.75V21l-6-3.5L6 21V4.75Z" />
      </svg>
    </button>
  );
}

export default BookmarkButton;
