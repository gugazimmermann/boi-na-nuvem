import { useMemo, useCallback } from 'react';
import { EMPLOYESS, PROPERTYHASEMPLOYEE } from '~/mocks/employee-mock';

export function useEmployeeCount() {
  const employeeCountMap = useMemo(() => {
    const map = new Map<string, number>();

    PROPERTYHASEMPLOYEE.forEach((propertyEmployee) => {
      const currentCount = map.get(propertyEmployee.propertyId) || 0;
      map.set(propertyEmployee.propertyId, currentCount + 1);
    });

    return map;
  }, []);

  const getEmployeeCount = useCallback(
    (propertyId: string) => {
      return employeeCountMap.get(propertyId) || 0;
    },
    [employeeCountMap],
  );

  const getEmployeeCounts = useCallback(
    (propertyIds: string[]) => {
      return propertyIds.map((id) => ({
        propertyId: id,
        count: getEmployeeCount(id),
      }));
    },
    [getEmployeeCount],
  );

  return {
    getEmployeeCount,
    getEmployeeCounts,
    totalEmployees: EMPLOYESS.length,
  };
}
