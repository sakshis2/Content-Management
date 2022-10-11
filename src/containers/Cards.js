import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './CSS/Cards.css';
import Cookies from 'js-cookie'
import EditModal from './EditModal'


export default function RecipeReviewCard({data}) {
  const user = Cookies.get('UserEmail');
  console.log(data);
  console.log(user);
  return (
    <Card sx={{ maxWidth: 750 }} className="Card">
      <CardHeader
        title={data.UserName}
        subheader={data.Date}
      />
      {user===data.Email && <EditModal data={data}/>}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <TextareaAutosize
        aria-label="maximum height"
        readOnly
        defaultValue={data.Article}
        className="content"
    />
        </Typography>
      </CardContent>
      </Card>
  );
}
