import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFamiliar, addNewFamiliar } from "../../redux/actions/familiaActions";
import "./TableBootstrap.css"

const TableBootstrap = ({
  columns,
  array,
  onSelect,
  seleccionado,
  disabled
}) => {
  const [inputCheck, setInputCheck] = useState({});
  const dispatch = useDispatch();
 

  return (
    <>
      <div className="table-responsive mt-5 overflow-scroll rowTAbles">
        <table className="table table-striped table-danger  ">
          <thead>
            <tr>
              <th>Sel.</th>
              {columns.map((col, i) => (
                <th key={i} className="nameColums">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {array && array.map((item,i) => (
              <tr key={i}>
                <td>
                  <input
                    type="radio"
                    checked={inputCheck[`selected${i}`]}
                    disabled={disabled}
                    name="imputRadio"
                    value={item.idFamiliares}
                    id={`selected${i}`}
                    onClick={(e) => {dispatch(addNewFamiliar(item.idFamiliares)); dispatch(addFamiliar(item))}}
                  />
                </td>
                <td>{item.apellidoyNombres}</td>
                <td>{item.tipoDocumento && item.tipoDocumento}</td>
                <td>{item && item.nroDocumento}</td>
                <td>{item && item.sexo}</td>
                <td>{item.nombreParentesco && item.nombreParentesco}</td>
                <td>{item.fechaNacimiento && item.fechaNacimiento.substring(0, item.fechaNacimiento.length - 9)}</td>
                <td>{item.paisOrigen && item.paisOrigen}</td>
                <td>{item.nacionalidad && item.nacionalidad}</td>
                <td>{item.estudiosNivel && item.estudiosNivel}</td>
                <td>{item?.f_Baja && item.f_Baja?.substring(0, item?.fBaja?.length - 9)}</td>
                <td>{item.noDeducirGanancias === false ? "No" : "Si"}</td>
                <td>{item.inlcuirCuotaAlimentaria === false ? "No" : "Si"}</td>
                <td>{item.obs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableBootstrap;
