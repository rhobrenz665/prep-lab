import QuestionList from "@/components/question-list";
import Categories from "@/components/categories";

import { useEffect, useState } from "react";

export interface Category {
  id: number;
  category_name: string;
}

const allCategory: Category = { id: 0, category_name: "All" }

const InterviewPrep = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

    useEffect(() => {
          const fetchCategories = async () => {
            try {
              const response = await fetch("/api/categories");
              const data = await response.json();
              setCategories([allCategory, ...data]);
            } catch (error) {
              console.error("Failed to load categories", error);
            } finally {
              setLoadingCategories(false);
            }
          };
          fetchCategories();
    }, []);

    return (
      <div>
        <h2 className="text-xl font-bold">Interview Questions & Answers</h2>
        <Categories 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            loadingCategories={loadingCategories} 
        />
        <QuestionList selectedCategory={selectedCategory} />
      </div>
    );
  };
  
  export default InterviewPrep;