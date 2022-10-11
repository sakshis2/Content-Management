import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Signup from './Signup';
import Login from './Login';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({checkLogin}) {
  const [open, setOpen] = React.useState(false);
  const [logedIn,setLogedIn] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if(logedIn) {
      setLogedIn(false);
    }
  }
  const handleLogIn = () => {
    setLogedIn(true);
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>{logedIn?"SignUp":"Login In"}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {logedIn ? <Signup handleClose={handleClose} checked={checkLogin}/>: <Login handleClose={handleClose} checked={checkLogin} handleLogIn={handleLogIn}/>}
        </Box>
      </Modal>
    </div>
  );
}
