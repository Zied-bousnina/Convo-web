import { FetchAllDrivers } from 'Redux/actions/Driver.actions'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

// import React from 'react'

function SelectDriver() {
  const driverList = useSelector(state=>state?.drivers?.driver_list?.driver)
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchAllDrivers())

  }, [ driverList])
  const colourOptions = []

  const handleSelectChange = (selectedOptions) => {


    setSelectedValues(selectedOptions);
  };
  driverList?.map(e=>{
    colourOptions.push({value:e._id, label:`${e.name}|[${e.email}]`})

  })
  // console.log(colourOptions)
  return (
    <Select required
    className="react-select primary"
    onChange={handleSelectChange}
       isLoading={colourOptions.length==0 ?  true: false}
       isDisabled={selectedValues.length >3 ?true: false}

     options={colourOptions} />
  )
}

export default SelectDriver