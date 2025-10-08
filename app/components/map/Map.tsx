interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: string;
  height?: string;
  className?: string;
}

export function Map({
  latitude,
  longitude,
  zoom = 17,
  width = '100%',
  height = '300px',
  className = '',
}: MapProps) {
  const zoomFactor = Math.pow(2, 18 - zoom);
  const bboxSize = 0.01 / zoomFactor;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - bboxSize},${latitude - bboxSize},${longitude + bboxSize},${latitude + bboxSize}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className={`map-container ${className}`}>
      <iframe
        width={width}
        height={height}
        src={mapUrl}
        style={{ border: 'none', borderRadius: '8px' }}
        title="Mapa da Localização"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

interface MapWithFallbackProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  zoom?: number;
  width?: string;
  height?: string;
  className?: string;
}

export function MapWithFallback({
  latitude,
  longitude,
  address,
  zoom = 17,
  width = '100%',
  height = '300px',
  className = '',
}: MapWithFallbackProps) {
  if (latitude && longitude) {
    return (
      <Map
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  if (address && address !== 'Não informado') {
    const searchUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`;

    return (
      <div className={`map-fallback ${className}`}>
        <div className="bg-gray-100 rounded-lg p-6 text-center" style={{ height }}>
          <div className="flex flex-col items-center justify-center h-full">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Mapa não disponível</h3>
            <p className="text-sm text-gray-600 mb-4">
              Coordenadas não informadas para esta propriedade
            </p>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Buscar no OpenStreetMap
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`map-placeholder ${className}`}>
      <div className="bg-gray-100 rounded-lg p-6 text-center" style={{ height }}>
        <div className="flex flex-col items-center justify-center h-full">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Localização não informada</h3>
          <p className="text-sm text-gray-600">
            Adicione coordenadas ou endereço para visualizar o mapa
          </p>
        </div>
      </div>
    </div>
  );
}
