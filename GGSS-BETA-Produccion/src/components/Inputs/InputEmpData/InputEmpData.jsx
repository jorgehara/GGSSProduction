import React from "react";
import './InputEmpData.css';

const InputEmpData = ({ idInput, inputValue, nameLabel,disabled }) => {
  return (
    <div className="row">
      <label className="col-sm-4 form__label-Cabecera " 
      htmlFor={idInput}>
        {nameLabel}
      </label>
      <div class="col-sm-8 ">
      <input
        readonly="readonly"
        className="form-input-FliaCabecera"
        type="text"
        id={idInput}
        name={idInput}
        value={inputValue}
        disabled={disabled}
      />
      </div>
    </div>
  );
};

export default InputEmpData;
