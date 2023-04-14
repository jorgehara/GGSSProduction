import React, { useState } from "react";
import Buttons from "../../Buttons/Buttons";
import "./InputTextTrabajos.css";

const InputTextTrabajos = ({
  nameLabel,
  inputId,
  onChange,
  value,
  action,
  onSend,
  onDelete,
  id,
  disable,
  type,
  cancelar,
  aceptar,
}) => {
  const iconAdd = "./icons/add.svg";
  const iconDelete = "./icons/delete.svg";
  const iconAddWhite = "./icons/add-white.svg";
  const iconDeleteWhite = "./icons/delete-white.svg";

  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isHoveringAdd, setIsHoveringAdd] = useState(false);

  const handleMouseEnterDelete = () => {
    setIsHoveringDelete(true);
  };

  const handleMouseLeaveDelete = () => {
    setIsHoveringDelete(false);
  };

  const handleMouseEnterAdd = () => {
    setIsHoveringAdd(true);
  };

  const handleMouseLeaveAdd = () => {
    setIsHoveringAdd(false);
  };


  return (
    <>
      <div className="col-xl-6 d-flex flex-row justify-content-start align-items-center mt-2">
        <label htmlFor={inputId}>{nameLabel}</label>
        <input
          disabled={disable}
          type="text"
          name={inputId}
          id={inputId}
          onChange={(e) => onChange(e.target.value, inputId)}
          value={value && value}
          className="textTrabajos formulario-input-TextTrabajo textTrabAnte"
        />
      </div>
      <div className="col-xl-4 d-flex flex-row justify-content-start align-items-center mt-2 ">
        <button
          disabled={disable}
          className="btn border border-success btn-outline-success  buttonWidth"
          onClick={onSend}
          onMouseEnter={handleMouseEnterAdd}
          onMouseLeave={handleMouseLeaveAdd}
          
        >
          {aceptar ? (
              <img
                src={isHoveringAdd ? iconAddWhite : iconAdd}
                alt={type}
              />
            ) : (
              cancelar
            )}
        </button>
        <button
          disabled={disable}
          className="btn  border border-danger btn-outline-danger m-1 buttonWidth"
          onClick={() => onDelete(id)}
          onMouseEnter={handleMouseEnterDelete}
            onMouseLeave={handleMouseLeaveDelete}
        >
            {cancelar ? (
              <img
                src={isHoveringDelete ? iconDeleteWhite : iconDelete}
                alt={type}
              />
            ) : (
              aceptar
            )}
        </button>
      </div>
    </>
  );
};

export default InputTextTrabajos;
