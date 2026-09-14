export const STORE_ZONES = [
    'CENTRO',
    'AV_ITAGUACU',
    'PROXIMO_SANTUARIO',
    'PORTO_ITAGUACU',
  ] as const;
  
  export type StoreZoneValue = (typeof STORE_ZONES)[number];
  
  export const STORE_ZONE_LABELS: Record<StoreZoneValue, string> = {
    CENTRO: 'Centro',
    AV_ITAGUACU: 'Av. Itaguaçu',
    PROXIMO_SANTUARIO: 'Próximo ao Santuário',
    PORTO_ITAGUACU: 'Porto Itaguaçu',
  };