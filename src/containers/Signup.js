import React,{useState} from 'react'
import DropDown from './DropDown';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import './CSS/Signup.css';
import axios from './axios';
import Cookies from 'js-cookie';

function Signup({handleClose,checked}) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [Email,setEmail] = useState('');
    const [Name,setName] = useState('');
    const [Password,setPassword] = useState('');
    const [Question,setQuestion] = useState('');
    const [Answer,setAnswer] = useState('');
    const [SuperAdmin,setSuperAdmin] = useState(false);
    const [Superkey,setSuperkey] = useState('');

    const handelQuestionChange=(value)=>{
        setQuestion(value);
    }
    const handelCheck = (event) =>{
        setSuperAdmin(event.target.checked);
        setSuperkey('');
    }
    const validate = () =>{
        if(Email && Name && Password && Question && Answer){
            return true;
        }
        return false;
    }
    const handelSubmit = async () =>{
        if(!validate()){
            alert('Please enter the proper value !!!');
            
        }else{
            const body = {
                Email: Email,
                Name: Name,
                Password: Password,
                Question: Question,
                Answer: Answer,
                SuperAdmin: SuperAdmin,
                Superkey: Superkey,
            }
            await axios.post('/login/signup',body).then((res)=>{
                Cookies.set('UserEmail',body.Email);
                Cookies.set('UserName',body.Name);
                Cookies.set('SuperAdmin',body.SuperAdmin);
                handleClose();
                checked();
            })
        }
    }

  return (
    <div className='container'>
        <div className='row loginHeader'>
            <p>Signup</p>
        </div>
        <div className='row'>
            <div className='row'>
                <div className='row'>
                Email: <input type='text' className='input' placeholder='Enter you Email...' value={Email} onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className='row'>
                Name: <input type='text' className='input' placeholder='Enter your Name...' value={Name} onChange={e=>setName(e.target.value)}/></div>
                <div className='row'>
                Password: <input type='password' className='input' placeholder='Enter your password...' value={Password} onChange={e=>setPassword(e.target.value)}/>
                </div>
            </div>
            <div className='row'> 
                <DropDown handelQuestionChange={handelQuestionChange}/>
            </div>
            <div className='row'>
                Answer: <input type='text' className='input' placeholder='Enter your Answer...' value={Answer} onChange={e=>setAnswer(e.target.value)}/>
                IsSuperAdmin: <Checkbox {...label} onChange={handelCheck} value={SuperAdmin} inputProps={{ 'aria-label': 'controlled' }}/>
                {SuperAdmin && <input type="text" className="input" placeholder="Enter your Super Key.." value={Superkey} onChange={e=>setSuperkey(e.target.value)}/>}
                <Button variant="contained" className="submitButton" onClick={()=>handelSubmit()}>Submit</Button>
            </div>


        </div>
    </div>
  )
}

export default Signup