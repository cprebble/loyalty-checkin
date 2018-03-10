import React from "react";
import fetch from "node-fetch";

export default class LoyaltyCheckin extends React.Component {
	constructor () {
		super();
		this.state = {};
	}
	handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(event.target);
			const url = "/users/" + data.get("phone");
			
			const res = await fetch(url);
			const user = await res.json();
			this.setState({ user });

		} catch (err) {
			console.log(err);
		}
	}
	
	renderSubmitForm = () => {
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="phone">Enter your phone number</label>
				<input id="phone" name="phone" type="text" />
				<button>Checkin</button>
			</form>
		);
	}

	renderSuccess = (user) => {
		return (
			<div>
				{JSON.stringify(user)}
			</div>
		);
	}

	render() {
		const { user } = this.state;
		return (
			<div>
				{ user && this.renderSuccess(user) }
				{ !user && this.renderSubmitForm() }
			</div>
		);
	}
}
