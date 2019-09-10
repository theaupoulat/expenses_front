import React from "react";

class ExpensesCard extends React.Component {
	renderLines = expenses => {
		const expensesList = expenses.map((expense, index) => {
			const formattedName =
				expense["user"]["user"].charAt(0).toUpperCase() +
				expense["user"]["user"].substring(1);
			return (
				<div
					key={index}
					className="expenseLine"
					style={index % 2 === 0 ? { backgroundColor: "#ebebeb" } : {}}
				>
					<p> {formattedName}</p>
					<p> {expense["description"]}</p>
					<p className="amountFormat">
						{new Intl.NumberFormat("fr-FR", {
							style: "currency",
							currency: "EUR"
						}).format(expense["amount"])}
					</p>
				</div>
			);
		});

		return expensesList;
	};
	render = () => {
		const { expenses } = this.props;
		let totalExpenses = 0;
		expenses.forEach(element => {
			totalExpenses += Number(element["amount"]);
		});

		return (
			<div className="moduleCard">
				<h1> Expenses</h1>
				<div className="expenseTableHead">
					<p> User </p>
					<p> Description </p>
					<p> Amount</p>
				</div>
				{this.renderLines(expenses)}

				<div className="totalLine">
					<h2> TOTAL </h2>
					<h2 className="amountFormat">
						{new Intl.NumberFormat("fr-FR", {
							style: "currency",
							currency: "EUR"
						}).format(totalExpenses)}
					</h2>
				</div>
			</div>
		);
	};
}

export default ExpensesCard;
