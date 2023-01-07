import * as React from 'react';
import { Typography, IconButton, DialogActions, DialogContent, DialogTitle, Dialog, styled, Button } from '@mui/material';
import { RiCloseFill } from 'react-icons/ri';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <RiCloseFill />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function ModalError({ title, descriptionError }: any) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ backdropFilter: 'blur(3px)', bgcolor: 'rgba(0,0,0, 0.5)' }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          { title }
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            { descriptionError }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={handleClose}
            sx={{ 
              backgroundColor: 'secondary.main',
              '&:hover': {
                  backgroundColor: 'info.main',
              }, 
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}