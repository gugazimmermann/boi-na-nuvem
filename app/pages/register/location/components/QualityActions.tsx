import { memo, useCallback } from 'react';
import type { LocationQuality } from '~/types/location';

interface QualityActionsProps {
  quality: LocationQuality;
  onEdit: (quality: LocationQuality) => void;
  onDelete: (quality: LocationQuality) => void;
}

export const QualityActions = memo<QualityActionsProps>(({ quality, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => {
    onEdit(quality);
  }, [onEdit, quality]);

  const handleDelete = useCallback(() => {
    onDelete(quality);
  }, [onDelete, quality]);

  return (
    <div className="flex items-center gap-x-6">
      <button
        onClick={handleEdit}
        className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none cursor-pointer"
        title="Editar"
        aria-label={`Editar registro de qualidade ${quality.quality}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button
        onClick={handleDelete}
        className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none cursor-pointer"
        title="Excluir"
        aria-label={`Excluir registro de qualidade ${quality.quality}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
});

QualityActions.displayName = 'QualityActions';
