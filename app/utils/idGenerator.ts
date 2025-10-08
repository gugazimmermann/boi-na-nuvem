let idCounter = 0;

export function generateId(prefix: string): string {
  return `${prefix}-${++idCounter}`;
}

export function resetIdCounter(): void {
  idCounter = 0;
}
