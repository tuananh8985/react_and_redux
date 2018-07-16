import React, { Component } from 'react';


class Reset extends Component {
	// 1.Tương tác ngược lại với Component App.
	onResetDefault = () =>{
		this.props.onSettingDefault(true);
	}
  	render() {
	    return (
	        <button type="button" className="btn btn-primary" onClick = {this.onResetDefault}>reset</button>
	    );
  	}
}

export default Reset;
