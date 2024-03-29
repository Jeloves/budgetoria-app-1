import { initializeApp } from "firebase/app";
import { Budget, Account, Category, Subcategory, Allocation, Transaction } from "./model.js";
import { firebaseConfig, collectionLabel } from "./firebase.config.js";
import { budgetConverter, accountConverter, categoryConverter, subcategoryConverter, allocationConverter, transactionConverter } from "./converters.js";
import { getFirestore, doc, writeBatch, getDocs, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { NIL as NIL_UUID } from "uuid";
import { signInUser } from "./auth.js";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

// TODO: Update this function: Unassigned category no longer exists in category array
async function createMockBudget(userID, budget) {
	const emptyField = { emptyField: null };
	const batch = writeBatch(database);

	// user-data document
	const userRef = doc(database, "users", userID);
	batch.set(userRef, emptyField);

	// budget document
	const budgetRef = doc(database, "users", userID, "budgets", budget.id).withConverter(budgetConverter);
	batch.set(budgetRef, budget);

	// account document
	const account = new Account(uuidv4(), "Checkings", 2000000000);
	const accountRef = doc(database, "users", userID, "budgets", budget.id, "accounts", account.id).withConverter(accountConverter);
	batch.set(accountRef, account);

	// category doc
	const categories = [new Category(NIL_UUID, "Unassigned", 0), new Category(uuidv4(), "Essential", 1), new Category(uuidv4(), "Nonessential", 2)];
	for (let category of categories) {
		const categoryRef = doc(database, "users", userID, "budgets", budget.id, "categories", category.id).withConverter(categoryConverter);
		batch.set(categoryRef, category);
	}

	// subcategory doc
	const subcategories = [
		new Subcategory(uuidv4(), "Gas", 0, categories[1].id),
		new Subcategory(uuidv4(), "Student Loans", 1, categories[1].id),
		new Subcategory(uuidv4(), "Bloodborne Remaster", 0, categories[2].id),
		new Subcategory(uuidv4(), "Crunchyroll", 1, categories[2].id),
	];
	for (let subcategory of subcategories) {
		const subcategoryRef = doc(database, "users", userID, "budgets", budget.id, "subcategories", subcategory.id).withConverter(subcategoryConverter);
		batch.set(subcategoryRef, subcategory);
	}

	// allocation doc
	const allocations = [
		new Allocation(uuidv4(), 2024, 2, 120 * 1000000, subcategories[0].id),
		new Allocation(uuidv4(), 2024, 2, 150 * 1000000, subcategories[1].id),
		new Allocation(uuidv4(), 2024, 2, 70 * 1000000, subcategories[2].id),
		new Allocation(uuidv4(), 2024, 2, 11.77 * 1000000, subcategories[3].id),
	];
	for (let allocation of allocations) {
		const allocationRef = doc(database, "users", userID, "budgets", budget.id, "allocations", allocation.id).withConverter(allocationConverter);
		batch.set(allocationRef, allocation);
	}

	// transaction doc
	const transactions = [
		new Transaction(uuidv4(), new Date(), "Royal Farms", "Gas prices are so high!", -40 * 1000000, true, account.id, categories[1].id, subcategories[0].id),
		new Transaction(uuidv4(), new Date(), "FAFSA", "Cancel it!!!!", -150 * 1000000, true, account.id, categories[1].id, subcategories[1].id),
		new Transaction(uuidv4(), new Date(), "Crunchyroll", "Frieren <3", -11.77 * 1000000, true, account.id, categories[2].id, subcategories[3].id),
	];
	for (let transaction of transactions) {
		const transactionRef = doc(database, "users", userID, "budgets", budget.id, "transactions", transaction.id).withConverter(transactionConverter);
		batch.set(transactionRef, transaction);
	}

	await batch.commit();
}

// Returns an ARRAY!!!! of Budget objects, but subcollections are left empty.
async function readBudgets(userID) {
	const budgets = [];
	const budgetsSnapshot = await getDocs(collection(database, collectionLabel.users, userID, collectionLabel.budgets).withConverter(budgetConverter));
	try {
		budgetsSnapshot.forEach((doc) => {
			const budget = doc.data();
			budget.id = doc.id;
			budgets.push(budget);
		});
		console.log("Successfully read user/budgets");
		return budgets;
	} catch (error) {
		console.error("Failed to read user/budgets");
	}

	return budgets;
}

// Pass in Budget object to read subcollections.
async function readBudgetSubcollections(userID, budget) {
	const accountsSnapshot = await getDocs(collection(database, collectionLabel.users, userID, collectionLabel.budgets, budgetID, collectionLabel.accounts).withConverter(accountConverter));
	const categoriesSnapshot = await getDocs(collection(database, collectionLabel.users, userID, collectionLabel.budgets, budgetID, collectionLabel.categories).withConverter(categoryConverter));
	const subcategoriesSnapshot = await getDocs(collection(database, collectionLabel.users, userID, collectionLabel.budgets, budgetID, collectionLabel.subcategories).withConverter(subcategoryConverter));
	const allocationsSnapshot = await getDocs(collection(database, collectionLabel.users, userID, collectionLabel.budgets, budgetID, collectionLabel.allocations).withConverter(allocationConverter));
	const transactionsSnapshot = await getDocs(collection(database, collectionLabel.users, userID, collectionLabel.budgets, budgetID, collectionLabel.transactions).withConverter(transactionConverter));
	try {
		accountsSnapshot.forEach((accountDoc) => {
			budget.accounts.push(accountDoc.data());
		});
		categoriesSnapshot.forEach((categoryDoc) => {
			budget.categories.push(categoryDoc.data());
		});
		subcategoriesSnapshot.forEach((subcategoryDoc) => {
			budget.subcategories.push(subcategoryDoc.data());
		});
		allocationsSnapshot.forEach((allocationDoc) => {
			budget.allocations.push(allocationDoc.data());
		});
		transactionsSnapshot.forEach((transactionDoc) => {
			budget.transactions.push(transactionDoc.data());
		});
		console.log("Successfully read user/budgets/subcollections");
		return budget;
	} catch (error) {
		console.error(`Failed to read user/budgets/{subcollections}: ${error}`);
		return error;
	}
}

async function readSelectedBudget(userID) {
	try {
		return readBudgets(userID).then((budgets) => {
			for (let budget of budgets) {
				if (budget.selectedBool) {
					return readBudgetSubcollections(userID, budget).then((selectedBudget) => {
						console.log("Successfully read user data.");
						return selectedBudget;
					});
					break;
				}
			}
		});
	} catch (error) {
		console.error(`Failed to read user data: ${error}`);
		return null;
	}
}


//signInUser("test@gmail.com", "jewxuv-fodmu5-vuCgon").then((user) => { });

//createMockBudget(userID, new Budget(uuidv4(), "Test Budget", new Date(), "en-US", "USD"))
export { database, readBudgetSubcollections, readBudgets };
