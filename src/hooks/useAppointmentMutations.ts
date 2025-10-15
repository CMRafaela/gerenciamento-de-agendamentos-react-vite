import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchedule, deleteSchedule, updateSchedule } from '@/services/api';
import type { AgendamentoCreate } from '@/types/schedule';

export function useAgendamentoMutations() {
    const queryClient = useQueryClient();

    const createMut = useMutation({
        mutationFn: (payload: AgendamentoCreate) => createSchedule(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules'] }),
    });

    const updateMut = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: AgendamentoCreate }) => updateSchedule(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules'] }),
    });

    const deleteMut = useMutation({
        mutationFn: (id: number) => deleteSchedule(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules'] }),
    });

    return { createMut, updateMut, deleteMut };
}


