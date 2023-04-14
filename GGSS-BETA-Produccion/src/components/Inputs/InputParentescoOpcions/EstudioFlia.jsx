import React, { useEffect, useState } from "react";
import "./InputOpcionsFlia.css";
const EstudioFlia = ({
  nameInput,
  array,
  placeHolder,
  nameButton,
  nameCheck,
  checked,
  display,
  propArray,
  idModal,
  disable,
  valueInputEstudios,
  idInput,
  onChange,
  generalState,
  setGeneralState,
  action,
  namePropOp,
  idSelect,
  obligatorio,
  handleClickRef, referencia,modalName
}) => {
  const [mostrarComponente, setMostrarComponente] = useState(true);

  useEffect(() => {
    setMostrarComponente(display);
  }, [display]);

  return (
    <div className="formulario__grupo__inputs mt-2">
    <div className="formulario__grupo">
          <label className="form-label-EstudiosFlia mt-2">
            {nameInput}
          </label>
        
        <div className="col">
          <select
            className={obligatorio ? "form-select ml-4 mt-1 selectFormFlia obligatorio" : "form-select ml-4 mt-1 selectFormFlia"}
            disabled={disable}
            name={idInput}
            id={idInput}
            value={valueInputEstudios}
            onChange={
            (e)=> onChange(e.target.value, idInput)
          }
          >
            {array && array.map((op, i) => {
              return propArray === op[idSelect] ? (
                <option key={i} 
                value={op[idSelect]}
                selected defaultValue>
                  {op[namePropOp]}
                </option>
              ) : (
                <option key={i} 
                value={op[idSelect]}
                defaultValue>
                  {op[namePropOp]}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col d-flex justify-content-end align-items-center btn-modal-miau">
                    <button disabled={disable} className=" btnModalDp btn btn-outline-danger btn-sm " onClick={(e)=>handleClickRef(e,referencia,modalName)}>...</button>
            </div>
        <div className="col-xl-2 radio-Fijar-estu mt-2">
        <div
          className={
            mostrarComponente
              ? "col-xl-2 d-flex align-items-center ml-3 pl-2"
              : "none"
          }
        >
          <input
            className="form-check-input inputCheckEstudio"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked={checked}
            disabled={disable}
          />
          <label className="form-check-label labelEstuFijar" htmlFor="flexCheckChecked">
            {nameCheck}
          </label>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EstudioFlia;
