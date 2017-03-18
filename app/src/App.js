import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

injectTapEventPlugin();

function giftcard(amount, orgID, giftID){
  this.ID = giftID;
  this.amount = amount;
  this.orgID = orgID;
}

var gc = new giftcard(150, 102, 12);
var isValid = false;
var cardInfoDiv = '';
const hostURL = 'http://localhost:3200';
const getCardURL = hostURL + '/card';
const creditURL = hostURL + '/card/:id/credit'
const uu = 'https://api.github.com/users/mralexgray/repos';

class App extends Component {
constructor(props) {
    super(props);
    this.state = {value: '', addValue: '', card: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleAddValueChange = this.handleAddValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFundsSubmit = this.handleAddFundsSubmit.bind(this);

  }

  componentDidMount(){
    document.getElementById("addFundsForm").style.display="none";
  }

  handleFetchErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  handleChange(event) {
    var input = event.target.value;
    this.setState({value: parseInt(input)});
  }

  handleAddValueChange(event) {
    var input = event.target.value;
    this.setState({addValue: input});
    console.log(this.state.addValue);
  }

  handleAddFundsSubmit(event){
    var input = parseFloat(event.target.value);
    gc.amount += input;

    fetch(creditURL,{
      method: "POST", mode: 'no-cors',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "amount": input
      })
    })
    .then((response) => {return response.json(); }).catch((err)=>{return null})
    .then((jsonObject) => {
      console.log("amount request");
    });
    gc.amount += event.target.value;
    event.preventDefault();
  }

  handleSubmit(event) {
      fetch(getCardURL)
      .then( (response) => {
        return response.json(); }).catch((err) => {return null})
      .then(jsonObject => {
        //check if card is valid and the user inputted ID is equal to the one on the server
        if(jsonObject != null && jsonObject.ID != null && this.state.value === jsonObject.ID){
          isValid = true;
          gc = new giftcard(jsonObject.ID, jsonObject.amount, jsonObject.orgID);
        }
        else 
          isValid = false;
        if(isValid){
        console.log("valid card found");
        cardInfoDiv = <div><h4>Card ID: </h4> {gc.giftID}
         <h4>Funds Remaining: </h4> ${gc.amount}
         <h4>Valid Stores: </h4></div>;

        document.getElementById("addFundsForm").style.display="block";
        this.setState({
            card: {
              "ID": gc.ID,
              "amount": gc.amount,
              "orgID": gc.orgID}
          });
        //event.preventDefault();
        } else {
          cardInfoDiv = <h3>Invalid Card ID</h3>;
          document.getElementById("addFundsForm").style.display="none"; 
          this.setState({card: ''});
        }
      });
      //prevents entire page from refreshing after the form is submitted
      event.preventDefault();
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
        <form onSubmit={this.handleAddFundsSubmit} id = "addFundsForm" >
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