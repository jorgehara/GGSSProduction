import axios from "axios";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {
  addDetalleLicencia,
  addOneLicencia,
  idSelect,
  licenciaSelected,
} from "../../redux/actions/licenciasActions";
import "./TableBootstrap.css";

const TableLicencias = ({
  columns,
  value,
  documentaciones,
  licenciaDelEmpleado,
  checked,
  setChecked,
  setRefectch,
  refetch,
  disabled
}) => {
  const dispatch = useDispatch();

  const date = new Date("2022-12-31T00:00:00");

  return (
    <>
    <div className="row mt-5 overflow-scroll rowTAbles">
      <table class="table table-danger">
        <thead>
          <tr>
            {columns &&
              columns.map((col) => {
                return <th scope="col">{col}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {licenciaDelEmpleado &&
            licenciaDelEmpleado.map((valor, i) => {
              
              return (
                <tr key={i}>
                  <th scope="row">
                    {" "}
                    <input
                    disabled={disabled}
                      defaultChecked={false}
                      type="radio"
                      name="seleccionar"
                      id="seleccionar"
                      onClick={() => {
                        setChecked(true);                        
                        dispatch(addOneLicencia(valor));
                        dispatch(licenciaSelected(valor))
                        dispatch(idSelect(valor.idLicenciaEmpleado))
                      }}
                    />{" "}
                  </th>
                  <td>{valor.año ? valor.año : "-"}</td>
                  <td>
                  {valor?.diasTomados !== 0 ? valor?.diasTomados :  valor?.diasDisponiblesTotales}            

                  
                  </td>
                  <td>
                    {valor?.diasTomados !== 0 && valor?.diasTomados !== valor?.diasDisponiblesTotales ?  valor?.diasTomados - valor?.diasDisponiblesTotales : valor?.diasDisponiblesTotales }
                  
                  </td>
                  <td>
                  { valor?.diasDisponiblesTotales === valor?.diasTomados ? valor?.diasTomados - valor?.diasDisponiblesTotales : valor?.diasDisponiblesTotales}  
                  </td>
                  <td>
                    {valor.fechaVencimiento && valor.fechaVencimiento
                      ? valor.fechaVencimiento.substring(
                          0,
                          valor.fechaVencimiento.length - 9
                        )
                      : "-"}
                  </td>
                  <td>
                    {valor.fechaProrroga && valor.fechaProrroga
                      ? valor.fechaProrroga.substring(
                          0,
                          valor.fechaProrroga.length - 9
                        )
                      : "-"}
                  </td>
                  <td>{valor?.nroResolucion}</td>
                  <td>
                  
                     {valor?.diasDisponibles} 
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default TableLicencias;
