import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./InputButton.css";

const InputButton = ({nameButton, placeholder, nameLabel, maxLeght, value, disabled, nameInput, id,onChange,funcionCuil,nroDocumento,genre, usaCuil,datosPersonalesValue, action,swal , clasess, obligatorio, mostrarAsidePagos}) => {

  const [valor, setValor] = useState();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch({
      type : action,
      payload : { name : id, value : valor }
    })
  },[valor])

  useEffect(()=>{
    setValor(datosPersonalesValue)
  },[datosPersonalesValue])
  
  useEffect(()=>{
    
    setValor(value);
  },[value])

  return (
    clasess ? <div className={`${clasess.classOne}`}>      
    <div className={`${clasess.classTwo}`}>
        <label className={`${clasess.classThree}`} htmlFor={nameInput}>{nameLabel}</label>
        <input type="text" 
                value={ datosPersonalesValue && datosPersonalesValue !== "" ? datosPersonalesValue : valor }
                maxLength={maxLeght}
                className={`${clasess.classFour}`} 
                placeholder={placeholder} 
                id={id} 
                name={id}
                disabled={disabled}
                onChange={(e)=> onChange(e.target.value, id)}
                />
       {/*  <button type="button" onClick={()=>setValor(funcionCuil(nroDocumento,genre, swal))}
              className={`${clasess.classFive}`} 
              disabled={disabled}
              // disabled={mostrarAsidePagos}
              >
              {nameButton}
        </button> */}
    </div>
</div>
        : 
<div className="formulario__grupo__inputs-Button ">      
        <div className='fomulario__container__button'>
            <label className='formulario__label' htmlFor={nameInput}>{nameLabel}</label>

            <input type="text" 
                    value={ datosPersonalesValue !== undefined && datosPersonalesValue !== "" ? datosPersonalesValue : valor }
                    maxLength={maxLeght}
                    className={obligatorio ? "formulario-input-Legajo-Button ml-0 px-0 mt-0  mr-1 obligatorio" : "formulario-input-Legajo-Button ml-0 px-0 mt-0  mr-1"} 
                    placeholder={placeholder} 
                    id={id} 
                    name={id}
                    disabled={disabled}
                    onChange={(e)=> onChange(e.target.value,id )}
                    />
            {/* <button type="button" onClick={()=>setValor(funcionCuil(nroDocumento,genre, swal))}
                  className="btn btn-validacion btn-outline-danger" disabled={disabled}>
                  {nameButton}
            </button> */}
        </div>
    </div>
  );
};
export default InputButton;
