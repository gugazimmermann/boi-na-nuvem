import { type Property } from '~/types/property';
import { PropertyService } from './propertyService';

const STORAGE_KEY = 'bnn:selectedPropertyId';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const SelectedPropertyService = {
  setSelectedPropertyId(propertyId: string): void {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, propertyId);
      try {
        window.dispatchEvent(
          new CustomEvent('bnn:selectedPropertyChanged', { detail: propertyId }),
        );
      } catch {}
    } catch {}
  },

  getSelectedPropertyId(): string | null {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },

  clearSelectedProperty(): void {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  },

  async getSelectedProperty(): Promise<Property | null> {
    const id = this.getSelectedPropertyId();
    if (!id) return null;
    try {
      return await PropertyService.getPropertyById(id);
    } catch {
      return null;
    }
  },
};
