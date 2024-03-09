"use client"
import { useParams } from "next/navigation";
import Topbar from "./Topbar";
import Unassigned from "./Unassigned";
import "@styles/global.scss";
import { getBudgets } from "@/api/budgets";
import { signInUser } from "@/firebase/auth";

export default function BudgetPage() {
	signInUser("jelovalera@gmail.com", "cacHyk-wucpe0-bapbas").then((user) => {
		getBudgets(user.uid)
	});
	return (
		<>
			<header>
				<Topbar></Topbar>
				<Unassigned></Unassigned>
			</header>
			<main> 

			</main>
		</>
	);
}