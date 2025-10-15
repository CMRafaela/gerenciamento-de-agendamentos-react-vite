import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
};

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Excluir",
  description = "Tem certeza que deseja excluir este item? Essa ação não poderá ser desfeita.",
}: Props) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={
        <>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await onConfirm();
              onOpenChange(false);
            }}>
            Excluir
          </Button>
        </>
      }
    />
  );
}
