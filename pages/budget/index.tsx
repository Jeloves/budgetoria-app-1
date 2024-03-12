"use client";
import Topbar from "./Topbar";
import Unassigned from "./Unassigned";
import "@styles/global.scss";
import { useEffect, useState } from "react";
import { auth, getUser } from "@/firebase/auth";
import { User } from "firebase/auth/cordova";
import { Budget } from "@/firebase/model";
import { getBudgets } from "@/firebase/budgets";

export default function BudgetPage() {
	const [user, setUser] = useState<User | null>(null);
	const [budget, setBudget] = useState<Budget | null>(null);

	// Sets user
	useEffect(() => {
		auth.onAuthStateChanged((user: User) => {
			setUser(user);
		});
	});

	// Sets budgets
	useEffect(() => {
		const fetchBudgetData = async () => {
			if (user) {
				const data = await getBudgets(user.uid);
				data.forEach((budgetObject: Budget) => {
					if (budgetObject.selectedBool) {
						setBudget(budgetObject);
					}
				});
			}
		};
		fetchBudgetData();
	}, [user]);

	console.log(budget);
	return (
		<>
			<header>
				<Topbar></Topbar>
				{budget !== null && 
				<Unassigned currency={budget.currency} unassignedBalance={budget.unassignedBalance}/>}
			</header>
			<main></main>
		</>
	);
}
