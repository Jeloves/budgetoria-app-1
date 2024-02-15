import { useEffect, useState } from "react";
import "./Topbar.css";
import Image from "next/image";
import styles from "./topbar.module.scss";

function Topbar() {
	return (
		<>
			<section className={styles.top_menu}>
				<button className={styles.showSidebar}>
					<Image src="/icons/ellipsis_bordered.svg" width={25} height={25} alt="Icon for show-sidebar button."></Image>
				</button>
			</section>
		</>
	);
}

export default Topbar;
