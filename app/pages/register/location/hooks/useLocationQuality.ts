import { useMemo } from 'react';
import { LocationQualityType, type LocationQuality } from '~/types/location';
import { LOCATION_QUALITIES } from '~/mocks/locations-mock';

interface UseLocationQualityReturn {
  getLocationQuality: (locationId: string) => LocationQualityType | null;
  getLatestQuality: (locationId: string) => LocationQualityType | null;
  getAllLocationQualities: (locationId: string) => LocationQuality[];
}

export function useLocationQuality(): UseLocationQualityReturn {
  const qualityMap = useMemo(() => {
    const map = new Map<string, LocationQualityType>();

    const locationQualities = LOCATION_QUALITIES.filter((quality) => !quality.deletedAt).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    locationQualities.forEach((quality) => {
      if (!map.has(quality.locationId)) {
        map.set(quality.locationId, quality.quality);
      }
    });

    return map;
  }, []);

  const getLocationQuality = useMemo(() => {
    return (locationId: string): LocationQualityType | null => {
      return qualityMap.get(locationId) || null;
    };
  }, [qualityMap]);

  const getLatestQuality = useMemo(() => {
    return (locationId: string): LocationQualityType | null => {
      const latestQuality = LOCATION_QUALITIES.filter(
        (quality) => quality.locationId === locationId && !quality.deletedAt,
      ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

      return latestQuality?.quality || null;
    };
  }, []);

  const getAllLocationQualities = useMemo(() => {
    return (locationId: string): LocationQuality[] => {
      return LOCATION_QUALITIES.filter(
        (quality) => quality.locationId === locationId && !quality.deletedAt,
      ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    };
  }, []);

  return {
    getLocationQuality,
    getLatestQuality,
    getAllLocationQualities,
  };
}
