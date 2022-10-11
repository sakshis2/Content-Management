import React,{useState} from 'react'
import DropDown from './DropDown';
import {Button} from '@mui/material';
import './CSS/Login.css';
import axios from './axios';
import Cookies from 'js-cookie';

function Login({handleLogIn,handleClose,checked}) {

    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [Question,setQuestion] = useState('');
    const [Answer,setAnswer] = useState('');

    const handelQuestionChange=(value)=>{
        setQuestion(value);
    }

    const validate = () =>{
        if(Email && Password && Question && Answer){
            return true;
        }
        return false;
    }
    const handelSubmit = async () =>{
        if(!validate()) {
            alert('Please fill all columns correctly!!!');
        }else{
            await axios.post('/login',{
                Email:Email,
                Password:Password,
                Question:Question,
                Answer:Answer,
            }).then((response) =>{
                if(response.status===400)
                alert('Please fill all columnms correctly !!');
                if(response.status===200){
                    console.log(response.data)
                    alert('Login Successfully!!!!');
                    Cookies.set('UserEmail',response.data.Email);
                    Cookies.set('UserName',response.data.Name);
                    Cookies.set('SuperAdmin',response.data.SuperAdmin);
                    handleClose();
                    checked();
                }
            }).catch((error) => alert('Please check enterred data or do siggnup!!'));
        }
    }

  return (
    <div className="container LoginContainer">
        <div className="row loginHeader">Login</div>
        <div className="row">
            <div className="row">
                Email: <input type="email" className="input" placeholder="Enter your email address..."  value={Email} onChange={e=>setEmail(e.target.value)}/>
                Password: <input type="password" className="input" placeholder="Enter your password..." value={Password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <div className="row">
                <DropDown handelQuestionChange={handelQuestionChange}/>
            </div>
            <div className="row">
                Answer: <input type="text" className="input" placeholder="Enter your answer..." value={Answer} onChange={e=>setAnswer(e.target.value)}/>
                <Button variant="contained" className="loginButton" onClick={() => handelSubmit()}>Login</Button>
                <Button variant="contained" className="signupButton" onClick={() => handleLogIn()}>Signup</Button>
            </div>
            
        </div>
    </div>
  )
}

export default Login