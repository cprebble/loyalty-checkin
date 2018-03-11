import React from "react";
import * as PropTypes from "prop-types";

export default class LoyalUser extends React.Component {
	static propTypes = {
		user: PropTypes.shape({
			phone: PropTypes.string,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			email: PropTypes.string,
			checkins: PropTypes.number,
			points: PropTypes.number
		})
	};
	render() {
		const { user } = this.props;
		const { firstName, lastName, phone, email, checkins, points } = user;
		return (
			<div style={{
				margin: 50,
				minWidth: 300
			}}>
				<div>{firstName} {lastName}</div>
				<div>{email}</div>
				<div>{phone}</div>
				<div>{checkins}</div>
				<div>{points}</div>
			</div>
		);
	}
}
