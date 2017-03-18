import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
//import './AppBar.js'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';


injectTapEventPlugin();

function giftcard(amount, orgID, giftID){
  this.amount = amount;
  this.orgID = orgID;
  this.giftID = giftID;
}

var gc = new giftcard(150, 102, 12);
var isValid = false;
var cardInfoDiv = '';
const url = 'https://localhost:3000/card/';


class App extends Component {
constructor(props) {
    super(props);
    this.state = {value: '', addValue: '', card: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleAddValueChange = this.handleAddValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFunds = this.handleAddFunds.bind(this);

  }

  componentDidMount(){
    document.getElementById("addFundsForm").style.display="none";
  }

  

  handleChange(event) {
    var input = event.target.value
    //input = chunk(input,4).join(' ');
    this.setState({value: input});
  }

  handleAddValueChange(event) {
    var input = event.target.value;
    this.setState({addValue: input});
    console.log(this.state.addValue);
  }

  handleAddFunds(event){
    gc.amount += event.target.value;
  }

  handleSubmit(event) {
    console.log(this.state.value);
    if(this.state.value.trim() === '12')
      isValid = true;
    else
      isValid = false;
    console.log(isValid);
    if(isValid){
      fetch(url)
      .then(function(result){
        console.log("fetched");
        this.setState({
        card: {
          id: result.ID,
          amount: result.amount
        }
      });
      console.log("FOUND");
    })

    // {this.state.card ? (<div><h4>Card ID: </h4> {gc.giftID}
    //        <h4>Funds Remaining: </h4> ${gc.amount}
    //        <h4>Valid Stores: </h4></div>;) : null}
     
      //alert('A VALID name was submitted: ' + this.state.value);
      cardInfoDiv = <div><h4>Card ID: </h4> {gc.giftID}
       <h4>Funds Remaining: </h4> ${gc.amount}
       <h4>Valid Stores: </h4></div>;

      document.getElementById("addFundsForm").style.display="block";
      this.forceUpdate();
      event.preventDefault();
    } else {
      //alert('Card ID ' + this.state.value + ' was not found');
      cardInfoDiv = <h3>Invalid Card ID</h3>;
      document.getElementById("addFundsForm").style.display="none"; 
       this.forceUpdate();
      event.preventDefault();
    }
    
  }

  render() {
    return (
    

       <MuiThemeProvider >
       <div>
      <AppBar title = "Gift Card" iconClassNameRight="muidocs-icon-navigation-expand-more" >
      </AppBar>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h2>Check Gift Card Funds</h2>
            Gift Card ID:
            <TextField type="text" floatingLabelText="16-Digit ID" value={this.state.value} onChange={this.handleChange} />
          </label>
          
          <RaisedButton label = "Check"  primary={true} type="Submit" />
          {cardInfoDiv}
          
          
        </form>

        <form onSubmit={this.handleAddFunds} id = "addFundsForm" >
          <label>
            <h2>Add Funds</h2>
            <TextField type="text" floatingLabelText="Amount to Add" value={this.state.addValue} onChange={this.handleAddValueChange} id="addFundsBox" />
          </label>
          <RaisedButton label = "Add"  primary={true} type="Submit" />
        </form>

      </div>
      </MuiThemeProvider>
     
    );
  } 
}

export default App;
