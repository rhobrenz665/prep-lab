import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub Flavored Markdown (tables, lists, etc.)
import { Category } from "./categories";

export interface ReviewerNote {
  id: number;
  category_id: number;
  title: string;
  content: string; // Markdown content as a string
}

const ReviewerList = ({ selectedCategory }: { selectedCategory: Category | null }) => {
  const [notes, setNotes] = useState<ReviewerNote[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchNotes = useCallback(async (newPage: number) => {
    try {
      const categoryParam = selectedCategory ? `&categoryId=${selectedCategory.id}` : "";
      const response = await fetch(`/api/reviewer?page=${newPage}&limit=${limit}${categoryParam}`);
   
      if (!response.ok) throw new Error("Failed to fetch reviewer");

      const newReviewer: ReviewerNote[] = await response.json();
      console.log(newReviewer);

      setNotes((prev) => (newPage === 1 ? newReviewer : [...prev, ...newReviewer]));
      setHasMore(newReviewer.length === limit);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setHasMore(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setPage(1);
    setNotes([]);
    fetchNotes(1);
  }, [selectedCategory, fetchNotes]);

  return (
    <InfiniteScroll
      dataLength={notes.length}
      next={() => {
        setPage((prev) => prev + 1);
        fetchNotes(page + 1);
      }}
      hasMore={hasMore}
      loader={<p className="text-center">Loading more notes...</p>}
      endMessage={<p className="text-center text-gray-500">No more notes available.</p>}
    >
      <div className="p-4 max-w-2xl mx-auto">
      {notes.map((note) => (
          <div key={note.id} className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <div className="markdown-body text-sm md:text-base">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="prose prose-sm sm:prose-base lg:prose-lg"
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ReviewerList;