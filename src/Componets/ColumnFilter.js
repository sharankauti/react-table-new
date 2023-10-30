import React from 'react'
import { TEInput } from 'tw-elements-react'
import styles from '../Componets/Tables.module.css'
const ColumnFilter = ({column}) => {
    const {filterValue,setFilter} = column;
  return (
    <div className={`${styles.customInput} ${styles.customInputColumn} ${'my-2 w-[100%]'}`}>
        <TEInput 
        value={filterValue || '' }
        className=' text-black py-4 px-4'  
        type='text' 
        label='Search By Country'
        onChange={(e)=> setFilter(e.target.value)} 
         />
    </div>
  )
}

export default ColumnFilter