import React, { useEffect, useState } from 'react'
import "./InputDateFlia.css";

const InputDateFlia = ({nameInput,display, checked, value, idInput, disable, valueGeneral, onChange,generalState, setGeneralState, familiarSeleccionado,action}) => {
  const [mostrarComponente, setMostrarComponente] = useState(true);
  

  useEffect(()=>{
    setMostrarComponente(display)
  },[display])

  const fecha = value !== undefined && value !== null ? value.substring(0, value.length -9) : null;
  return (
    // <div className=" mt-2">
    //   <div className='row d-flex flex-row justify-content-start formularioDate align-items-center'>
    //       <div className="col-xl-3 p-0">


          <div className="formulario__grupo__inputs mt-2">
      <div className="formulario__grupo">
            <label className="check-label" htmlFor="flexCheckDefault">
              {nameInput}
            </label>
        
          <div className="col form-input-DateFlia2">
              <input 
              className='inputDate2' 
              id={idInput} 
              name={idInput}
              onChange={(e)=> onChange(e.target.value, idInput)}
              type="date" 
              value={valueGeneral? valueGeneral : fecha} 
              disabled={disable}
              max="2050-12-31"
              />
          
          <input 
          className={mostrarComponente ? "col-xl-6 form-check-input-date dateFlia" : "none"} type="checkbox" 
          disabled={disable}
          id="flexCheckChecked" 
          checked={checked}
          />
      </div>
      </div>
      </div>
        
    // </div>
  )
}
export default InputDateFlia;