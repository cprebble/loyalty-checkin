import React from "react";
import fetch from "node-fetch";
import FormData from "form-data";
import LoyalUser from "./loyal-user.component";

export default class NewLoyaltyUser extends React.Component {
	constructor () {
		super();
		this.state = {};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const fdata = new FormData(event.target);
			const data = {
				firstName: fdata.get("firstName"),
				lastName: fdata.get("lastName"),
				email: fdata.get("email"),
				phone: fdata.get("phone")
			};		
			const res = await fetch("/users", {
				method: "POST",
				body:    JSON.stringify(data),
    			headers: { "Content-Type": "application/json" }
			});
			const user = await res.json();
			this.setState({ user });

		} catch (err) {
			// eslint-disable-next-line no-console
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
			
					<button>Create User</button>
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
