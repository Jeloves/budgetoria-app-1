import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./topbar.module.scss";

function Topbar() {
	return (
		<>
			<section className={styles.top_menu}>
				<button>
					<Image src="/icons/ellipsis.svg" width={25} height={25} alt="Icon for show-sidebar button."></Image>
				</button>
				<div className={styles.dateContainer}>
					<h1>Dec 2023</h1>
					<button>
						<Image src="/icons/dropdown_borderless.svg" width={25} height={25} alt="Icon for show-date-picker button."></Image>
					</button>
				</div>
				<button>
					<Image src="/icons/edit.svg" width={25} height={25} alt="Icon for edit-categories button."></Image>
				</button>
			</section>
		</>
	);
}

export default Topbar;
