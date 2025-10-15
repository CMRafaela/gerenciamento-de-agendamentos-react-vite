import type { Schedule, ScheduleCreate } from '@/types/schedule';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

export type ListParams = {
  page?: number;
  perPage?: number;
  q?: string;
};

export async function listSchedules(params: ListParams = {}): Promise<PaginatedResponse<Schedule>> {
  const page = params.page ?? 1;
  const perPage = params.perPage ?? 10;
  const q = params.q ?? '';

  const url = new URL(`${API_BASE_URL}/schedules`);
  url.searchParams.set('_page', String(page));
  url.searchParams.set('_limit', String(perPage));
  if (q) url.searchParams.set('description_like', q);
  url.searchParams.set('_sort', 'date,time');
  url.searchParams.set('_order', 'asc,asc');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Falha ao carregar agendamentos');
  }
  const total = Number(response.headers.get('X-Total-Count') ?? '0');
  const data: Schedule[] = await response.json();
  return { data, total };
}

export async function createSchedule(payload: ScheduleCreate): Promise<Schedule> {
  const response = await fetch(`${API_BASE_URL}/schedules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Falha ao criar agendamento');
  return response.json();
}

export async function updateSchedule(id: number, payload: ScheduleCreate): Promise<Schedule> {
  const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Falha ao atualizar agendamento');
  return response.json();
}

export async function deleteSchedule(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Falha ao excluir agendamento');
}


