import React from "react";
import Helmet from "react-helmet";
import { MemoryRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import LoyaltyCheckin from "./loyalty-checkin.component";
import NewLoyaltyUser from "./new-loyalty-user.component";
import LoyalUser from "./loyal-user.component";

const Menu = withRouter(({ history }) => {
	return (
		<ul>
			<li>
				<a onClick={()=>history.push("/checkin")} >User Checkin</a>
			</li>
			<li>
				<a onClick={()=>history.push("/new-user")} >New User</a>
			</li>
		</ul>
	);
});

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
			<Router
				initialEntries={[ "/checkin", "/new-user", "/loyal-user" ]}
				initialIndex={0}>
				<div>
					<Menu/>
					<hr />
					<Switch>
						<Route path="/loyal-user" component={LoyalUser} />
						<Route path="/new-user" component={NewLoyaltyUser} />
						<Route path="/checkin" component={LoyaltyCheckin} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
