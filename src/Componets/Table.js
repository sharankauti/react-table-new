import React,{useMemo} from 'react'
import { useTable,useSortBy,useGlobalFilter,useFilters,usePagination,useRowSelect,useColumnOrder} from 'react-table'
import MockData from '../Componets/MOCK_DATA.json'
import { Columns,groupColumns } from './Columns'
import {AiOutlineArrowUp} from 'react-icons/ai'
import {AiOutlineArrowDown} from 'react-icons/ai'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'
import { TERipple } from 'tw-elements-react'
import { Checkbox } from './Checkbox'
import styles from '../Componets/Tables.module.css'

const Table = () => {


    const columns = useMemo(()=> groupColumns,[])
    const data = useMemo(()=> MockData,[])

    const defaultColumn = useMemo(()=>{
        return {
            Filter : ColumnFilter
        }
    },[])

  

    const tableInstance = useTable({
        columns:columns,
        data:data,
        defaultColumn
    },useFilters,useGlobalFilter,useSortBy,usePagination,useRowSelect,useColumnOrder,
     (hooks)=>{
        hooks.visibleColumns.push((columns)=>{
            return [
                {
                    id:'Selection',
                    Header:({getToggleAllRowsSelectedProps})=>{
                        return <Checkbox {...getToggleAllRowsSelectedProps()} />
                    },
                    Cell:({row})=>{
                        return <Checkbox {...row.getToggleRowSelectedProps()} />
                    }
                },
                ...columns
            ]
        })
     }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        state,
        setGlobalFilter,
        setFilter,
        prepareRow,
        selectedFlatRows,
        setColumnOrder
    }   
      = tableInstance;

    const {globalFilter,filters,pageIndex,pageSize} = state;

    const changeColumnOrder = ()=>{
        setColumnOrder([
            'id',
            'first_name',
            'last_name',
            'age',
            'country',
            'phone',
            'email',
            'DOB',
        ])
    }

  return (
    <div className=' container mx-auto my-[75px] tableWrapper overflow-x-auto'>
        <div className='flex justify-between items-center'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      
       
       <select className='px-4 py-4' value={pageSize} onChange={(e)=> setPageSize(Number(e.target.value))}>
        {[4,5,6].map((pageSize=>
            <>
             
             <option key={pageSize} value={pageSize}>{pageSize}</option>
             </>
        ))}
       </select>
        </div>
        <div className='my-4'>
        <TERipple>
          <button
            onClick={changeColumnOrder}
            type="button"
            className="inline-block rounded border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          >
            Change Column Order
          </button>
        </TERipple>
        </div>
      
      <div className={styles.stickyTable}>
        <table className=' w-full table-auto text-center border-2  border-collaps' {...getTableProps()} >
            <thead>
                {headerGroups.map( (values)=>(
                    <tr {...values.getHeaderGroupProps()}>
                        {values.headers.map( (column)=>(
                            <th className=' border px-4 py-4 bg-[#d1c0ff]' {...column.getHeaderProps(column.getSortByToggleProps())}>
                                <div className='flex items-center justify-between'>   
                                {column.render('Header')}
                               
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? <AiOutlineArrowDown style={{color:'#FFFFFF',fontWeight:'bolder',fontSize:'1.2rem'}}/> : <AiOutlineArrowUp style={{color:'#FFFFFF',fontWeight:'bold',fontSize:'1.2rem'}}/> ) : ''}
                                </span>
                                </div>
                                {column.canFilter ? column.render('Filter') : null}
                            </th>
                        ) )}
                    </tr>
                ))}
               
            </thead>
            <tbody {...getTableBodyProps()} >
                {page.map((row)=>{
                    prepareRow(row)
                    return (
                    <tr className='cursor-pointer odd:bg-white even:bg-[#f4f0ff]  odd:hover:bg-[#414a4c] odd:hover:text-[#FFFFFF] even:hover:bg-[#414a4c] even:hover:text-[#FFFFFF]' 
                        {...row.getRowProps()}
                    >
                        {row.cells.map((cell)=>(
                            <td className='px-4 py-4' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                        
                    </tr>
                    )
                })}
               
            </tbody>
        </table>
        </div>
        <div className='my-6 flex justify-center items-center'>
                <h3 className='uppercase italic text-2xl font-bold font-mono'>PAGE {' '} {pageIndex + 1} of {pageOptions.length}</h3>
                <TERipple rippleColor='light'>
                    <button
                        onClick={()=> previousPage()}
                        disabled={!canPreviousPage}
                        type="button"
                        className=" mx-8 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                        Previous
                    </button>
                </TERipple>
                <TERipple rippleColor='dark'>
                    <button
                        onClick={()=> nextPage()}
                        disabled={!canNextPage}
                        type="button"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                        Next
                    </button>
                </TERipple>
        </div>
        <div className='my-4 text-start'>
            
            {selectedFlatRows && <h3>Selected Rows...</h3>}
            { selectedFlatRows && 
                JSON.stringify(
                    {
                        selectedFlatRows: selectedFlatRows.map((row)=> row.original)
                    },
                    null,
                    2
                )
            }
        </div>
    </div>
  )
}

export default Table