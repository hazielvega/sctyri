import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  footerButtons?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  showCancelButton?: boolean; // Nueva prop
}

export const Modal = ({
  open,
  onOpenChange,
  trigger,
  title,
  children,
  footerButtons,
  size = 'lg',
  closeOnOverlayClick = true,
  showCancelButton = true, // Valor por defecto true
}: ModalProps) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // No mostrar Cancelar si se pasan footerButtons personalizados
  const shouldShowCancel = showCancelButton && !footerButtons;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      
      <DialogContent 
        className={`${sizeClasses[size]} overflow-y-auto max-h-[90vh]`}
        onInteractOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
      >

        {title && (
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className="py-4">{children}</div>

        {(footerButtons || shouldShowCancel) && (
          <div className="flex justify-end gap-2 pt-4">
            {footerButtons}
            {shouldShowCancel && (
              <DialogClose asChild>
                <Button variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};