import React, { useEffect, useState } from "react";
import "./InputOpcionsFlia.css";
const PaisOrigenFlia = ({
  nameLabel,
  array,
  placeHolder,
  nameButton,
  nameCheck,
  checked,
  display,
  propArray,
  idModal,
  disable,
  action,
  onChange,
  namePropValue,
  idSelected,
  nameInput,
  obligatorio,
  handleClickRef, referencia,modalName
}) => {
  const [mostrarComponente, setMostrarComponente] = useState(true);

  useEffect(() => {
    setMostrarComponente(display);
  }, [display]);

  return (
    <div className="formulario__grupo ">
      <div className="">
        <label className="formulario-label-ParentescoFliaOpcions mt-3">
          {nameLabel}
        </label>
      </div>
      <div className="SelectedFliaPais px-0">
        <select
          className={
            obligatorio
              ? "form-select ml-0 mt-1 form-input-PaisDeOrigenFlia obligatorio"
              : "form-select ml-0 mt-1"
          }
          name={nameInput}
          disabled={disable}
          onChange={(e) => onChange(e.target.value, nameInput)}
        >
          {array &&
            array.map((op, i) => {
              return propArray === op[idSelected] ? (
                <option selected defaultValue value={op[idSelected]} key={i}>
                  {op[namePropValue]}
                </option>
              ) : (
                <option key={i} value={op[idSelected]}>
                  {op[namePropValue]}
                </option>
              );
            })}
        </select>
      </div>
        <div className="col d-flex justify-content-start align-items-center btn-modal-miau">
                    <button disabled={disable} className=" btnModalDp btn btn-outline-danger btn-sm " onClick={(e)=>handleClickRef(e,referencia,modalName)}>...</button>
          </div>
      <div
        className={
          mostrarComponente
            ? "d-flex align-items-center col-xl-3 ml-3 pl-2"
            : "none"
        }
      >
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked={checked}
          disabled={disable}
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          {nameCheck}
        </label>
      </div>
    </div>
  );
};

export default PaisOrigenFlia;
