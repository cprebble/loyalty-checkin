import React from "react";
import { Redirect } from "react-router-dom";
import fetch from "node-fetch";
import NewLoyaltyUser from "./new-loyalty-user.component";

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
			// eslint-disable-next-line no-console
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

	emptyUser = (user) => {
		return (Object.keys(user).length === 0);
	}

	renderUser = (user) => {
		return <Redirect to={{
			pathname: "/loyal-user",
			state: { user }
		}}/>;
	}

	render() {
		const { user } = this.state;
		
		return (
			<div>
				{ user && this.emptyUser(user) && <NewLoyaltyUser/> }
				{ user && this.renderUser(user) }
				{ !user && this.renderForm() }
			</div>
		);
	}
}
