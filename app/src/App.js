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
var s = '';

const AppBarExampleIcon = () => (
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);


class Bar extends Component{
    render(){
    return(
      <MuiThemeProvider>
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        </div>
      </MuiThemeProvider>
    )
  }
}

var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <h1>swag</h1>
      </div>
    );
  }
});


class App extends Component {



constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.value);
    if(this.state.value === '12')
      isValid = true;
    else
      isValid = false;
    console.log(isValid);
    if(isValid){
      //alert('A VALID name was submitted: ' + this.state.value);
      s = <div><h3>Card ID: </h3> {gc.giftID}
       <h3>Funds Remaining: </h3> ${gc.amount}
       <h3>Valid Stores: </h3></div>;
      this.forceUpdate();
      event.preventDefault();
    } else {
      //alert('Card ID ' + this.state.value + ' was not found');
      s= <h3>Invalid Card ID</h3>;
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
            <TextField type="text" floatingLabelText="16-Digit ID"   value={this.state.value} onChange={this.handleChange} />
          </label>
          
          <RaisedButton label = "Check"  primary={true} type="Submit" />
          {s}
        </form>
      </div>
      </MuiThemeProvider>
     
    );
  }


 

}

export default App;
