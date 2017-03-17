import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class AppBar extends Component{
	render(){
		return(
			<MuiThemeProvider>
				<AppBar title="navbar">
				</AppBar>
			</MuiThemeProvider>
		)
	}
}