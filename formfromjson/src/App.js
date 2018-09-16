import React, { Component } from 'react';
import './App.css';
//import data from './data.json'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      labelData : [],
      dropdown : '',
      select : '',
      email : '',
      telephone : ''
    };
  }


  //API call for form fields
  componentDidMount() {
    //remove mode field then try the CORS url that he/she provided
   fetch('https://cors-anywhere.herokuapp.com/ansible-template-engine.herokuapp.com/form', {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then(response => response.json()).then(json => {
        this.setState({
          labelData: json
        })
   }).catch(function (error) { // it handles the error response if API throws any
      console.log('Request failed', error)
    });
  }

  //change detection in form field
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };
  
  dropDown(){
     return this.state.labelData.map(item=>{
      if(item.type=== "select"){
        console.log("inside",item);
        return <span>{item.label} <select name="dropdown"  isoptional={item.isOptional} ishidden={item.isHidden} 
        onChange={this.handleInputChange}>
        {item.value.map(i=>{
          return <option value={i} selected={item.default} >{i}</option>
        })}
         </select></span>
      }
    })
  }
 
selectBox(){
  return this.state.labelData.map(item=>{
    if(item.type=== "radio"){
      console.log("inside",item);
      return <span>{item.label}
      {item.value.map(i=>{
         console.log("inside",i);
        return <span><input type={item.type} name="select" value={i} 
        isoptional={item.isOptional} ishidden={item.isHidden} onChange={this.handleInputChange}/>
        {i}</span>
      })    
    }  </span>
  }
  })
}

emailBox(){
  return this.state.labelData.map(item=>{
    if(item.type=== "email"){
      console.log("inside",item);
      return <span>{item.label}
            <input type={item.type} name="email" value={item.value} 
            isoptional={item.isOptional} ishidden={item.isHidden} onChange={this.handleInputChange}/>
        </span>
  }
  })
}
default(){
  return this.state.labelData.map(item=>{
      console.log("inside",item);
      return <span>{item.label}
            <input type={item.type} name="default" value={item.value} 
            isoptional={item.isOptional} ishidden={item.isHidden} onChange={this.handleInputChange}/><br/>
        </span>
  })
}

telephoneType(){
  return this.state.labelData.map(item=>{
    if(item.type=== "telephone"){
      console.log("inside",item);
      return <span>{item.label}
            <input type={item.type} name="telephone" value={item.value} onChange={this.handleInputChange}/>
        </span>
  }
  })
}

hiddenType(){
  return this.state.labelData.map(item=>{
    if(item.type=== "hidden"){
      console.log("inside hidden",item);
      return <span>{item.label}
            <input type={item.type} name="hidden" value={item.value} ishidden={item.isHidden} onChange={this.handleInputChange}/>
        </span>
  }
  })
}
  handleSubmit = event => {
    console.log("A emailAddress was submitted: " + this.state.email);
    console.log("A Gender was submitted: " + this.state.select);
    console.log("A State was submitted: " + this.state.dropdown);
    console.log("A Contact Number was submitted: " + this.state.telephone);
    event.preventDefault();
};

showDataInUI(){
 return <div>
  <span>Entered Mail Id : {this.state.email}</span><br/>
  <span>Gender :  {this.state.select}</span><br/>
  <span>State : {this.state.dropdown}</span><br/>
  <span>Contact Number: {this.state.telephone}</span>
  </div>
}

  render() {
    return (
      <React.Fragment>
        <div>
           <form className="" onSubmit={this.handleSubmit}>
           {/*} {this.state.labelData.map(item => {
              return  <div className="">
                <span className="col25"><label className="bFont">{item.label}</label></span>
                  <span className="col75"><input type={item.type} value={item.value}
                   onChange={this.handleInputChange}  selected= {item.default} />
                </span>
                         
              </div>
                   })}*/}
                   {this.emailBox()}<br/>
                   {this.selectBox()}<br/>
                   {this.dropDown()}<br/>
                   {this.telephoneType()}<br/>
                   {this.hiddenType()}<br/>
              <button>Submit</button>
            </form> 
            {this.showDataInUI()}
          </div>
     
      </React.Fragment>
    );
  }
}

export default App;