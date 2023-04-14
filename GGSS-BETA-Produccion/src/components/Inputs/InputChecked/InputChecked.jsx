import React from "react";
import "./InputChecked.css";

const InputChecked = ({
  nameLabel,
  placeHolder,
  value,
  checked,
  nameCheck,
  disabled,
  idInput,
  nameInput,
  onChange,
  action,
  obligatorio
}) => {
  return (
    <>
    <div className="formulario__grupo__inputs">
    <div className="formulario__grupo">
            <label className="form__labelFlia mt-2" htmlFor={idInput}>
              {nameLabel}
            </label>
        
          <div className="d-flex align-items-center col-xl-4 px-0">
            <input
              type="text"
              className={obligatorio ? "formulario-input-Familia obligatorio" : "formulario-input-Familia"}
              id={idInput}
              placeholder={placeHolder}
              value={value}
              name={nameInput}
              onChange={(e) => 
                onChange(e.target.value,idInput)}
              disabled={disabled}
            />

          <div className="d-flex align-items-center">
           {/*  <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              defaultChecked={checked}
              disabled={disabled}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              {nameCheck}
            </label> */}
          </div>
          </div>

    </div>
    </div>
    </>
  );
};

export default InputChecked;
