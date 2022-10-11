import React,{useEffect, useState} from 'react'
import {Button} from '@mui/material/'
import './CSS/Dashboard.css';
import TextField from '@mui/material/TextField';
import Modal from './Modal'
import Cookies from 'js-cookie';
import ContentModal from './ContentModal';
import ReviewArticleModal from './ReviewArticleModal';
import CardRender from './CardRender';
import axios from './axios';

function DashBoard() {
    const [login, setLogin] = useState(false);
    const [Article,setArticle] = useState([]);
    const [search,setSearch] = useState('');
    const [isSuperAdmin,setisSuperAdmin] = useState(false);
    const checkLogin = () =>{
        setLogin(true);
        const isSuperAdmin1 = Cookies.get('SuperAdmin');
        if(isSuperAdmin1==="true")
            setisSuperAdmin(true);
    }
    const handelLogout = () =>{
        setLogin(false);
        setisSuperAdmin(false);
        Cookies.remove('UserName');
        Cookies.remove('UserEmail');
        Cookies.remove('SuperAdmin');
    }
    useEffect(() => {
        if(Cookies.get('UserName'))
        {
            setLogin(true);
            const isSuperAdmin1 = Cookies.get('SuperAdmin');
            if(isSuperAdmin1==="true")
            setisSuperAdmin(true);
        }
    },[])
    useEffect(() => {
        axios.get('/article/all')
        .then((response) =>{
            setArticle(response.data);
        })
    },[])
    const data = Article.filter((key)=>{
        return key.UserName.toLowerCase().includes(search.toLowerCase());
    })
  return (
    <div className="dashboard">
        <div className="dashHeader">
            <p>Welcome {Cookies.get('UserName')} to Technical Content</p>
        </div>
        <div className="navBar">
            <div className="buttomModal">       
                {!login && <Modal checkLogin={checkLogin}/>}
                {login && <Button variant="contained" className="logout" onClick={() => handelLogout()}>Logout</Button>}
                {login && <ContentModal onlyRead={false}/>}
                {isSuperAdmin && <ReviewArticleModal />}
            </div>
        </div>
        <div className="row contentRow">
            <TextField id="standard-basic" label="Search Author" variant="standard" className="standard" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <CardRender data={data}/>
        </div>
    </div>
  )
}

export default DashBoard