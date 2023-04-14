import { useDispatch } from "react-redux";
import { getDocSelect } from "../../redux/actions/documentacionActions";
import "./TableBootstrap.css";

const TableBasic1 = ({columns, value,documentaciones, setRefetch, refetch, disabled}) => {
  
  
  const dispatch = useDispatch();
  
  function getDocumentacion(documentaciones,id){
    let document = documentaciones && documentaciones.filter((item)=>{
      return item.idDocumentacion === id
    })
    return document[0]
  }
  // console.log(documentaciones);
  return (
    <>
    <div className="row mt-5 overflow-scroll rowTAbles">
    <table class="table table-danger contDocumentacion" disabled={disabled} >
      <thead>
        <tr>
          {
            columns && columns.map((col)=>{
              return(
                <th scope="col">{col}</th>
              );
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          value && value.map((valor)=>{
            return(
              <tr>
                <th scope="row"> <input disabled={disabled} type="radio" name="seleccionar" id="seleccionar" onClick={()=>{  dispatch(getDocSelect(valor))}} /> </th>
                <td>{valor.fecha ? valor.fecha.substring(0, valor.fecha.length -9) : "-"}</td>
                <td>{valor.fechaVencimiento ? valor.fechaVencimiento : "-"}</td>
                <td>{getDocumentacion(documentaciones, valor.idDocumentacion).documentacion1}</td>
                <td>{valor.generaLiquidacion === true ? "Genera" : "No genera"}</td>
                <td>{valor.obs ?valor.obs : "-"}</td>
                <td>{valor.incluirCuotaAlimentaria === true ? "Incluye" : "No incluye"}</td>
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

export default TableBasic1;
