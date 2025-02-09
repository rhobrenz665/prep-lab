import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import QuestionCard from "@/components/question-card";
import { Category } from "./categories";

interface Question {
  id: number;
  question_text: string;
  expected_answer: string;
  category_id?: number;
}

const QuestionList = ({ selectedCategory }: { selectedCategory: Category | null }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchQuestions = useCallback(async (newPage: number) => {
    try {
      const categoryParam = selectedCategory ? `&categoryId=${selectedCategory.id}` : "";
      const response = await fetch(`/api/questions?page=${newPage}&limit=${limit}${categoryParam}`);
      
      
      if (!response.ok) throw new Error("Failed to fetch questions");

      const newQuestions: Question[] = await response.json();

      setQuestions((prev) => {
        return (newPage === 1 ? newQuestions : [...prev, ...newQuestions])
      });

      setHasMore(newQuestions.length === limit);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setHasMore(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setPage(1);
    setQuestions([]);
    fetchQuestions(1);
  }, [selectedCategory, fetchQuestions]);

  return (
    <InfiniteScroll
      dataLength={questions.length}
      next={() => {
        setPage((prev) => prev + 1);
        fetchQuestions(page + 1);
      }}
      hasMore={hasMore}
      loader={<p className="text-center">Loading more questions...</p>}
      endMessage={<p className="text-center text-gray-500">No more questions available.</p>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q.question_text} answer={q.expected_answer} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default QuestionList;