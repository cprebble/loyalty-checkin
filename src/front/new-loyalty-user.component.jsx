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
			<form 
				onSubmit={this.handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					margin: 50
				}}>
				<div>
					<label htmlFor="firstName">Enter first name</label>
					<input id="firstName" name="firstName" type="text" />
				</div>
				<div>
					<label htmlFor="lastName">Enter last name</label>
					<input id="lastName" name="lastName" type="text" />
				</div>
				<div>
					<label htmlFor="email">Enter your email</label>
					<input id="email" name="email" type="email" />
				</div>
				<div>
					<label htmlFor="phone">Enter your phone number</label>
					<input id="phone" name="phone" type="text" />
				</div>
		
				<button>Create User</button>
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
