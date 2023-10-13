import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography,Box, Button,Drawer} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { styled} from '@mui/material/styles'
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom'
import logo from '../images/qlogo.png'


const StyleToolBar = styled(Toolbar)({
    display:'flex',
    justifyContent:'space-between',
    backgroundColor:'white',
})

const Navlinks = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    gap:'15px',
    
})

const LButton = styled(Button)({
   
    color: 'rgba(74, 74, 74, 0.9)', 
    display: 'block', 
    '&:hover':{backgroundColor:'white', color:'rgb(34, 34, 34)'},
    fontFamily:'Plus Jakarta Sans',
    textTransform:'capitalize',
    fontWeight:'600',
    fontSize:'16px',

})

const JButton = styled(Button)({
    backgroundColor:'rgb(5, 160, 129)',
    color:'white',
    '&:hover':{backgroundColor:'#048067'},
    fontFamily:'Plus Jakarta Sans',
    textTransform:'capitalize',
    fontWeight:'600',
    fontSize:'16px',
    marginLeft:'5px',
    
})


function NavBar(props) {
    const [openMenu, setOpenMenu] = useState(false)
    

  return (
    <AppBar position='sticky' sx={{boxShadow:'0px 2px 5px rgba(0,0,0,0.1)',}}>
        <StyleToolBar>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Link to={'/'}>
                    <JButton>
                        {/* <img src={logo} style={{height:'40px',width:'40px', objectFit:'cover'}}/> */}
                        Logo
                    </JButton>
                </Link>
                
                 
            
                    <Typography sx={{
                       
                        color:'#252B42',
                        opacity:'0.9',
                        fontSize:'24px', 
                        marginRight:'25px',
                        fontFamily:'Plus Jakarta Sans',
                        textTransform:'capitalize',
                        fontWeight:'800',
                        fontSize:'24px',
                        marginLeft:'20px',
                        letterSpacing:'0.5px',
                        
                        
                        }}>Qpics
                    </Typography>
              

            </Box>
            
            <SearchBar/>

            <Navlinks>   
                <MenuIcon onClick={()=>{
                    setOpenMenu(!openMenu);
                    console.log(openMenu)
                }} 
                sx={{display:{xs: 'block', md: 'none'},color:'black',cursor:'pointer'}}/>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },alignItems:'center'}}>
                   
                    <Link to={'/profile'} style={{ textDecoration: 'none',display:props.state ? 'block' : 'none' }}>
                            <LButton>profile</LButton>
                    </Link>

                    <a href='/' style={{ textDecoration: 'none',display:props.state ? 'block' : 'none' }}>
                            <LButton onClick={()=>{localStorage.setItem('isLoggedIn', 'false');}}>logout</LButton>
                    </a>
                    
                    <Link to={'/upload'} style={{textDecoration:'none',display:props.state ? 'block' : 'none'}}><JButton>upload</JButton> </Link> 

                    <Link to={'/login'} style={{textDecoration:'none',display:props.state ? 'none' : 'block' }}><JButton>Sign In</JButton> </Link>

            
                </Box>

            </Navlinks>

            

        </StyleToolBar>
    </AppBar>
  )
}

export default NavBar
