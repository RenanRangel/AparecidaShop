export interface MapCluster {
  id: 'santuario' | 'porto-itaguacu';
  name: string;
  lat: number;
  lng: number;
}

// Coordenadas verificadas (não estimadas) dos dois núcleos onde a maioria
// dos pontos turísticos está concentrada.
export const mapClustersFixture: MapCluster[] = [
  { id: 'santuario', name: 'Santuário Nacional', lat: -22.8497, lng: -45.2339 },
  { id: 'porto-itaguacu', name: 'Porto Itaguaçu', lat: -22.8582, lng: -45.2544 },
];