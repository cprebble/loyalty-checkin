import React from "react";
import fetch from "node-fetch";
import LoyalUser from "./loyal-user.component";

export default class NewLoyaltyUser extends React.Component {
	constructor () {
		super();
		this.state = {};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(event.target);			
			const res = await fetch("/users", {
				method: "POST",
				body: data,
			});
			const user = await res.json();
			this.setState({ user });

		} catch (err) {
			console.log(err);
		}
	}

	renderForm = () => {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="firstName">Enter first name</label>
					<input id="firstName" name="firstName" type="text" />

					<label htmlFor="lastName">Enter last name</label>
					<input id="lastName" name="lastName" type="text" />
			
					<label htmlFor="email">Enter your email</label>
					<input id="email" name="email" type="email" />
			
					<label htmlFor="phone">Enter your phone number</label>
					<input id="phone" name="phone" type="text" />
			
					<button>Send data!</button>
				</form>
			</div>
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
