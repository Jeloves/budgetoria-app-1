import { getDocs, collection } from "firebase/firestore";
import { collectionLabel } from "./firebase.config";
import { Budget } from "./model";
import { firestore } from "./firebase";

export async function getBudgets(userID: string): Promise<Budget[]> {
	try {
		const budgetsSnapshot = await getDocs(collection(firestore, collectionLabel.users, userID, collectionLabel.budgets));

		const budgets: Budget[] = budgetsSnapshot.docs.map((doc) => {
			const data = doc.data();
			return { ...data, id: doc.id } as Budget;
		});

		return budgets;
	} catch (error) {
		console.error("Failed to read user budgets: ", error);
		throw error;
	}
}
