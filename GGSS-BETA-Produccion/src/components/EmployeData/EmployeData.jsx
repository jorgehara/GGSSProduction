// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputEmpData from "../Inputs/InputEmpData/InputEmpData";
import "./EmployeData.css";

const EmployeData = ({disabled, image, responses}) => {
  const empleadoUno = useSelector((state)=> state.employeStates.employe);
  const estados = useSelector((state)=> state.generalState.estados);

  const idEstadoSelec = empleadoUno && empleadoUno.idEstado;
  const estadoSEleccionado = estados && estados.find(est => est.idEstado === idEstadoSelec); 

  

    
  return (
        <div className="container-flex border border-3 p-2 text-start">
            <div className="row">
              <div className="col-2 d-flex align-items-center ">
                <img
                  className="border border-1 imgData"
                  id="imagen"
                  src={empleadoUno?.imagen && `data:image/png;base64,${empleadoUno?.imagen}`}
                  alt=""
                />
            </div>
              <div className="col-5  d-flex-column align-items-center"> 
              <div className="row">
            <InputEmpData
                idInput=""
                inputValue=
                {
                  empleadoUno && empleadoUno.legajo
                }
                nameLabel="Legajo: "
                disabled={disabled}
                />
            <InputEmpData
                idInput="apellidoInfo"
                // className="apellido"
                inputValue={
                  empleadoUno && empleadoUno.apellido
                }
                nameLabel="Apellidos:"
                disabled={disabled}
                />
          
            <InputEmpData
                  idInput="tipoDNIInfo"
                  inputValue={
                    empleadoUno && empleadoUno.nroDocumento
                  }
                  nameLabel="NroDoc:"
                  disabled={disabled}
                />
              </div>
            </div>
              <div className="col-5  d-flex-column align-items-center">
                <InputEmpData
                  idInput="estadoInfo"
                  inputValue={
                    estadoSEleccionado !== undefined ? estadoSEleccionado?.nombreEstado : ""
                  }
                  nameLabel="Estado: "
                  disabled={disabled}
                />
                <InputEmpData
                  idInput="nombresInfo"
                  inputValue={
                    empleadoUno && empleadoUno.nombres
                  }
                  nameLabel="Nombres: "
                  disabled={disabled}
                />
            </div>

          </div>
          </div>
          
  );
};
export default EmployeData;