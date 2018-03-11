import React from "react";
import Helmet from "react-helmet";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoyaltyCheckin from "./loyalty-checkin.component";
import NewLoyaltyUser from "./new-loyalty-user.component";


const App = () => {
	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			margin: 50,
			minWidth: 500
		}}>
			<Helmet title="Loyalty Exercise"></Helmet>
			<Router>
				<div>
					<ul>
						<li>
						<Link to="/">User Checkin</Link>
						</li>
						<li>
						<Link to="/new-user">New User</Link>
						</li>
					</ul>

					<hr />

					<Route exact path="/" component={LoyaltyCheckin} />
					<Route path="/new-user" component={NewLoyaltyUser} />
				</div>
			</Router>
		</div>
	);
};

export default App;
