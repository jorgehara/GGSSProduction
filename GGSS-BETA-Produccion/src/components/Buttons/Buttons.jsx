import React, { useState } from "react";
import "./Buttons.css";

const Buttons = ({
  type,
  onClick,
  cancelar,
  aceptar,
  disabled,
  functionSend,
  functionDelete,
  idElimiar,
  refetch,
  setRefectch,
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
      <div className="d-flex flex-row">
        <div className="form__grupo__icons d-flex flex-row-reverse w-100 gap-1">
          <button
            className="btn border border-danger btn-outline-danger buttonWidth"
            disabled={disabled}
            onClick={(e) => functionDelete(idElimiar)}
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

          <button
            className="btn border  border-success btn-outline-success buttonWidth"
            disabled={disabled}
            onClick={functionSend}
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
        </div>
      </div>
    </>
  );
};

export default Buttons;
