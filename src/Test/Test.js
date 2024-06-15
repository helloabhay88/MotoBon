import React from 'react'
import { useState } from 'react';
const product=[
  {id:1, name:"Laptop",Brand:"Dell",Qty:1 },
  {id:2, name:"Laptop",Brand:"HP",Qty:1 },
  {id:3, name:"Laptop",Brand:"Compac",Qty:1 },
  {id:4, name:"Laptop",Brand:"Apple",Qty:1 }

];
  
  function Test() {
    const [items,setItem]=useState(product)

  const click=(id)=>{
    const newI=items.map((item)=>
     item.id===id?{...item,Qty:item.Qty+1}:item
    )
    setItem(newI)
  }
  return (
    <div>
      {items.map((products)=>(
        <div className="bg-success text-white m-2" key={products.id}>
         <h1>{products.name}</h1>
         <h3>Brand: {products.Brand}</h3>
         <h4>Qty: {products.Qty}</h4>
         <button onClick={()=>click(products.id)} type="button">+</button>
         </div>
    
      ))}
    </div>
  )
}

export default Test