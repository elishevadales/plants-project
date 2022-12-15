
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmButton = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
    <Button style={props.style} variant="outlined" onClick={handleClickOpen}>
      {props.btnText}
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.boxText}
      </DialogTitle>
      <DialogActions>
        <Button  onClick={handleClose}>No</Button>
        <Button onClick={handleClose  && props.agree} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default ConfirmButton