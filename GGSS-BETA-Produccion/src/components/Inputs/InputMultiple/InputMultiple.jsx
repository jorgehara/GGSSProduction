import React, { useEffect, useState } from "react";
import Familia from "../../Familia/Familia";
import "./InputMultiple.css";

const InputMultiple = ({
  valueDNI,
  nameInputDNI,
  optionsDNI,
  valueRadio,
  nameFirst,
  nameSecond,
  nameInputRadio,
  placeholder,
  disable,
  propsRadioButton,
  onChange,
  datosFamiliaValue1,
  datosFamiliaRadio,
  action,
  namePropOp,
  idSelected,
  propSelected,
  obligatorio
}) => {
  const [valor, setValor] = useState("");
  const [valorRadioM, setValorRadioM] = useState(false);
  const [valorRadioF, setValorRadioF] = useState(false); 
  
  useEffect(() => {
    valueInput();
  }, [valorRadioM, valorRadioF, valueRadio]);

  useEffect(()=>{
    setValor(valueRadio);
  },[valueRadio])

  useEffect(()=>{
    setValor(datosFamiliaRadio);
  },[datosFamiliaRadio])
  
  


  const valueInput = () => {    
      if(valueRadio === "M"){
        setValorRadioM(true);
        setValorRadioF(false);
      }
      if(valueRadio === "F"){
        setValorRadioF(true);
        setValorRadioM(false);
      } 
    }    

 
  return (
    // <div className="container-flex align-items-center">
      <div className="formulario__grupo ">
        <div className=" d-flex flex-row justify-content-start align-items-center">
          <div className="col-xl-6 divLabelMultiple  d-flex justify-content-start align-items-center">
            <label className="formulario-label-DNIFamilia mt-1 ">{nameInputDNI}</label>
          </div>
          <div>
            
          </div>
          <div className="col-xl-4 divCboMultiple  d-flex justify-content-start align-items-center">
            <select className={obligatorio ? "formulario-input-DNI-familia form-select  px-0 obligatorio" : "formulario-input-DNI-familia form-select  px-0"} value={datosFamiliaValue1 !== undefined ? datosFamiliaValue1 : null}  disabled={disable} id={propsRadioButton.idCboDni} name={propsRadioButton.idCboDni} onChange={(e)=>onChange(e.target.value,propsRadioButton.idCboDni)}>
              {optionsDNI && optionsDNI.map((op, i) => {
                return propSelected === op[idSelected] ? <option key={i} selected value={op[idSelected]}>{op[namePropOp]}</option> :
                <option key={i} value={op[idSelected]}>{op[namePropOp]}</option> 
              })}
            </select>
          </div>
          <div className="col-xl-2 d-flex justify-content-start align-items-center">
            <input
              type="text"
              maxLength="8"
              value={valueDNI}
              className={obligatorio ? "formulario-input-DNI-input px-0 mt-0 mb-0 obligatorio" : "formulario-input-DNI-input px-0 mt-0 mb-0"}
              placeholder={placeholder}
              disabled={disable}
              id={propsRadioButton.idNroDni}
              name={propsRadioButton.idNroDni}
              onChange={(e)=>onChange(e.target.value, propsRadioButton.idNroDni)}
            ></input>
          </div>
          <div className="form__grupo__icon">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="form__grupo__error">
          </div>
          <div className="col-xl-4  form-inputs-radioFlia w-100">
            
            <div className="d-flex flex-column justify-content-start align-items-center  inputSexo">
              <div className="d-flex flex-row justify-content-start align-items-center  w-100">
                <input
                  className={obligatorio ? "form-check-input obligatorio" : "form-check-input"}
                  type="radio"
                  id={propsRadioButton.idRadioBtn}
                  name={propsRadioButton.idRadioBtn}
                  defaultChecked
                  checked={valueRadio == "M"}
                  onChange={(e)=>onChange(e.target.value, propsRadioButton.idRadioBtn)}
                  value="M"
                  disabled={disable}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  {nameFirst}
                </label>
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center w-100">
                <input
                  className={obligatorio ? "form-check-input obligatorio" : "form-check-input"}
                  type="radio"
                  id={propsRadioButton.idRadioBtn}
                  defaultChecked
                  name={propsRadioButton.idRadioBtn}
                  checked={valueRadio === "F"}
                  onChange={(e)=>onChange(e.target.value, propsRadioButton.idRadioBtn)}
                  value="F"
                  disabled={disable}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  {nameSecond}
                </label>
              </div>
              
            </div>
            
          </div>
        </div>
        
      </div>
    // </div>
  );
};

export default InputMultiple;
