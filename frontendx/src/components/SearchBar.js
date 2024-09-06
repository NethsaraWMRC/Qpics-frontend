import React, { useState, useEffect, useRef } from 'react'
import {Toolbar,InputBase, Box, Typography} from '@mui/material'
import { Search} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles'
// import { ImageData } from './ImagesData';
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"

const SSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.8),
    marginRight: theme.spacing(2),
  
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '40ch',
      },
      [theme.breakpoints.up('md')]: {
        width: '60ch',
      },
    },
  }));


const StyleToolBar = styled(Toolbar)({
    display:'flex',
    justifyContent:'space-between',
    backgroundColor:'white',
})


function SearchBar() {
  const [query,setQuery] = useState("");
  const [searchBox, setSearchBox] = useState(false);
  const [imageData, setImageData] = useState([]);
  const navigation = useNavigate();

    const baseUrl=`http://localhost:3030`;

    useEffect(()=>{
        fetchImages();
    },[imageData])

    const fetchImages = ()=>{
        axios.get(baseUrl+"/api/home").then((res)=>{
            setImageData(res.data);
            // console.log(imageData)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && query.trim() !== '') {
        // Redirect to the search page with the query
        navigation(`/search/${query}`);
      }
    };

  return (
    <Box>
        <SSearch onClick={() => setSearchBox(!searchBox)} >
            <SearchIconWrapper>
                <Search sx={{color:'#707070'}} />
                </SearchIconWrapper>
                        
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e=>setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />        

        </SSearch>
       
        <Box onMouseLeave={() => setSearchBox(!searchBox)} sx={{overflowY:'scroll',position:'absolute',boxShadow:'5px 5px 5px rgba(0,0,0,0.2)',backgroundColor:'white',color:'black',padding:'10px 0',width:'25%', maxHeight:'150px', display:searchBox ? 'block' : 'none' }}>
        {imageData.filter((name) => name.title.toLowerCase().includes(query)).slice(0, 8).map((name) => (
            <Link to={`/search/${query}`} style={{textDecoration:'none'}}>
              <Box key={name.imageUrl} sx={{cursor:'pointer',padding:'10px','&:hover':{backgroundColor:'rgba(0,0,0,0.1)'}}}>
               <Typography sx={{color:'black'}}>{name.title}</Typography>
              </Box>
            </Link>
        ))}
      </Box>

    </Box>
    
  )
}

export default SearchBar
