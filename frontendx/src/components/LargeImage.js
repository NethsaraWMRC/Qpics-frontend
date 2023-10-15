import React from 'react'
import { Box} from '@mui/material'
import {Close } from '@mui/icons-material';

function LargeImage({imageUrl, onClose}) {
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
    <Box sx={{maxHeight: '80%',maxWidth: '80%',margin:'auto',display:'flex'}}>     
        <Box sx={{display:'flex',justifyContent:'right',alignItems:'end'}}> 
            
            {/* <Download sx={{position:'absolute',color:'white',fontSize:'35px',margin:'15px',boxShadow:'5px 5px 5px rgba(0,0,0,0.4)',backgroundColor:'red',cursor:'pointer'}}/> */}
            <img src={imageUrl} alt="Enlarged" style={{height: '100%',width: '100%',objectFit: 'contain', }}/>

        </Box>
            
        <Close onClick={onClose} sx={{position:'absolute',right:'0',color:'white',fontSize:'30px',margin:'0 20px',cursor:'pointer','&:hover':{opacity:'0.7'}}}/>

    </Box> 
    
    </Box>
  </Box>
  )
}

export default LargeImage
