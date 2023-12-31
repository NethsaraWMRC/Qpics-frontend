import React from 'react'
import { Box,Typography, Button, Container, Avatar} from '@mui/material'
import { styled } from '@mui/material/styles'
import {Download, Favorite } from '@mui/icons-material';
import { useEffect,useState } from "react";
// import { ImageData } from './ImagesData';
import Masonry from '@mui/lab/Masonry';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import EditImage from './EditImage';

const JButton = styled(Button)({
    backgroundColor:'rgb(5, 160, 129)',
    color:'white',
    '&:hover':{backgroundColor:'#048067'},
    fontFamily:'Plus Jakarta Sans',
    textTransform:'capitalize',
    fontWeight:'600',
    fontSize:'18px',
    marginLeft:'5px',
    padding:'0 20px',
    height:'50px'
    
})

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

function Profile() {

    const [isView, setIsView] = useState(false);
    const [clickedUrl, setClickedUrl] = useState(null);
    const [imageId, setImageId] = useState('');

    const [imageData, setImageData] = useState([]);
    const [userData, setUserData] = useState('');
    const navigation = useNavigate();

    const baseUrl=`http://localhost:3030`;

    useEffect(()=>{
        fetchImages();
        fetchUser();
    },[])

    const fetchImages = ()=>{
        axios.get(baseUrl+"/api/profile", { headers: {"auth-token" : localStorage.getItem("token")}}).then((res)=>{
            setImageData(res.data);
            // console.log(imageData)
        }).catch((err)=>{
            if (err.response && err.response.status === 401) {
                // This is an unauthorized error
                console.log("Unauthorized error");
                // Perform your specific actions for unauthorized error here
                
                localStorage.setItem('isLoggedIn', 'false');
                navigation('/login');
                window.location.reload();
              } else {
                // Handle other errors
                console.log("Error:", err);
              }
            

        })
    }

    const fetchUser = ()=>{
        axios.get(baseUrl+"/api/user",{ headers: {"auth-token" : localStorage.getItem("token")}}).then((res)=>{
            setUserData(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleClick = (imageUrl,id) => {
        setIsView(true);
        setClickedUrl(imageUrl);
        setImageId(id);
      };
    
      const handleCloseImage = () => {
        setIsView(false);
        setClickedUrl(null);
      };
    
  return (
    <Container maxWidth='xl' sx={{justifyContent:'center'}}>
        <Box sx={{width:'100%',paddingBottom:'60px',marginBottom:'20px',textAlign:'center', borderBottom:'2px solid rgba(0,0,0,0.1)'}}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 140, height: 140, margin:'auto', marginTop:'80px' }}/>
            
            <Typography sx={{fontSize:'64px', fontWeight:'500'}}>
                {userData.username}
            </Typography>
            
            <JButton>
                Edit profile
            </JButton>

        </Box>

        <Box>
            <Typography  sx={{fontSize:'24px' , fontWeight:'600', marginBottom:'20px'}}>
                Gallery
            </Typography>
        </Box>
        
        <Masonry columns={{xs:1,sm:2,md:3}} spacing={2}>
                {imageData.slice().reverse().map((item) => (
    
                <Box key={item.imageUrl} sx={{marginBottom:'10px',"&:hover": {
                    cursor:'pointer',
                    
                  } }} >

                    <Box onClick={() => {handleClick(item.imageUrl, item._id)}} sx={{position:'relative', gap:'2'}}>
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
                            style={{ objectFit: "cover",display: 'block', width: '100%',}}
                        />
      
                    </Box>
                </Box>
                ))}
            </Masonry>
            {isView && clickedUrl && (
              <EditImage imageUrl={clickedUrl} imageId={imageId} onClose={handleCloseImage}/>
            )}
    </Container>
  )
}

export default Profile

