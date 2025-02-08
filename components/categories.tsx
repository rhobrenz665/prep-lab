export interface Category {
    id: number;
    category_name: string;
  }

interface CategoriesProps {
    categories: Category[];
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
    loadingCategories: boolean;
  }


const Categories = ({ categories, selectedCategory, onSelectCategory, loadingCategories }: CategoriesProps) => {
    return (
        <div className="max-w-5xl mx-auto p-6">
             {loadingCategories ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : (
          <>
            <div className="hidden sm:flex flex-wrap gap-2 justify-center">
              {categories && categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-md transition ${
                    selectedCategory?.id === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => onSelectCategory(category)}
                >
                  {category.category_name}
                </button>
              ))}
            </div>
      
            <div className="sm:hidden">
              <select
                className="w-full p-3 border rounded-md bg-white text-gray-700"
                value={selectedCategory?.id || ""}
                onChange={(e) => {
                  const selected = categories.find((cat) => cat.id === Number(e.target.value));
                  if (selected) onSelectCategory(selected);
                }}
              >
                {categories && categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        </div>
    );
};

export default Categories;