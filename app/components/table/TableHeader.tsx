import type { TableHeaderProps } from './types';
import { styles } from './constants';
import { Icons } from './icons';
import { Button } from '~/components/button';
import { Badge } from '~/components/badge';

export function TableHeader({ config }: TableHeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{config.title}</h2>
          {config.count !== undefined && (
            <Badge config={{ variant: 'primary', size: 'sm' }}>
              {config.count} {config.countLabel || 'items'}
            </Badge>
          )}
        </div>
        {config.subtitle && <p className={styles.subtitle}>{config.subtitle}</p>}
      </div>

      {config.actions && (
        <div className={styles.actionsContainer}>
          {config.actions.import && (
            <button onClick={config.actions.import.onClick} className={styles.actionButton}>
              {Icons.download}
              <span>{config.actions.import.label}</span>
            </button>
          )}

          {config.actions.add && (
            <Button
              onClick={config.actions.add.onClick}
              config={{
                variant: 'primary',
                icon: Icons.plus,
                iconPosition: 'left',
              }}
            >
              {config.actions.add.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
