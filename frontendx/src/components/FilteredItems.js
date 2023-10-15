import React from 'react'
import { Box,Typography, Button, Container, ImageList, ImageListItem,Grid,ListSubheader,ImageListItemBar,IconButton} from '@mui/material'
import {Download, Favorite } from '@mui/icons-material';
import { useState, useEffect } from "react";
import styled from '@emotion/styled';
// import { ImageData } from './ImagesData';
import { useParams } from 'react-router-dom';
import LargeImage from './LargeImage';
import Masonry from '@mui/lab/Masonry';
import axios from "axios"

const CBox = styled(Box)({
    position:'absolute',
    display:'flex',
    justifyContent:'space-between',
    transition: '.5s ease', 
    height:'100%',
    width:'100%', 
    opacity:'0', 
    boxShadow: "inset 0px -50px 100px 0px rgb(0, 0, 0)",
    "&:hover":{
        opacity:'1',
    }

})  


function FilteredItems() {
    const { topic } = useParams();
    const lTopic = topic.toLowerCase();
    
    const [isView, setIsView] = useState(false);
    const [clickedUrl, setClickedUrl] = useState(null);
    const [imageData, setImageData] = useState([]);

    const baseUrl=`http://localhost:3030`;

    useEffect(()=>{
        fetchImages();
    },[])

    const fetchImages = ()=>{
        axios.get(baseUrl+"/api/home").then((res)=>{
            setImageData(res.data);
            // console.log(imageData)
        }).catch((err)=>{
            console.log(err);
        })
    }
  
    const handleClick = (imageUrl) => {
      setIsView(true);
      setClickedUrl(imageUrl);
    };
  
    const handleCloseImage = () => {
      setIsView(false);
      setClickedUrl(null);
    };

  return (
    <Container maxWidth='xl'>
        <Box>
            <Typography sx={{fontSize:'24px',fontWeight:'600',fontFamily:'Plus Jakarta Sans',margin:'30px 0'}}>{topic} Images</Typography>
        </Box>
      
        <Masonry columns={{xs:1,sm:2,md:3}} spacing={2}>
                {imageData.filter((name) => name.title.toLowerCase().includes(lTopic)).map((item) => (
    
                <Box onClick={() => {handleClick(item.imageUrl)}} key={item.imageUrl} sx={{"&:hover": {
                    cursor:'pointer',
                    
                  } }} >

                    <Box sx={{position:'relative'}}>
                        <CBox>
                          <Favorite sx={{color:'white',position:'absolute',right:'0',fontSize:'30px',margin:'10px 20px','&:hover':{opacity:'0.7'}}}/>
                          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',color:'white',position:'absolute',bottom:'5px',fontSize:'14px'}}>
                            <Typography sx={{marginLeft:'15px','&:hover':{opacity:'0.7'}}}>
                              {item.title}
                              
                              </Typography>
                              <Download sx={{fontSize:'35px',marginRight:'15px','&:hover':{opacity:'0.7'}}}/>
                          </Box>
                            
                        </CBox>
                        

                        <img
                            src={item.imageUrl}
                          
                            alt={item.title}
                            loading="lazy"
                            style={{ objectFit: "cover", width: "100%", height:'300px'}}
                        />

                        
                    </Box>
                       
  
                </Box>
                ))}
            </Masonry>

            {isView && clickedUrl && (
              <LargeImage imageUrl={clickedUrl} onClose={handleCloseImage}/>
            )}

    </Container>
  )
}

export default FilteredItems
