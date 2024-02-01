import { Category } from "../contexts/Categories.context";

export const capitalizeEachWord = (sentence: string) => {
  return sentence
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getCategoryColor = (categoriesColor: Record<number, Category>, type: string) => {
  const categoryColor = Object.values(categoriesColor).find((category: Category) => category.type === type)

  return categoryColor?.color
}