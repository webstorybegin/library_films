import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ToastMessage {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export const Toast: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    const handleShowToast = (event: CustomEvent<ToastMessage>) => {
      setToastMessage(event.detail);
      setOpen(true);
    };

    window.addEventListener('showToast', handleShowToast as EventListener);

    return () => {
      window.removeEventListener('showToast', handleShowToast as EventListener);
    };
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={handleClose} severity={toastMessage.severity} variant="filled">
        {toastMessage.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
