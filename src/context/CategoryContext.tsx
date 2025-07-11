// src/context/CategoryContext.tsx
import { createContext, useContext, useState } from "react";

interface CategoryContextType {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType>({
  selectedCategory: null,
  setSelectedCategory: () => {},
});

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};