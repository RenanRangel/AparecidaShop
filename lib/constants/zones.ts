export const STORE_ZONES = [
    'GALERIA',
    'AV_ITAGUACU',
    'PORTO_ITAGUACU',
    'SHOPPING',
    'LADEIRA',
    'RADIO_TV',
    'AV_JULIO_PRESTES',

  ] as const;
  
  export type StoreZoneValue = (typeof STORE_ZONES)[number];
  
  export const STORE_ZONE_LABELS: Record<StoreZoneValue, string> = {
    GALERIA: 'Galeria Recreio',
    AV_ITAGUACU: 'Av. Itaguaçu',
    PORTO_ITAGUACU: 'Porto Itaguaçu',
    SHOPPING: 'Centro de Apoio ao Romeiro',
    LADEIRA: 'Rua Monte Carmelo',
    RADIO_TV: 'Av. Getúlio Vargas',  
    AV_JULIO_PRESTES: 'Av. Dr. Júlio Prestes'
  };