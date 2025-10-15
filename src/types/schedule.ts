import { z } from 'zod';

// Esquema e tipos em PT-BR: Agendamento
export const agendamentoSchema = z.object({
  id: z.number().int().positive().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  date: z.string().min(1, 'Data não pode ser no passado').refine((value) => {
    // Expecting ISO date (yyyy-mm-dd) 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parsed = new Date(value + 'T00:00:00');
    return parsed >= today;
  }, 'Data não pode ser no passado'),
  // Valida 00-23:00-59
  time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, 'Horário inválido'),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
});

export type Agendamento = z.infer<typeof agendamentoSchema>;

export const agendamentoCreateSchema = agendamentoSchema
  .omit({ id: true })
  .superRefine((val, ctx) => {
    // Combina data + hora para validar "no passado"
    if (!val.date || !val.time) return;
    const [h, m] = val.time.split(':').map(Number);
    const [y, mo, d] = val.date.split('-').map(Number);
    const combined = new Date(y, (mo || 1) - 1, d || 1, h || 0, m || 0, 0, 0);
    const now = new Date();
    if (combined.getTime() < now.getTime()) {
      ctx.addIssue({ code: 'custom', message: 'Data e horário não podem ser no passado', path: ['time'] });
    }
  });
export type AgendamentoCreate = z.infer<typeof agendamentoCreateSchema>;

export const scheduleSchema = agendamentoSchema;
export type Schedule = Agendamento;
export const scheduleCreateSchema = agendamentoCreateSchema;
export type ScheduleCreate = AgendamentoCreate;


