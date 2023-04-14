import React from 'react'
import { useDispatch } from 'react-redux'
import { addTrabajo, getIdTrabajoAnterior } from '../../redux/actions/trabajosAnterioresActions'

const TableTrabajosAnteriores = ({nameLabel, columns, array, propItemOp, setModificar, disable}) => {
    const dispatch = useDispatch();

  return (
    <>
        <label htmlFor="">{nameLabel}</label>   

    <div className=' overflow-scroll rowTAbles'> 
        <table class="table table-danger ml-2" disabled={disable}>
            <thead>
                {
                    columns && columns.map((col,i)=>{
                        return(
                                <th key={i} scope="col">{col}</th>
                        )
                    })
                }
                
            </thead>
            <tbody>
                {
                    array && array.map((item)=>{
                        return( 
                            <tr>
                                <th scope="row"> <input disabled={disable} type="radio" name="selectTrabajoAnt" id="selectTrabajoAnt" value={item.idTrabajoAnterior} onClick={(e)=>  { setModificar(false); dispatch(addTrabajo(item)); dispatch(getIdTrabajoAnterior(e.target.value))}} /> </th>
                                <td>{item.desde && item.desde.substring(
                                                0,
                                                item.desde.length - 9
                                                )}
                                </td>
                                <td>{item.hasta && item.hasta ? item.hasta.substring(0, item.hasta.length -9) : "Actualidad"}</td>
                                <td>{item.descripcion}</td>
                            </tr>
                        )
                    })
                }                
            </tbody>
        </table>
    </div>
    <div className='col-xl-3'>
        <button disabled={disable} className="btn btn-danger btn-sm mt-2" onClick={()=> setModificar(true)}>
            Modificar Datos
        </button>
    </div>
    </>
  )
}

export default TableTrabajosAnteriores