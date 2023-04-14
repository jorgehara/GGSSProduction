import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { domicilioSelected, selectedIdDomicilio } from "../../redux/actions/domiciliosActions";

const TablaDomicilios = ({ columns , disabled, setRefectch, departamentos, localidades, provincias, barrios, calles}) => {
  
  //const [dataTable, setDataTable] = useState([]);
 
  const dataTable = useSelector((state)=> state.domiciliosStates.domicilioEmpleado);



const dispatch = useDispatch();

  return (
    <>
      <div className="row mt-5 overflow-scroll rowTAbles">
        <table disabled={disabled} className="table table-danger">
          <thead>
            <tr>
              <th >Seleccionar</th>
              {columns.map((col, i) => {
                return (
                  <th key={i} scope="col" className="px-2">
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {
              dataTable && dataTable.map((item, i)=>{
                return(
                  <tr>
                    <th>
                      <input type="radio" disabled={disabled} name="seleccionar" id="seleccionar" value={item.idDomicilio} onClick={(e)=> {dispatch(selectedIdDomicilio(e.target.value)); dispatch(domicilioSelected(item))}} />
                    </th>
                    <th>
                      <input  type="checkbox" disabled="disabled" className="border-0 px-2" id="capitulo"  value={item.predeterminado} checked={item.predeterminado === null ? false : item.predeterminado}/>
                    </th>
                    <td>{item &&  item.calle}</td>
                    <td>{item && item.numero}</td>
                    <td>{item &&  item.barrio}</td>
                    <td>{item &&  item.localidad}</td>
                    <td>{item &&  item.departamento }</td>
                    <td>{item &&  item.provincia}</td>
                  </tr>                  
                )
              })
             
            }     
          </tbody>
        </table>        
      </div>
    </>
  );
};

export default TablaDomicilios;
