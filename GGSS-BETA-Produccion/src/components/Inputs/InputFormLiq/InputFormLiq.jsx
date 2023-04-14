import { useEffect, useState } from "react";
import "./InputFormLiq.css";

const InputFormLiq = ({
  nameInput,
  messageError,
  placeHolder,
  inputId,
  value,
  disabled,
  onChange,
  nameLabel,
  datosPersonalesValue,
  generalState,
  setGeneralState,
}) => {
  const [valor, setValor] = useState("");

  useEffect(() => {
    setValor(datosPersonalesValue);
  }, [datosPersonalesValue]);

  useEffect(() => {
    setValor(value);
  }, [value]);


  return (
    <div className= "formulario__grupo__inputs">
      <div className="formulario__grupo">
        <label className="formulario__label" htmlFor={inputId}>
          {nameLabel}
        </label>
      </div>
      <div className="form__grupo-input">
        <input type="text" className= "formulario-input-Legajo" id={inputId} placeholder={placeHolder} value={valor} onChange={(e) => onChange(e, generalState, setGeneralState)}
          disabled={disabled}
          name={nameInput}
        />
      </div>
      <div className= "form__grupo__icons">
        <i className= "fas fa-times-circle form__grupo__icon"></i>
      </div>
      <div className= "form__grupo__errors">
        <p className= "form__grupo__error">{messageError}</p>
      </div>
    </div>
  );
};
export default InputFormLiq;
