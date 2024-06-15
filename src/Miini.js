import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

class Miini extends Component {
    state={
        Name: ""
    };
    onHandleChange=(event)=>{
        this.setState({
            Name: event.target.value
        });  
    };
    onSubmit=()=>{
        console.log(this.state.Name);
    }
  render() {
    return (
      <form>
        <h1>Events</h1>
        <h4>Form Submission</h4>
        <input type="text" value={this.state.Name} onChange={this.onHandleChange}/><br/><br/>
        <button type="button" onClick={this.onSubmit}>Submit</button>
      </form>
    )
  }
}
export default Miini;