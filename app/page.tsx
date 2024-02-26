import Topbar from "./features/Topbar";
import Unassigned from "./features/Unassigned";
import "@styles/global.scss";

export default function Home() {

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


