import React, { useEffect, useState } from 'react'
import "./InputDateFlia.css";

const InputDateFliaBaja = ({nameInput,display, checked, value, idInput, disable,valueGeneral, onChange,generalState, setGeneralState, familiarSeleccionado, action}) => {
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const [valor , setValor] = useState("");
  const fecha = value !== undefined && value !== null ? value.substring(0, value.length -9) : null;
  

  useEffect(()=>{
    setMostrarComponente(display)
  },[display])

  function updateFecha(){
    setValor(fecha);
    return;
  }
  useEffect(()=>{
    updateFecha();
  },[familiarSeleccionado.iDfamiliares])


  return (
    <div className="mt-3">
      <div className='row d-flex flex-row justify-content-start formularioDate align-items-center'>
          <div className="col-xl-2 col-lg-2 col-md-2 p-0">
            <label className="labelBajaFlia" htmlFor="flexCheckDefault">
              {nameInput}
            </label>
          </div>
          <div className="col-xl-1 col-lg-2 col-md-2 form-input-DateFlia">              
              <input 
              className='inputDateBaja' 
              id={idInput} 
              name={idInput}
              onChange={(e)=> onChange(e.target.value, idInput)}
              type="date" 
              value={valueGeneral && valueGeneral  ?  valueGeneral : valor} 
              disabled={disable}
              />
          </div>
          <input 
          className={mostrarComponente ? "col-xl-3 col-lg-3 col-md-3 form-check-input-date datebajaFliaCheck" : "none"} type="checkbox" 
          disabled={disable}
          id="flexCheckChecked" 
          checked={checked}
          />
      </div>
        
    </div>
  )
}
export default InputDateFliaBaja;