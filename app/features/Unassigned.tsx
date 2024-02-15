import { useEffect, useState } from 'react';
import styles from "./unassigned.module.scss";

function Unassigned() {
  
    return (
      <>
        <section className={styles.unassigned}>
            <div>
                <data>$ 100.000</data>
                <label>Ready to Assign</label>
            </div>
            <button>Assign Money</button>
        </section>
      </>
    )
  }

  export default Unassigned