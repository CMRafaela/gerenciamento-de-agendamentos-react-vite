import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { Modal } from "@/components/molecules/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  agendamentoCreateSchema,
  type Agendamento,
  type AgendamentoCreate,
  scheduleCreateSchema,
} from "@/types/schedule";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AgendamentoCreate, id?: number) => Promise<void> | void;
  initialData?: Agendamento | null;
};

export function ScheduleFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AgendamentoCreate>({
    resolver: zodResolver(agendamentoCreateSchema ?? scheduleCreateSchema),
    defaultValues: initialData
      ? {
          description: initialData.description,
          date: initialData.date,
          time: initialData.time,
          responsible: initialData.responsible,
        }
      : undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        description: initialData.description,
        date: initialData.date,
        time: initialData.time,
        responsible: initialData.responsible,
      });
    } else {
      reset({ description: "", date: "", time: "", responsible: "" });
    }
  }, [initialData, reset, open]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData?.id ? "Editar Agendamento" : "Novo Agendamento"}
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            className="border-gray-300 hover:bg-gray-200 hover:border-gray-500 hover:text-gray-900"
            onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="disabled:opacity-50"
            form="schedule-form">
            {initialData ? "Salvar" : "Criar"}
          </Button>
        </>
      }>
      <form
        id="schedule-form"
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data, initialData?.id);
          onOpenChange(false);
        })}>
        <div>
          <Label className="mb-1">Descrição</Label>
          <Input {...register("description")} />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mb-1">Data</Label>
            <Input type="date" {...register("date")} />
            {errors.date && (
              <p className="text-xs text-red-600 mt-1">{errors.date.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-1">Horário</Label>
            <Input type="time" {...register("time")} />
            {errors.time && (
              <p className="text-xs text-red-600 mt-1">{errors.time.message}</p>
            )}
          </div>
        </div>
        <div>
          <Label className="mb-1">Responsável</Label>
          <Input {...register("responsible")} />
          {errors.responsible && (
            <p className="text-xs text-red-600 mt-1">
              {errors.responsible.message}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}
