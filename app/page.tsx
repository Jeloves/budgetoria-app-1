"use client";
import Topbar from "./features/Topbar";
import Unassigned from "./features/Unassigned";
import "@styles/global.scss";
import {signInUser, getUser} from "../firebase/auth"
import {readBudgets, readBudgetSubcollections} from "../firebase/firebase"
import { useState } from "react";

<<<<<<< Updated upstream
=======

async function testFunction(email: String, password: String) {
	const userID = await signInUser(email, password).then(
		(user) => {
			console.log(`User signed in: ${user.uid}`);
			return user.uid;
		},
		(error) => {
			console.error(`Failed to sign in: ${error}`);
			return null;
		}
	)

	const budgets = await readBudgets(userID);
	let selectedBudget = null;
	for (let budget of budgets) {
		if (budget.selectedBool) {
			selectedBudget = await readBudgetSubcollections(userID, budget);
		}
	}

	return {
		budgets: budgets,
		selectedBudget: selectedBudget
	}

}

>>>>>>> Stashed changes
export default function Home() {
	
	const dataObject = testFunction("jelovalera@gmail.com", "cacHyk-wucpe0-bapbas").then(
		(data) => {
			return data;
		},
		() => {
			console.error('Error here ')
			return null;
		}
	)


	return (
		<>
			<header>
				<Topbar></Topbar>
				<Unassigned unassignedBalance={}></Unassigned>
			</header>
			<main> 

			</main>
		</>
	);
}
