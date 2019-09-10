import React from "react";
import "./assets/styles/index.css";

class InputCard extends React.Component {
	state = {
		correctName: true
	};
	renderUserSelector = (uniqueUserList, selectorState, changeSelectorState) => {
		console.log(uniqueUserList);

		let selectOptions = uniqueUserList.map((uniqueUser, index) => {
			const formattedName =
				uniqueUser["user"].charAt(0).toUpperCase() +
				uniqueUser["user"].substring(1);
			return (
				<option key={index} value={uniqueUser.user}>
					{formattedName}
				</option>
			);
		});

		return (
			<select
				className="input"
				value={selectorState}
				onChange={e => {
					changeSelectorState(e.target.value);
				}}
			>
				<option value="New User">New User</option>
				{selectOptions}
			</select>
		);
	};
	render = () => {
		const {
			changeFormState,
			pushToExpenses,
			selectorState,
			changeSelectorState,
			user,
			description,
			amount,
			uniqueUserList
		} = this.props;

		// display error in username input
		let userInputClassName;
		if (this.state.correctName) {
			userInputClassName = "input";
		} else {
			userInputClassName = "input incorrectName";
		}

		return (
			<div className="moduleCard">
				<h1> New Expense</h1>
				<form
					className="formStyle"
					onSubmit={e => {
						e.preventDefault();

						// form validation : all inputs + user not in DB
						if ((user, description, amount)) {
							for (let i = 0; i < uniqueUserList.length; i++) {
								if (
									user.toLowerCase() === uniqueUserList[i]["user"] &&
									selectorState === "New User"
								) {
									this.setState({ correctName: false });
									return;
								}
							}
							pushToExpenses();
							this.setState({ correctName: true });
							changeFormState("user", "");
							changeFormState("description", "");
							changeFormState("amount", "");
						}
					}}
				>
					{this.renderUserSelector(
						uniqueUserList,
						selectorState,
						changeSelectorState
					)}
					{selectorState === "New User" ? (
						<input
							type="text"
							value={user}
							placeholder="User name"
							className={userInputClassName}
							maxLength="15"
							onChange={e => {
								changeFormState("user", e.target.value);
							}}
						/>
					) : (
						""
					)}
					{this.state.correctName === false ? (
						<p className="inputErrorMessage">This username alredy exists</p>
					) : (
						""
					)}

					<input
						type="text"
						value={description}
						placeholder="Description"
						className="input"
						maxLength="25"
						onChange={e => {
							changeFormState("description", e.target.value);
						}}
					/>
					<input
						type="text"
						value={amount}
						placeholder="Amount"
						className="input"
						onChange={e => {
							if (e.target.value.includes("-")) {
								return;
							}
							var reg = new RegExp("^[0-9]+$");
							if (e.target.value.match(reg) || e.target.value.length === 0) {
								changeFormState("amount", e.target.value);
							}
						}}
					/>
					<input type="submit" value="ADD EXPENSE" className="submitButton" />
				</form>
			</div>
		);
	};
}

export default InputCard;
