import React from "react";
import fetch from "node-fetch";
import LoyalUser from "./loyal-user.component";

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
	
	renderForm = () => {
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="phone">Enter your phone number</label>
				<input id="phone" name="phone" type="text" />
				<button>Checkin</button>
			</form>
		);
	}

	render() {
		const { user } = this.state;
		return (
			<div>
				{ user && <LoyalUser user={user}/> }
				{ !user && this.renderForm() }
			</div>
		);
	}
}
