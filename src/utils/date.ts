export function formatDateToDisplay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR');
}

export function formatTimeToDisplay(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}


