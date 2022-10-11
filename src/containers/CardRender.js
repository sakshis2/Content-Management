import React from 'react'
import Card from './Cards'
import './CSS/Cards.css'

function CardRender({data}) {

  return (
    <div className="Cards">
        {data.map((article) => <Card data={article}/>)}
    </div>
  )
}

export default CardRender