import React, { useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link,useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, createContext } from 'react';
import { Context } from '../App';
import axios from 'axios'


const defaultTheme = createTheme();



export default function Login() {
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [CState, setCState] = useContext(Context);
    const navigation = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // setEmail(document.getElementById('email').value);
        // setPassword(document.getElementById('password').value);

      const user = {
        email,
        password
      }
        
      axios.post('http://localhost:3030/api/login', user).then((res)=>{
        localStorage.setItem('isLoggedIn', 'true');

        const authToken = res.data;
        localStorage.setItem('token', authToken);
        setCState(true);

        navigation('/profile');
      }).catch((err)=>{
        console.log(err)
      })
    };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'rgb(5, 160, 129)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            `    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e)=>{setEmail(e.target.value)}}
                    
                />
                
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    
                />

               
                
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,backgroundColor:'rgb(5, 160, 129)','&:hover':{backgroundColor:'#048067'},}}>

                        Sign In
                    </Button>
               
                
                

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/register'} variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>`

          </Box>
        </Box>
      </Container>

    </ThemeProvider>
  );
}