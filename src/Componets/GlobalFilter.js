import React from 'react'
import { TEInput } from 'tw-elements-react'
import styles from '../Componets/Tables.module.css'
const GlobalFilter = ({filter,setFilter}) => {
  return (
    <div className={`${styles.customInput} ${'my-4 w-[50%]'}`}>
        <TEInput 
        value={filter || '' }
        className=' text-black py-4 px-4'  
        type='text' 
        label='Search By Globally'
        onChange={(e)=> setFilter(e.target.value)} 
         />
    </div>
  )
}

export default GlobalFilter