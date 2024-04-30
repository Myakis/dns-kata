import { useState } from 'react';
import catalog from '../catalog/catalog.json';

export function useCatalog() {
  const { categories } = catalog.catalog;
  const [subcategoryItems, setSubcategoryItems] = useState(categories[0].items);

  const updateSubcategoryItems = (category: string = 'Бытовая техника') => {
    const selectedCategory = categories.find((el) => el.category === category);
    if (selectedCategory) {
      setSubcategoryItems(selectedCategory.items);
    }
  };

  return { categories, subcategoryItems, updateSubcategoryItems };
}
