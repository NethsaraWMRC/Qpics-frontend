import React from 'react'
import { Box,Typography, Button,TextField} from '@mui/material'
import {Close } from '@mui/icons-material';
import { useState,useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles'
import {Link} from 'react-router-dom';
import axios from 'axios'

const JButton = styled(Button)({
    backgroundColor:'rgb(5, 160, 129)',
    color:'white',
    '&:hover':{backgroundColor:'#048067'},
    fontFamily:'Plus Jakarta Sans',
    textTransform:'capitalize',
    fontWeight:'600',
    fontSize:'16px',
    
  })


function EditImage({imageUrl, onClose, imageId}) {
    let [title, setTitle] = useState('');
    let [tags, setTags] = useState('');
    const [imageData, setImageData] = useState([]);

    const baseUrl=`http://localhost:3030`;

    const handleDelete = ()=>{
        axios.delete(`${baseUrl}/api/delete/${imageId}`,{ headers: {"auth-token" : localStorage.getItem("token")}}).then(()=>{
            window.location.reload();
        }).catch((err)=>{
            console.log(err)
            
        })
    }

    const fetchData = ()=>{
        axios.get(`${baseUrl}/api/get/${imageId}`,{ headers: {"auth-token" : localStorage.getItem("token")}}).then((res)=>{
            setImageData(res.data);
            // console.log(imageData.title)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleUpdate = ()=>{
        if(!title){
            title=imageData.title
        }else if(!tags){
            tags=imageData.tag1
        }

        const updateImage ={
            title,
            tag1:tags
        }
        axios.put(`${baseUrl}/api/update/${imageId}`, updateImage,{ headers: {"auth-token" : localStorage.getItem("token")}}).then((res)=>{
            
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

  return (
    <Box>

        <Box
        className="image-modal"
        style={{
        position: 'fixed',
        top: '30px',
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        textAlign:'right',
        
        zIndex: 1000, // Ensure it's above other content
        }}
    >
    <Box sx={{maxHeight: '80%',maxWidth: '80%',margin:'auto',display:{sm:'block',md:'flex'},backgroundColor:"white", padding:"80px 30px", borderRadius:"5px"}}>     
        <Box sx={{display:'flex',justifyContent:'left',alignItems:'center',height: '250px',width: '400px'}}> 
            
            {/* <Download sx={{position:'absolute',color:'white',fontSize:'35px',margin:'15px',boxShadow:'5px 5px 5px rgba(0,0,0,0.4)',backgroundColor:'red',cursor:'pointer'}}/> */}
            <img src={imageUrl} alt="Enlarged" style={{height: '250px',width: '400px',objectFit: 'cover', borderRadius:"5px"}}/>

        </Box>

        <Box sx={{display:'flex', flexDirection:'column', gap:'40px', marginLeft:{xs:'0',md:'30px'}}}>
                  <Box>
                     <TextField onChange={(e)=>{setTitle(e.target.value)}} id="title" label={'Title: '+imageData.title}  variant="standard" sx={{width:'370px'}} />
                  </Box>
                  
                  <Box>
                      <TextField onChange={(e)=>{setTags(e.target.value)}} id="tags" label={'Tag: '+imageData.tag1}  variant="standard" sx={{width:'370px'}} />
                      
                  </Box>

                  <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center',maxWidth:'370px'}}>
                    <Link to={'/profile'}>
                      <JButton onClick={handleUpdate}>
                        Update
                      </JButton>
                    </Link>

                    <Box >
                      <DeleteIcon onClick={handleDelete} sx={{ fontSize: '36px', color: 'rgb(100, 100, 100)', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.3)' }, '&:active': { opacity: '0.6' } }} />
                    </Box> 
                    
                  </Box>
                  
        </Box>        
            
        <Close onClick={onClose} sx={{position:'absolute',right:'0',top:'80px',color:'white',fontSize:'30px',margin:{sm:"0",md:'0 20px'},cursor:'pointer','&:hover':{opacity:'0.7'}}}/>

    </Box> 
        
    </Box>
  </Box>
  )
}

export default EditImage
