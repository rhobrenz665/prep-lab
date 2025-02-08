
"use client";
import QuestionCard from '@/components/question-card'

import { useState, useEffect } from "react";

export default function QuestionList() {
    const [questions, setQuestions] = useState<{ id: number, question_text: string; expected_answer: string }[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await fetch("/api/questions");
          const data = await response.json();
          setQuestions(data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchQuestions();
    }, []);
  
    return (
      <div className="max-w-5xl mx-auto p-6">
        {loading ? (
          <p className="text-center">Loading questions...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((q) => (
              <QuestionCard key={q.id} question={q.question_text} answer={q.expected_answer} />
            ))}
          </div>
        )}
      </div>
    );
  }