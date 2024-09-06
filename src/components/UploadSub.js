import React from 'react'
import { Typography,Box, Button, Container, TextField} from '@mui/material'
import { styled } from '@mui/material/styles'
import {Link} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from 'react';
import Upload from './Upload';
import axios from "axios"
import Cookies from 'js-cookie';



const UploadBox = styled(Box)({
    width:'100%', 
    borderRadius:'30px',
    alignItems:'center',
    padding:'60px 0',
    backgroundColor:'rgba(222, 220, 220, 0.3)',
  
    
})
const JButton = styled(Button)({
  backgroundColor:'rgb(5, 160, 129)',
  color:'white',
  '&:hover':{backgroundColor:'#048067'},
  fontFamily:'Plus Jakarta Sans',
  textTransform:'capitalize',
  fontWeight:'600',
  fontSize:'16px',
  
})

function UploadSub(props) {
  const [deleteImg, setDeleteImg] = useState(null);
  const [isDisplay,setIsDisplay] = useState('block');
  const [image,setImage] = useState('')
  // const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const token = Cookies.get('token');

  useEffect(()=>{
    if(deleteImg){
      setIsDisplay('none');
    }
  },[deleteImg])

  const handleUpload = () => {
    if (props.file) {
      const formData = new FormData();
      formData.append("image", props.file);
      formData.append("title", title);
      formData.append("tag1", tags);

  
      const baseUrl = `http://localhost:3030/api/upload`;
     
      axios
        .post(baseUrl, formData, { headers: {"auth-token" : localStorage.getItem("token")} }) // Send the formData as the request body
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          console.log({ 'auth-token': localStorage.getItem('token') });
        });
    }
  };

  return (
    <Container maxWidth='lg'>
        <UploadBox sx={{display:isDisplay}}>
            <Box sx={{display:{sm:'block',md:'flex'}, justifyContent:'space-around',margin:'30px'}}>
                <img src={props.path} style={{borderRadius:'10px',maxWidth:'60%',maxHeight:'300px',minWidth:'350px'}}/>
                <Box sx={{display:'flex', flexDirection:'column', gap:'40px', marginLeft:{xs:'0',md:'30px'}}}>
                  <Box>
                     <TextField onChange={(e)=>{setTitle(e.target.value)}} id="title" label="Title" variant="standard" sx={{width:'370px'}} />
                  </Box>
                  
                  <Box>
                      <TextField onChange={(e)=>{setTags(e.target.value)}} id="tags" label="Tags" variant="standard" sx={{width:'370px'}} />
                      
                  </Box>

                  <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center',maxWidth:'370px'}}>
                    <Link to={'/profile'}>
                      <JButton onClick={handleUpload}>
                        Submit file
                      </JButton>
                    </Link>

                    <Box onClick={() => { setDeleteImg(true); }}>
                      <DeleteIcon sx={{ fontSize: '36px', color: 'rgb(100, 100, 100)', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.3)' }, '&:active': { opacity: '0.6' } }} />
                    </Box> 
                    
                  </Box>
                  
                </Box>
               
            </Box>
        </UploadBox>

        {deleteImg && (
          <Upload/>
        )}
        
    </Container>
    
  )
}

export default UploadSub
