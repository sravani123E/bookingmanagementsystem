export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

export interface CreateBookDto {
  title: string;
  author: string;
  publishedYear: number;
}

export interface ImportResult {
  addedCount: number;
  errors: Array<{
    row: number;
    errors: string[];
  }>;
}