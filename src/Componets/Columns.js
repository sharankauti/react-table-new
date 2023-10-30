import format from "date-fns/format"
import ColumnFilter from "./ColumnFilter"

export const Columns = [
    {
        Header:'ID',
        accessor:'id',
       
    },
    {
        Header:'First name',
        accessor:'first_name',
      
    },
    {
        Header:'Last name',
        accessor:'last_name',
       
    },
    {
        Header:'Email',
        accessor:'email',
       
    },
    {
        Header:'DOB',
        accessor:'DOB',
       
    },
    {
        Header:'Age',
        accessor:'age',
       
    },
    {
        Header:'Country',
        accessor:'country',
       
    },
    {
        Header:'Phone',
        accessor:'phone',
      
    },
]

export const groupColumns = [
    {
        Header:'ID',
        accessor:'id',
        disableFilters: true
    },
    {
        Header:'Name',
        columns:[
            {
                Header:'First name',
                accessor:'first_name',
                disableFilters: true
            },
            {
                Header:'Last name',
                accessor:'last_name',
              
                disableFilters: true
            },
        ]
    },
    {
        Header:'Info',
        columns:[
            {
                Header:'Email',
                accessor:'email',    
                disableFilters: true
            },
            {
                Header:'DOB',
                accessor:'DOB',
                Cell: ({value})=> { return format(new Date(value),'dd-MM-yyyy')},
               
                disableFilters: true
            },
            {
                Header:'Age',
                accessor:'age',
                
                disableFilters: true
            },
            {
                Header:'Country',
                accessor:'country',
                
       
            },
            {
                Header:'Phone',
                accessor:'phone',
               
                disableFilters: true
            },
        ]
    }
]