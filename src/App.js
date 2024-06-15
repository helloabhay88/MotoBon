import { useState } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
function App() {
  const [count,setCount]=useState(0)
  const addCount=()=>{
    setCount(count+1)
    
  }
  return (
    <div>
      
     <Button onClick={addCount} variant="info">Click me</Button>{' '}
    </div>
  );
}


export default App;
