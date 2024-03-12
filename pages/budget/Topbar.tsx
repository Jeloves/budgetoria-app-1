import { useState } from "react";
import Image from "next/image";
import styles from "./topbar.module.scss";

const monthAcronyms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Topbar() {
	const [month, setMonth] = useState<number>(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());


	return (
		<>
			<section className={styles.top_menu}>
				<button>
					<Image src="/icons/ellipsis.svg" width={25} height={25} alt="Show-sidebar button."></Image>
				</button>
				<div className={styles.dateContainer}>
					<h1>{monthAcronyms[month]} {year}</h1>
					<button>
						<Image src="/icons/dropdown_borderless.svg" width={25} height={25} alt="Show-date-picker button."></Image>
					</button>
				</div>
				<button>
					<Image src="/icons/edit.svg" width={25} height={25} alt="Edit-categories button."></Image>
				</button>
			</section>
		</>
	);
}

export default Topbar;
