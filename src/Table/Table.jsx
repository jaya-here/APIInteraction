import React, { useEffect, useRef, useState } from 'react'
import { useInput } from './useInput'
import { updateData } from './TableSlice'
import { useDispatch } from 'react-redux'
import Pagination from './Pagination'
import Filter from './Filter'
import './Table.css'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearchParams } from "react-router-dom";

function Table() {

  const {isPending, data, error} = useInput()
  const [hasMore,setHasMore] = useState(true)
  const dispatch = useDispatch()
  const ref = useRef()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
  
  if (!isPending && !error)
  {
    if (searchParams.get('page') !== null && searchParams.get('before-date') === null && searchParams.get('after-date') === null)
    dispatch(updateData({key:searchParams.get('page'),data:data.data}))
    setHasMore(data.hasMore)
  }
  

  }, [isPending, data, error])

  useEffect(()=>{
    const table = ref.current;
    if (table) {
      window.scrollTo({
        top:ref.current.offsetTop,
        left:0,
        behavior:'instant'
      })
    }
  }, [data])

 

  return (
    <>
    <h1 ref={ref}>Punk!</h1>
    {isPending && <div>Loading</div>}
    <div>
    
    <div className='row'>
    <div className='col-xs-12 col-sm-6 d-flex justify-content-center'>
    <Filter
    filterField={"after-date"}
    label={"Brewed After"}
    ></Filter>
    </div>

    <div className='col-xs-12 col-sm-6 d-flex justify-content-center'>  
    <Filter
    filterField={"before-date"}
    label={"Brewed Before"}
    ></Filter>
    </div>
    </div>

  <div>
   <table 
    className='table table-primary table-striped align-middle'
>
    <thead className='align-middle'>
      <tr>
        <th scope='col'>{"Name"}</th>
        <th scope='col'>{"Image"}</th>
        <th scope='col'>{"Suitable Pairing"}</th>
        <th scope='col'
        className='table_lastColumn'>{"First Brew"}</th>
      </tr>
    </thead>
    <tbody>
      {data?.data.map((item)=>{
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <img className='img'
               src={item.image_url} alt={"drink"}></img>
            </td>
            <td>
              <div className='d-flex flex-column align-items-center'>
              {item.food_pairing.map((food)=>{
                return (
                 <div 
                className="d-flex 
                align-items-center 
                justify-content-start
                text-start
                mb-1
                food-pairing"
                key={food}>
                  <FontAwesomeIcon icon={faHeart} style={{color: 'red'}} />
                  <p>{food}</p>
                </div>
                )
              })}
               </div>
            </td>
            <td>{item.first_brewed}</td>
          </tr>
        )
      })}
    </tbody>
  </table>   
  </div>

      <Pagination disabled={!hasMore}/>
    </div>
    </>
  )
}

export default Table