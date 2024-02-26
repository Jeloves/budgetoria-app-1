"use client"
import { useParams } from "next/navigation";
import Topbar from "./Topbar";
import Unassigned from "./Unassigned";
import "@styles/global.scss";

export default function BudgetPage() {
	const params = useParams()
	console.log(params)
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