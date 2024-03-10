"use client";
import { useParams } from "next/navigation";
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
	const [budgets, setBudgets] = useState<Budget[]>([]);

	// Sets user
	useEffect(() => {
		auth.onAuthStateChanged((user: User) => {
			setUser(user);
		});
	});

	// Sets budgets
	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				const data = await getBudgets(user.uid);
				setBudgets(data);
			}
		};
		fetchData();
	}, [user]);

	console.log("USER:\n",user)
	console.log("BUDGETS:\n",budgets)

	return (
		<>
			<header>
				<Topbar></Topbar>
				<Unassigned></Unassigned>
			</header>
			<main></main>
		</>
	);
}
