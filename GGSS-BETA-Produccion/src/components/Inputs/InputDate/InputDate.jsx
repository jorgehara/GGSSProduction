import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import "./InputDate.css";

const InputDate = ({ nameInput,display, value, disabled,idInput, onChange, action, setDisable, disable, idInputCheck, valueCheck, clasess }) => {
  
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const [mostrarComponente2, setMostrarComponente2] = useState(true);
  const [checked, setChecked] = useState(false);

  const [valor, setValor] = useState("");


  const fecha = value && value  ? value.substring(0, value.length -9) : null;
  const dispatch = useDispatch();


  useEffect(()=>{
    setValor(fecha);
  },[fecha])

  useEffect(()=>{
    if(display){
      if(mostrarComponente2 !== mostrarComponente){
        setMostrarComponente2(display)
        return;
      }
      setMostrarComponente(!display)
      setMostrarComponente2(display)
      return;
    }
    setMostrarComponente(display)
    setMostrarComponente2(display)
  },[display])

  function getValue(disable){
    if(disable){
      return dispatch(
        {
          type: action,
          payload : {name : idInput, value : ""}
        })
    }
  }
  useEffect(()=>{
    getValue(disable);
  },[disable])
  

  return (
    clasess ? 
    <div className={clasess.classOne}>
        <div className={clasess.classTwo}>
          <label className={clasess.classThree} htmlFor="flexCheckDefault">
            {nameInput}

          </label>
          <input className={mostrarComponente ? "select-date-DatosPerson" : "none"} type="checkbox"  id="flexCheckChecked"  checked={checked} disabled={disabled} />
          <div className="d-flex flex-row justify-content-start align-items-center">
            <input className={mostrarComponente2 ? "form-check-input " : "none"}type="checkbox" id={idInputCheck} name={idInputCheck} onChange={(e)=>{setDisable(!disable); setChecked(!checked); onChange(e.target.checked, idInputCheck)}}  checked={checked} disabled={disabled} />
            <input id={idInput} className={mostrarComponente2 ? "secondCheck2" : "secondCheckNac"} name={idInput} max="2050-12-31" type="date" value={value} disabled={disabled ? disabled : disable} onChange={(e)=>onChange(e.target.value, idInput)} />
            
        </div>
        </div>
        
    </div>
    :
    <div className="formulario__grupo__inputs ">
        <div className="form-check p-0">
          <label className="check-label" htmlFor="flexCheckDefault">
            {nameInput}

          </label>
          <input className={mostrarComponente ? "select-date-DatosPerson" : "none"} type="checkbox"  id="flexCheckChecked"  checked={checked} disabled={disabled} />
        </div>
        <div className="d-flex flex-row justify-content-start align-items-center">
            <input className={mostrarComponente2 ? "form-check-input " : "none"}type="checkbox" id={idInputCheck} name={idInputCheck} onChange={(e)=>{setDisable(!disable); setChecked(!checked); onChange(e.target.checked, idInputCheck)}}  checked={checked} disabled={disabled} />
            <input id={idInput} className={mostrarComponente2 ? "secondCheck2" : "secondCheckNac"} name={idInput} max="2050-12-31" type="date" value={value} disabled={disabled ? disabled : disable} onChange={(e)=>onChange(e.target.value, idInput)} />
            
        </div>
    </div>
  )
}

export default InputDate