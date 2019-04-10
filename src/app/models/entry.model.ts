import { Category } from './category.model';

export class Entry {
  id: number;
  timestamp: Date;
  price: number;
  category: Category;
  info: string;
  userId: number;
}
