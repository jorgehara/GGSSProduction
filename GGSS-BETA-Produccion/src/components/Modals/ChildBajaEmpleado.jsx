import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { classesTxtAreaModal } from '../../classes/classes';
import { getMotivosEgreso } from '../../redux/actions/fetchActions';
import InputModal from '../Inputs/InputModal/InputModal';
import TextArea from '../Inputs/TextArea/TextArea';
import "./BasicModal.css"

const ChildBajaEmpleado = ({handleClickClose, nameModalProp,  nameModal, disableModalButtons, setDisableMOdal, setDisableModalButtons, onChangeValues,  value,  modalOpen, setRefectch, refetch, setRenderButtons, valueRender}) => {
  
  const documentaciones = useSelector((state)=> state.documentacionState.domiciliosDelEmpleado);
  const empleadoUno = useSelector((state)=> state.employeStates.employe);
  const motivosEgreso = useSelector((state)=> state.generalState.motivosEgreso);
  
  const bodyDocu = {
    "fecha": value?.datePResentacionBaja && value?.datePResentacionBaja.substring(0, value?.datePResentacionBaja.length -3),
    "idEmpleado": empleadoUno?.iDempelado,
    "idDocumentacion": value?.labelModalBaja,
    "rutaAdjunto": "",
    "obs": value?.txtModalBaja,
    "fechaVencimiento": null,
    "generaLiquidacion": false,
    "incluirCuotaAlimentaria": false
  }

 
    async function sendDataBaja(){
    if(empleadoUno?.iDempleado){
      try{
        axios.post(`http://54.243.192.82/api/Empleados/sp_BajaEmpleado?idEmpleado=${empleadoUno?.iDempleado}&idMotivoEgreso=${value?.labelMotivoBaja}&FechaEgreso=${value?.datePResentacionBajaEmpleado}`).then((res)=>{
          if(res.status === 200){
            try{
              axios.post(`http://54.243.192.82/api/EmpleadosDocumentacion`, bodyDocu)
              .then((res)=>{
                if(res.status === 200){
                  setRefectch(refetch);
                  setRenderButtons(valueRender);
                  return swal({
                    title : "Ok",
                    text : "Baja exitosa",
                    icon : "success"
                  });
                }
              })
            }catch(err){
              return swal({
                title : "Error",
                text : "Error al realizar la baja del Empelado" + err,
                icon : "error"
              });
            }
          }
        })
      }catch(err){
        return swal({
          title : "Error",
          text : "Error al realizar la baja del Empelado" + err,
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
                     <label className='labelModalBaja' htmlFor="datePResentacionBaja">Fecha Presentación:</label>
                     <input onChange={(e)=> onChangeValues(e.target.value, "datePResentacionBaja")} value={value?.datePResentacionBaja} className='fechaModalBaja' type="date" name="datePResentacionBaja" id="datePResentacionBaja" />
                  </div>
                  <div className='col-6 '>
                     <label className='labelModalBaja' htmlFor="datePResentacionBajaEmpleado">Fecha de Baja:</label>
                     <input onChange={(e)=> onChangeValues(e.target.value, "datePResentacionBajaEmpleado")} value={value?.datePResentacionBajaEmpleado} className='fechaModalBaja' type="date" name="datePResentacionBajaEmpleado" id="datePResentacionBajaEmpleado" />
                  </div>
              </div>
              <div className='row'>
                <div className='col-12 d-flex flex-row align-items-center justify-content-start mt-2'>
                  <label className='labelModalBaja' htmlFor="labelModalBaja">Documentación:</label>
                  <select onChange={(e)=> onChangeValues(e.target.value, "labelModalBaja")} className='selectModalBaja' name="labelModalBaja" id="labelModalBaja">
                    {
                      documentaciones && documentaciones.map((item,index)=>{
                        return(
                          <option key={index} value={item.idDocumentacion}>{item.documentacion1}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className='row'>
                <TextArea inputName="Observaciones" onChange={onChangeValues} idInput="txtModalBaja" characterLimit={255} value={value?.txtModalBaja} />
              </div>
              <div className='row'>
                <div className='col-12 d-flex flex-row align-items-center justify-content-start'>
                  <label className='labelModalBaja' htmlFor="labelMotivoBaja">Motivo de Baja:</label>
                  <select onChange={(e)=> onChangeValues(e.target.value, "labelMotivoBaja")} className='selectModalBaja' name="labelMotivoBaja" id="labelMotivoBaja">
                    {
                      motivosEgreso && motivosEgreso.map((item, index)=>{
                        return(
                          <option value={item.iDmotivoEgreso}>{item.motivodeEgreso}</option>
                        )
                      })
                    }
                  </select>
                  
                </div>
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

export default ChildBajaEmpleado