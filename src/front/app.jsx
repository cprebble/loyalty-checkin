import React from "react";
import Helmet from "react-helmet";
import LoyaltyCheckin from "./loyalty-checkin.component";
import NewLoyaltyUser from "./new-loyalty-user.component";

const App = () => {
	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center"
		}}>
			<Helmet title="Loyalty Exercise"></Helmet>
			<LoyaltyCheckin />
		</div>
	);
};

export default App;
