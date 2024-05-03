import { useState } from 'react';
import catalog from '../catalog/catalog.json';

export function useCatalog() {
  const { categories } = catalog.catalog;
  const [subcategoryItems, setSubcategoryItems] = useState(categories[0].items);
  const [activeCategory, setActiveCategory] = useState<string>();

  const updateSubcategoryItems = (category: string = 'Бытовая техника') => {
    setActiveCategory(category);
    const selectedCategory = categories.find((el) => el.category === category);
    if (selectedCategory) {
      setSubcategoryItems(selectedCategory.items);
    }
  };

  return { categories, subcategoryItems, updateSubcategoryItems, activeCategory };
}
