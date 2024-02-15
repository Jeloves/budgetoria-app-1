import { useEffect, useState } from 'react'
import './Unassigned.css'

function Unassigned() {
    const [count, setCount] = useState(0)
  
    return (
      <>
        <section className='unassigned' style={{ display: 'flex' }}>
            <div style={{ display: 'flex' }}>
                <data>$ 100.000</data>
                <label>Ready to Assign</label>
            </div>
            <button>Assign Money</button>
        </section>
  
      </>
    )
  }

  export default Unassigned