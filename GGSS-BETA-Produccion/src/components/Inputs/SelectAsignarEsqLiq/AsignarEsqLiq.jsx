import React, { useEffect, useState } from "react";
import "./AsignarEsqLiq.css";
const AsignarEsqLiq = ({
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
}) => {
  const [mostrarComponente, setMostrarComponente] = useState(true);

  useEffect(() => {
    setMostrarComponente(display);
  }, [display]);

  return (
    <div className="formulario__grupo__inputs">
    <div className="formulario__grupo">
          <label className="form-label-EsqLiq mt-2">
            {nameInput}
          </label>
            <div className="col-xl-2 radio-Fijar-EsqLiq mt-2">
            <div
              className={
                mostrarComponente
                  ? "col-xl-2 d-flex align-items-center ml-3 pl-2"
                  : "none"
              }
            >
              <input
                className="form-check-input inputCheckEsqLiq"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked={checked}
                disabled={disable}
              />
              <label className="form-check-label labelFijarEsqLiq" htmlFor="flexCheckChecked">
                {nameCheck}
              </label>
            </div>
            </div>
        
        <div className="col">
          <select
            className="form-select selectFormEsqLiq"
            // disabled={disable}
            // name={idInput}
            // id={idInput}
            // value={valueInputEstudios}
          //   onChange={
          //   (e)=> onChange(e, generalState, setGeneralState)
          // }
          >
            {/* {array.map((op, i) => {
              return propArray == op ? (
                <option key={i} 
                value={op}
                selected defaultValue>
                  {op}
                </option>
              ) : (
                <option key={i} 
                value={op}
                defaultValue>
                  {op}
                </option>
              );
            })} */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AsignarEsqLiq;
