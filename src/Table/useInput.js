import {getInput} from '../services/apiInput'
import { useQuery} from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


export function useInput() {
    const [searchParams] = useSearchParams()

    //FILTER
    const beforeDate = searchParams.get("before-date")
    const afterDate = searchParams.get("after-date")
   

    //PAGINATION
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

    const data_ = useSelector((state)=>{
        if (beforeDate !== null || afterDate !== null || page === null)
        {
            return null
        }
        
        let page_str = String(page)
        return state.table.data[page_str]
    })

    

    const {isPending, error, data} = useQuery({
        queryKey:['input', beforeDate, afterDate, page],
        queryFn:()=>
        {
            if (data_)
            {
           
            return {data:data_,hasMore:true}
            }
            return getInput({beforeDate, afterDate, page})
        }
    })


    return {isPending, error, data}
}
