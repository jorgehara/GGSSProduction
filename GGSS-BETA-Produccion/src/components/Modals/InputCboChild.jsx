import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const InputCboChild = ({
  nameLabel,
  array,
  value,
  display,
  nameButton,
  idSelected,
  sexo,
  idModal,
  disabled,
  idInput,
  onChange,
  datosPersonalesValue,
  action,
  propArrayOp,
  propArrayOpFem,
  provinciaAction,
  valueId,
  clasess,
  obligatorio,
  licencia,
}) => {
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const [valor, setValor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setValor(datosPersonalesValue);
  }, [datosPersonalesValue]);

  useEffect(() => {
    setValor(value);
  }, [value]);
  useEffect(() => {
    setMostrarComponente(display);
  }, [display]);
  const onClickOption = (value) => {
    dispatch(provinciaAction(value));
  };
  return (
    <div>
      {" "}
      <div className="formulario__grupo__inputs__cbo">
        <div className="form__grupo__label__inp">
          <div className="primero">
            <label className="formulario__label  mb-0" htmlFor="legajo">
              {nameLabel}
            </label>
          </div>
          <div className="segundo">
            <select
              className={
                obligatorio
                  ? "formulario-input-Estado form-select ml-0 px-0 obligatorio"
                  : "formulario-input-Estado form-select ml-0 px-0"
              }
              onChange={(e) => onChange(e.target.value, idInput)}
              value={datosPersonalesValue}
              id={idInput}
              disabled={disabled}
              name={idInput}
            >
              <option selected value="">
                Seleccionar
              </option>
              {sexo !== null &&
              sexo !== undefined &&
              sexo.length > 0 &&
              sexo === "M"
                ? array !== undefined &&
                  array.map((op, index) => {
                    return Number(idSelected) === op[valueId] ? (
                      <option
                        key={index}
                        onClick={(e) => onClickOption(op)}
                        selected
                        value={op[valueId]}
                      >
                        {op[propArrayOp]}
                      </option>
                    ) : (
                      <option
                        defaultValue={op[propArrayOp]}
                        onClick={(e) => onClickOption(op)}
                        value={op[valueId]}
                        key={index}
                      >
                        {op[propArrayOp]}
                      </option>
                    );
                  })
                : array &&
                  array.map((op, index) => {
                    return Number(idSelected) === op[valueId] ? (
                      <option
                        key={index}
                        selected
                        onClick={(e) => onClickOption(op)}
                        value={op[valueId]}
                      >
                        {op[propArrayOpFem]}
                      </option>
                    ) : (
                      <option
                        defaultValue={op[propArrayOpFem]}
                        onClick={(e) => onClickOption(op)}
                        value={op[valueId]}
                        key={index}
                      >
                        {op[propArrayOpFem]}
                      </option>
                    );
                  })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
