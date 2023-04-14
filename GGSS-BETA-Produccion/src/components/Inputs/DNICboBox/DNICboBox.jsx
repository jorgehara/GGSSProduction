import React, { useEffect, useState } from "react";
import "./DNICboBox.css";
const DNICboBox = ({  messageError, placeHolder, array, value , disabled, idInput, nameLabel, onChange, selectedId, propArray, action, validateNumbersDNI,propArrayOp,propArrayId, idSelected, obligatorio, handleClickRef, referencia,modalName, agregar, parSueldos}) => {


  const [valor, setValor] = useState("");
  
  
  useEffect(()=>{
    setValor(value);
  },[value])



  return (
    <div className="formulario__grupo">
      <div className="d-flex flex-column justify-content-center align-items-cener">
        <label className="formulario__label mt-2 ml-4">{nameLabel}</label>
      </div>
      <div className="">
        <select disabled={disabled} className={obligatorio ? "formulario-input-DNI  ml-0 px-0 obligatorio" : "formulario-input-DNI ml-0 px-0"} id={selectedId} name={selectedId} onChange={(e)=> onChange(e.target.value, selectedId)}>
          {
          
            agregar &&
            array && array.map((op, i)=>{
              return (Number(parSueldos && parSueldos[0]?.idTipoDocumentoPredeterminado) === op[propArrayId] ? <option selected key={i} value={op[propArrayId]}>{op[propArrayOp]}</option> : <option  key={i} value={op[propArrayId]}>{op[propArrayOp]}</option>)
            })
          }
          {
            !agregar && 
            array && array.map((op, i)=>{
              return(Number(idSelected) === op[propArrayId] ? <option selected key={i} value={op[propArrayId]}>{op[propArrayOp]}</option> : <option key={i} value={op[propArrayId]}>{op[propArrayOp]}</option>);
            })
            
          }
          
          
        </select>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-cener">
        <input
          type="text"
          id={idInput}
          maxLength="8"
          name={idInput}
          className={obligatorio && !valor ? "formulario-input-DNI obligatorio" : "formulario-input-DNI  mx-1"}
          placeholder={placeHolder}
          value={ valor}
          disabled={disabled}
          onChange={(e)=> onChange(e.target.value,idInput)}
          onKeyPress={(e)=>validateNumbersDNI(e)}
        ></input>
      </div>
      <div className="form__grupo__icon">
        <i className="fas fa-times-circle"></i>
      </div>
      <div className="tercero d-flex flex-row justify-content-cener align-items-center">
          <button disabled={disabled} className="btn btn-outline-danger btn-sm btnModalDp" onClick={(e)=>handleClickRef(e,referencia,modalName)}>...</button>
      </div>
      <div className="form__grupo__error">
        <p>{messageError}</p>
      </div>
    </div>
  );
};

export default DNICboBox;
