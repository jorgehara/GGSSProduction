import React from 'react'
import InputButton from '../../Inputs/InputButton/InputButton'


const ColumnaInputs2da = () => {
  return (
    <>
    <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Modo de Contratación"
          placeholder="Modo de Contratación"
          action="ACTION"
        />
      </div>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Modo de Liquidación"
          placeholder="Modo de Liquidación"
          action="ACTION"
        />
        </div>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Centro de Costo"
          placeholder="Centro de Costo"
          action="ACTION"
        />
      </div>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Secretaria/Sector/Dpto"
          placeholder="Secretaria/Sector/Dpto"
          action="ACTION"
        />
      </div>
      <div className="col">
        <InputButton
          nameButton="..."
          nameLabel="Obra Social"
          placeholder="Obra Social"
          action="ACTION"
        />
      </div>
    </>
  )
}

export default ColumnaInputs2da