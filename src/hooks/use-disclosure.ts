import { useCallback, useState } from "react";

/**
 * Custom hook used to help handle common open, close, or toggle scenarios.
 */
export function useDisclosure({
  open,
  defaultOpen,
  onClose,
  onOpen,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?(): void;
  onClose?(): void;
} = {}) {
  const [openState, setOpen] = useState(defaultOpen ?? false);

  const isOpen = open ? open : openState;
  const controlled = Boolean(open);

  const handleOpen = useCallback(() => {
    if (!controlled) setOpen(true);
    onOpen?.();
  }, [controlled, onOpen]);

  const handleClose = useCallback(() => {
    if (!controlled) setOpen(false);
    onClose?.();
  }, [controlled, onClose]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [handleClose, handleOpen, isOpen]);

  return {
    open: isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
    setOpen,
  };
}
