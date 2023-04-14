import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import "./Buttons.css"

const ButtonLarge = ({color, align, tamaño, justyfy, nameButton, url, disabled}) => {

  const [urls , setUrls] = useState("");
  const empleadoUno = useSelector((state)=> state.employeStates.employe);
  const urlValidate=(url, empleado)=>{
    if(empleado){
      return setUrls(url);
    }
    return swal({
      title: "Error",
      text: "Debe seleccionar un empleado",
      icon: "error",
    })
  }


  return (
        empleadoUno !== undefined ?
        <a href={url} rel="noreferrer" disabled={disabled}  className={empleadoUno?.iDempleado ? (`btn btn-${color} btn-${tamaño} d-flex justify-content-${justyfy} align-items-${align} newClass`) : `btn btn-${color} btn-${tamaño} d-flex justify-content-${justyfy} align-items-${align} disabledClass`}>
          {nameButton}
        </a> : 
        <button  disabled={disabled} onClick={()=> swal({
                                    title: "Error",
                                    text: "Debe seleccionar un empleado",
                                    icon: "error",
                                  })}  className={`btn btn-${color} btn-${tamaño} d-flex justify-content-${justyfy} align-items-${align} newClass`}>
                                  {nameButton}
        </button>
    
  )
}

export default ButtonLarge