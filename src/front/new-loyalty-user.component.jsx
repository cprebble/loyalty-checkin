import React from "react";
import fetch from "node-fetch";

export default class NewLoyaltyUser extends React.Component {
	handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		
		fetch("/users", {
			method: "POST",
			body: data,
		});
	}
	
	render() {
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
}