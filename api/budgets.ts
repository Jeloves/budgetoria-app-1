import { signInUser } from "@/firebase/auth";
import { readBudgets } from "@/firebase/firebase";

export async function getBudgets(userID: string) {
    const budgets = await readBudgets(userID)
    console.log(budgets)
}
