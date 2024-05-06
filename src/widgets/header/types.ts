export interface CatalogItem {
  subcategory: string;
  itemsCount?: number;
  items?: CatalogItem[];
}

export interface Category {
  category: string;
  icon: string;
  items: CatalogItem[];
}

export interface Catalog {
  categories: Category[];
}
