import React,{useState,useEffect} from 'react';
import axios from './axios';
import './CSS/ReviewArticle.css';
import {Button} from '@mui/material'
import ContentModal from './ContentModal';
export default function ReviewArticle() {

    const [Articles,setArticles] = useState([]);
    
    useEffect(() =>{
        axios.get('/article/revArticle')
        .then((response) =>{
            setArticles(response.data);
        })
    },[]);
    const handelReview = async (value) => {
        await axios.post('/article/review',{
            Article: value
        }).then((response) =>{
            alert("Article reviewed successfully!!!");
            const temp =[];
            for(let element of Articles){
                if(element.Email===value.Email && element.ArticleId===value.ArticleId)
                element.ArticleStatus=true;
                temp.push(element);
            }
            setArticles(temp);
        }).catch((error) => alert('Failed to review article!!! Try Again'));
    }
    //console.log(Articles);
  return (
    <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {Articles.map((article,index) => <tr>
                <th scope="row">{index+1}</th>
                <td>{article.UserName}</td>
                <td>{!article.ArticleStatus?"Under Review":"Reviewed"}</td>
                <td><Button onClick={()=>handelReview(article)} disabled={article.ArticleStatus}>Review</Button></td>
                <td><ContentModal onlyRead={true} defaultData={article.Article}/></td>
            </tr>)}
        </tbody>
    </table>
  );
}
