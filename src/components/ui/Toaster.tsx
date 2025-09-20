import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface ToastProps {
  toast: {
    id: string;
    title: string;
    description?: string;
  };
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  return (
    <div className="toast">
      <div className="toast__title">{toast.title}</div>
      {toast.description && (
        <div className="toast__description">{toast.description}</div>
      )}
    </div>
  );
};

export const Toaster: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
