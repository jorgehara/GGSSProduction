import { useDispatch, useSelector } from "react-redux";
import { addSelectDetalle, idSelect } from "../../redux/actions/licenciasActions";
import "./TableBootstrap.css";

const TableSuspenLicencia = ({ columns, disabled }) => {
  const dispatch = useDispatch();

  const detalleLicencia = useSelector(
    (state) => state.licenciasState.detalleLicencia
  );
  const idSelected = useSelector((state)=> state.licenciasState.idSelected);
  const detalesDeLicencias = useSelector((state)=> state.licenciasState.detalleLicencia);




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
          {detalleLicencia &&
            detalleLicencia.map((valor) => {
            
              return Number(idSelected) ===
                Number(valor?.idLicenciaEmpleado) ? (
                <tr>
                  <th scope="row">
                    {" "}
                    <input
                    disabled={disabled}
                      type="radio"
                      name="inpurSelectDetalleLiq"
                      id="inpurSelectDetalleLiq"
                      onClick={() => {
                        dispatch(addSelectDetalle(valor));
                        
                      }}
                    />{" "}
                  </th>
                  <td>
                    {valor && valor.desde
                      ? valor.desde.substring(0, valor.desde.length - 9)
                      : "-"}
                  </td>
                  <td>
                    {valor && valor.hasta
                      ? valor.hasta.substring(0, valor.hasta.length - 9)
                      : "-"}
                  </td>
                  <td>
                    {valor && valor.fechaSuspension
                      ? valor.fechaSuspension.substring(
                          0,
                          valor.fechaSuspension.length - 9
                        )
                      : "-"}
                  </td>
                </tr>
              ) : null;
            })}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default TableSuspenLicencia;
