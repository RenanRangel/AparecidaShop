interface GeocodingResult {
    latitude: number;
    longitude: number;
  }
  
  /**
   * Geocodifica um endereço em coordenadas usando o Nominatim (OpenStreetMap).
   *
   * Uso responsável, conforme a política do serviço
   * (https://operations.osmfoundation.org/policies/nominatim/): chamado no
   * máximo 1x por cadastro/edição de loja — nunca em lote, nunca repetido em
   * loop. Se um dia o volume de cadastros crescer muito, considerar migrar
   * para um provedor pago (Google Geocoding, Mapbox).
   *
   * Falha "silenciosamente" (retorna null) — geocodificação nunca pode
   * impedir o cadastro da loja em si.
   */
  export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
    try {
      const params = new URLSearchParams({
        q: `${address}, Aparecida, SP, Brasil`,
        format: 'json',
        limit: '1',
      });
  
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: {
          // Exigido pela política de uso do Nominatim — identifica a aplicação.
          'User-Agent': 'AparecidaShop/1.0 (contato@aparecidashop.com.br)',
        },
      });
  
      if (!response.ok) return null;
  
      const results = await response.json();
      if (!Array.isArray(results) || results.length === 0) return null;
  
      const [result] = results;
      const latitude = Number(result.lat);
      const longitude = Number(result.lon);
  
      if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;
  
      return { latitude, longitude };
    } catch (error) {
      console.error('Falha ao geocodificar endereço:', error);
      return null;
    }
  }