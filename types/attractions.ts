export type AttractionCategory =
  | 'Religioso'
  | 'História'
  | 'Mirante'
  | 'Passeio'
  | 'Família'
  | 'Compras';

export interface Attraction {
  id: string;
  name: string;
  category: AttractionCategory;
  emoji: string;
  description: string;
}