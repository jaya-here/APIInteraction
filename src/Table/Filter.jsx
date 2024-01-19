import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid transparent;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  display: flex;
  gap: 0.6rem;
`;

const Error = styled.div`
    color:red;
    font-size:small;
`

const Label = styled.div`
    font-weight:500;
`

function Filter({ filterField, label }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [date,setDate] = useState('')
  const [error, setError] = useState(false)

  function handleClick(value) {
    if (filterField === 'after-date' && searchParams.get('before-date') !== null)
    {
        
        if(new Date(searchParams.get('before-date')) < new Date(value))
        {
            setError(true)
            return
        } 
    }

    if (filterField === 'before-date' && searchParams.get('after-date') !== null)
    {
        
        if(new Date(searchParams.get('after-date')) > new Date(value))
        {
            setError(true)
            return
        } 
    }



    if (error)
    {
        setError(false)
    }
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
    setDate(value)
  }

  return (
    <div>
    <div 
    className="d-flex align-items-center">
    <Label>{label}</Label>
    <StyledFilter>
    <input type="date"
    value={date}
    onChange={(e)=>{handleClick(e.target.value)}}></input>
    </StyledFilter>
    </div>
    {error && 
    <Error>Before date cannot be smaller than after date.</Error>}
    </div>
  );
}

export default Filter;
