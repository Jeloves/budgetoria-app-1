import { Budget, Account, Category, Subcategory, Allocation, Transaction } from "./model.js";

const budgetConverter = {
	toFirestore: (budget) => {
		return {
			name: budget.name,
			dateCreated: budget.dateCreated,
			locale: budget.locale,
			currency: budget.currency,
			selectedBool: budget.selectedBool,
			unassignedBalance: budget.unassignedBalance,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Budget(snapshot.id, data.name, data.dateCreated, data.locale, data.currency, data.selectedBool, data.unassignedBalance);
	},
};

const accountConverter = {
	toFirestore: (account) => {
		return {
			name: account.name,
			balance: account.balance,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Account(snapshot.id, data.name, data.balance);
	},
};

const categoryConverter = {
	toFirestore: (category) => {
		return {
			name: category.name,
			position: category.position,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Category(snapshot.id, data.name, data.position);
	},
};

const subcategoryConverter = {
	toFirestore: (subcategory) => {
		return {
			name: subcategory.name,
			position: subcategory.position,
			categoryID: subcategory.categoryID,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Subcategory(snapshot.id, data.name, data.position);
	},
};

const allocationConverter = {
	toFirestore: (allocation) => {
		return {
			year: allocation.year,
			month: allocation.month,
			balance: allocation.balance,
			subcategoryID: allocation.subcategoryID,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Allocation(snapshot.id, data.year, data.month, data.balance, data.subcategoryID);
	},
};

const transactionConverter = {
	toFirestore: (transaction) => {
		return {
			date: transaction.date,
			payee: transaction.payee,
			memo: transaction.memo,
			balance: transaction.balance,
			approval: transaction.approval,
			accountID: transaction.accountID,
			categoryID: transaction.categoryID,
			subcategoryID: transaction.subcategoryID,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Transaction(snapshot.id, data.date, data.payee, data.memo, data.balance, data.approval, data.accountID, data.categoryID, data.subcategoryID);
	},
};

export { budgetConverter, accountConverter, categoryConverter, subcategoryConverter, allocationConverter, transactionConverter };
