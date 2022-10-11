import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './CSS/EditModal.css';
import axios from './axios';

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

export default function BasicModal({data}) {
  const [open, setOpen] = React.useState(false);
  const [Article,setArticle]  = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }
  const handleEdit = async () =>{
      data.Article=Article;
    await axios.post('/article/update',{
        Article: data,
        Edit: true
    })
    .then(() => alert('Submitted successfully!!'))
    .catch(() => alert('Something went wrong! Try again later'));
    setOpen(false);
  }
  return (
    <div>
      <Button variant="contained" onClick={handleOpen} className="EditButton">Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="EditModal">
                <div className="header">Edit your article</div>
                <TextareaAutosize
                    aria-label="maximum height"
                    Value={Article}
                    onChange={(e)=>setArticle(e.target.value)}
                    defaultValue={data.Article}
                    style={{ width: 400, height:500 }}
                />
                <Button variant="contained" onClick={()=>handleEdit()} className="EditButton">Submit</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
