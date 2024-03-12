import { useEffect, useState } from "react";
import styles from "./unassigned.module.scss";

type UnassignedPropsType = {
  currency: string;
	unassignedBalance: number;
};

const currencySymbols = new Map([
  ['USD', '$'],
  ['EUR', '€'],
  ['GBP', '£'],
  ['JPY', '¥'],
  ['CAD', '$'],
]);

function Unassigned(props: UnassignedPropsType) {
  const {currency, unassignedBalance} = props;

	return (
		<>
			<section className={styles.unassigned}>
				<div>
					<data>{currencySymbols.get(currency)} {unassignedBalance / 1000000}</data>
					<label>Ready to Assign</label>
				</div>
			</section>
		</>
	);
}

export default Unassigned;
