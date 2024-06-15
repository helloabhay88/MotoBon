import React from 'react'
import {data} from './ProductsData'
import { Card,Button } from 'react-bootstrap'
import { useState } from 'react'
function Products() {
    const [items,setItems]=useState(data)
  return (
    <div>
        <h1 className="bg-info text-white">Rent Bikes</h1>
        
        {items.map((item)=>(
            <div className="d-inline-flex">
             <Card className="shadow p-3 m-2 bg-body-tertiary rounded" style={{ width: '15rem' }}>
             <Card.Img variant="top" src={require(`./photos/${item.image}.png`)} />
             <Card.Body>
               <Card.Title>{item.model}</Card.Title>
               <Card.Text>
                 Some quick example text to build on the card title and make up the
                 bulk of the card's content.
               </Card.Text>
               <h5>Price: {item.price}</h5>
               <Button variant="primary">Rent now!</Button>
             </Card.Body>
           </Card>
           </div>
        ))}
        
    </div>
  )
}

export default Products