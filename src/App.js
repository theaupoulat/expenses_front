import React from "react";
import "./assets/styles/index.css";
import InputCard from "./InputCard";
import ExpensesCard from "./ExpensesCard";
import UsersCard from "./UsersCard";
import Axios from "axios";

class App extends React.Component {
  state = {
    user: "",
    description: "",
    amount: "",
    expenses: [],
    selector: "New User",
    uniqueUserList: []
  };

  updateData = async () => {
    const response = await Axios.get("http://localhost:3001/expense");
    const users = await Axios.get("http://localhost:3001/users");
    this.setState({ expenses: response.data, uniqueUserList: users.data });
  };

  changeFormState = (stateName, value) => {
    const newState = {};
    newState[stateName] = value;
    this.setState(newState);
  };

  // fix here

  changeSelectorState = newSelectorState => {
    console.log("------- variable passed to changeSelectorState");
    console.log(newSelectorState);
    if (newSelectorState !== "New User") {
      console.log("should change userState");
      this.setState({ selector: newSelectorState, user: newSelectorState });
    } else {
      this.setState({ selector: newSelectorState, user: "" });
    }
  };

  // refresh expenses list with call to API

  pushToExpenses = async () => {
    const newExpense = {
      user: this.state.user.toLowerCase(),
      description: this.state.description,
      amount: Number(this.state.amount)
    };

    await Axios.post("http://localhost:3001/expense", newExpense);
    this.updateData();
  };

  render = () => {
    return (
      <div className="container">
        {this.state.expenses.length > 0 ? (
          <React.Fragment>
            {" "}
            <UsersCard uniqueUserList={this.state.uniqueUserList} />
            <ExpensesCard expenses={this.state.expenses} />{" "}
          </React.Fragment>
        ) : (
          ""
        )}
        <InputCard
          user={this.state.user}
          description={this.state.description}
          amount={this.state.amount}
          changeFormState={this.changeFormState}
          pushToExpenses={this.pushToExpenses}
          selectorState={this.state.selector}
          changeSelectorState={this.changeSelectorState}
          uniqueUserList={this.state.uniqueUserList}
        />
      </div>
    );
  };

  componentDidMount = async () => {
    this.updateData();
  };
}

export default App;
