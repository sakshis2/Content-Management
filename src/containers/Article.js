import React,{useState,useEffect} from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Button} from '@mui/material';
import axios from './axios';
import Cookies from 'js-cookie';

function Article({handleClose,onlyRead=false,defaultData}) {
    const [Article,setArticle] = useState('');
    const handelSubmit = async () => {
        var min = 1;
        var max = 100000000;
        var rand =  min + Math.floor(Math.random() * (max-min));
        axios.post('/article/addNew',{
            Article: Article,
            Email: Cookies.get('UserEmail'),
            UserName: Cookies.get('UserName'),
            ArticleStatus: false,
            ArticleId: rand,
            Date: new Date().toDateString()
        }).then(()=>{
            alert("Article Added for Review.");
            handleClose();
        })
        .catch(error => alert("Failed to add the article Please check!!!"));
    }
    useEffect(() => {
        if(onlyRead)
        setArticle(defaultData);
        //console.log(defaultData);
    },[defaultData, onlyRead]);
  return (
    <div className="container">
        <div className="row articleHeader">{!onlyRead?"Write Your Article":"Review the Article"}</div>
        <div className="row articleColumn">
            <TextareaAutosize
                aria-label="maximum height"
                placeholder={onlyRead ? defaultData : "Your thought..."}
                Value={Article}
                onChange={(e)=>setArticle(e.target.value)}
                readOnly={onlyRead}
                style={{ width: 400, height:500 }}
            />
            {!onlyRead && <Button variant="contained" className="submitArticle" style={{float: 'right'}} onClick={()=>handelSubmit()}>Submit</Button>}
        </div>
    </div>
  )
}

export default Article