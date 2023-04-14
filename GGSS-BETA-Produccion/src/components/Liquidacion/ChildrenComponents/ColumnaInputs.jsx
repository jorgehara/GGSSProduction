import React from "react";
import InputButton from "../../Inputs/InputButton/InputButton";

const ColumnaInputs = () => {
  return (
    <>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Convenio"
          placeholder="Convenio"
        />
      </div>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Categoría"
          placeholder="Categoría"
        />
      </div>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Agrupamiento"
          placeholder="Agrupamiento"
        />
      </div>
      <div className="col">
        <InputButton nameButton="..." nameLabel="Cargo" placeholder="Cargo" />
      </div>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Tarea desempeñada"
          placeholder="Tarea desempeñada"
        />
      </div>
      
    </>
  );
};

export default ColumnaInputs;
