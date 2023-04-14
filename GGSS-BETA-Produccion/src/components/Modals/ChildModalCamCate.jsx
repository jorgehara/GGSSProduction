import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import TextArea from '../Inputs/TextArea/TextArea';

const ChildModalCamCate = ({handleClickClose, nameModalProp,  nameModal, disableModalButtons, setDisableMOdal, setDisableModalButtons, onChangeValues,  value,  modalOpen, setRefectch, refetch, setRenderButtons, valueRender}) => {

const documentaciones = useSelector((state)=> state.documentacionState.domiciliosDelEmpleado);
  const empleadoUno = useSelector((state)=> state.employeStates.employe);
  const categorias = useSelector((state)=> state.generalState.categorias);

  const bodyCate = {
    "idCategoriaAnterior": empleadoUno?.iDcategoria,
    "idCategoriaActual": Number(value?.selectCateModal),
    "fEcha": value?.fechaCategoriaModal,
    "idEmpleado": empleadoUno?.iDempleado,
    "obs": value?.txtCateModal
  }
  console.log(bodyCate)
  async function sendDataBaja(){
    if(empleadoUno?.iDempleado){
        try{
            axios.post(`http://54.243.192.82/api/Categorias/sp_CambiosCategoriasGuarda`, bodyCate)
            .then((res)=>{
            if(res.status === 200){
                setRefectch(refetch);
                setRenderButtons(valueRender);
                return swal({
                title : "Ok",
                text : "Cambio de Categoría exitoso",
                icon : "success"
                });
            }
            })
        }catch(err){
            return swal({
            title : "Error",
            text : "Error al cambiar la categoría del Empelado" + err,
            icon : "error"
            });
        }
   } 
}


  return (
    <section className={modalOpen ? 'modalOPen' : ' modalClose'} >
        <div className='cortina'></div>
    <div className='modalBodyClass ' >
        <div className="row p-2 titleBg">
          <div className="d-flex flex-row justify-content-between align-items-center ">
          <p className="h3"><ins>{nameModal}</ins></p>
            <button
              className="btn btn-outline-danger text-white fs-6 btn-md buttonModal border border-dark"
              onClick={() => {
                handleClickClose(nameModalProp);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
       <div className='row w-100 bodyBajaEmpleado'>
          <div className="col-12">
          <fieldset className="border p-2">
            <legend className="float-none w-auto p-2 contenedorFieldSet">
                <i className="fs-5 bi-person "></i><span className="ms-1 d-none d-sm-inline colorFont">Empleado</span>
            </legend>
              <div className='row'>
                <div className='col-12 d-flex flex-row align-items-center justify-content-start'>
                    <label className='labelModalBaja' htmlFor="legajoModal">Legajo:</label>
                    <input className='inputModalBaja' type="text" name="legajoModal" id="legajoModal" value={empleadoUno?.iDempleado ? empleadoUno?.legajo : ""} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex flex-row align-items-center justify-content-start'>
                    <label className='labelModalBaja' htmlFor="apellidoNombreModal">Apellido y Nombre:</label>
                    <input className='inputModalBaja' type="text" name="apellidoNombreModal" id="apellidoNombreModal" value={empleadoUno?.iDempleado ? `${empleadoUno?.apellido}, ${empleadoUno?.nombres}` : ""} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex flex-row align-items-center justify-content-start'>
                    <label className='labelModalBaja' htmlFor="cuilModal">CUIL:</label>
                    <input className='inputModalBaja' type="text" name="cuilModal" id="cuilModal" value={empleadoUno?.iDempleado ? empleadoUno?.cuil : ""}/>
                </div>
              </div>
          </fieldset>
          </div>
          <div className='col-12'> 
            <fieldset className="border p-2">
              <legend className="float-none w-auto p-2 contenedorFieldSet">
                  <i className="fs-5 bi-person "></i><span className="ms-1 d-none d-sm-inline colorFont">Datos</span>
              </legend>
              <div className='row d-flex flex-row align-items-center justify-content-start'>
                  <div className='col-6 '>
                     <label className='labelModalBaja' htmlFor="fechaCategoriaModal">Fecha:</label>
                     <input onChange={(e)=> onChangeValues(e.target.value, "fechaCategoriaModal")} value={value?.fechaCategoriaModal} className='fechaModalBaja' type="date" name="fechaCategoriaModal" id="fechaCategoriaModal" />
                  </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex flex-row align-items-center justify-content-start mt-2'>
                  <label className='labelModalBaja' htmlFor="selectCateModal">Nueva Categoría:</label>
                  <select onChange={(e)=> onChangeValues(e.target.value, "selectCateModal")} className='selectModalBaja' name="selectCateModal" id="selectCateModal">
                    {
                      categorias && categorias.map((item,index)=>{
                        return(
                          <option key={index} value={item.iDcategoria}>{item.categoria}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className='row'>
                <TextArea inputName="Observaciones" onChange={onChangeValues} idInput="txtCateModal" characterLimit={255} value={value?.txtCateModal} />
              </div>
              
            </fieldset>
            <div className='row'>
              <div className='col-12 d-flex flex-row-reverse'>
                <button className='btn btn-dark m-1' onClick={sendDataBaja} >Aceptar</button>
                <button className='btn btn-dark m-1'>Cancelar</button>
              </div>
            </div>
          </div>
       </div>
      </div>
    </section>
  )
}

export default ChildModalCamCate