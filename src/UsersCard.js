import React from "react";
import _ from "lodash";

class UsersCard extends React.Component {
  renderLines = uniqueUserList => {
    const userLines = uniqueUserList.map((user, index) => {
      console.log(user);
      const formattedName =
        user["user"].charAt(0).toUpperCase() + user["user"].substring(1);
      return (
        <div
          className="userLine"
          key={index}
          style={index % 2 === 0 ? { backgroundColor: "#ebebeb" } : {}}
        >
          <p>{formattedName}</p>
          <p>
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR"
            }).format(user.totalExpenses)}
          </p>
        </div>
      );
    });
    return userLines;
  };
  render = () => {
    const { uniqueUserList } = this.props;

    return (
      <div className="moduleCard">
        <h1> Users </h1>
        <div className="expenseTableHead">
          <p> User </p>
          <p> Amount </p>
        </div>
        {this.renderLines(uniqueUserList)}
      </div>
    );
  };
}

export default UsersCard;
