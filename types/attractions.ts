export interface Attraction {
  id: string;
  name: string;
  category: 'Religioso' | 'História' | 'Mirante' | 'Passeio' | 'Família' | 'Compras';
  emoji: string;
  description: string;
  mapClusterId?: 'santuario' | 'porto-itaguacu'; 
  mapSearchQuery?: string;
}