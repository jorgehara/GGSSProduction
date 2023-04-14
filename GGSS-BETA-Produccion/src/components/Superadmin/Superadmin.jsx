import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Superadmin.css";

const Superadmin = () => {
    const [ superadminValues, setSuperadminValues ] = useState({});
    const datosPersonalesState = useSelector((state)=> state.generalState);
    const parSueldos = useSelector((state)=> state.generalState.parSueldos);
    const tiposDocumento = useSelector((state)=> state.generalState.tiposDocumento);

    const [ modificar , setModificar ] = useState({
        empleados : true,
        fotoEmpleado : true,
        diasContrato : true,
        imgAdjuntos : true,
        archivos : true
    });
    function onChangeValues(e, key){
        let newState = {...superadminValues};
        newState[key] = e;
        setSuperadminValues({
            ...newState
        })
    }
   
    
    async function sendDataSuperadmin(){
        try{

        }catch(err){

        }
    }
    //Ahora traigo los datos desde Datos PErsonales pero deberia tal vez hacer un fetch aca en el componente por si luegi
    //se requiere que se inicie directamente de superadmin si es que tiene este permiso.

    //Por otro lado luego habria que hacer el endpoint de PArSueldos para poder traer los datos y comparar con lo que
    //se selecciona aca y muestre siempre lo que esta selecionado, aparte para luego mostrar lo de aqui en los inputs.
  return (
    <div className='container-flex p-0 m-0 contenedorSuperadmin'>
        <fieldset className="border fieldSetSuper" >
                <legend className="float-none w-auto contenedorFieldSet">
                    <i className="fs-5 bi-hammer "></i><span className="ms-1 d-none d-sm-inline colorFont">Superadmin</span>
                </legend> 
                <div className='row p-4'>
                    <div className='col-xl-7 border border-2 p-2' >
                        <h2>Empleados</h2>
                        <div className='d-flex flex-column justify-content-center align-items-start'>
                            <label htmlFor="estadoAltaEmpleado">Estado Predeterminado Alta de un Empleado:</label>
                            <select onChange={(e)=> onChangeValues(e.target.value, "estadoAltaEmpleado")} disabled={modificar.empleados} className="formulario-input-Estado form-select ml-0 px-0" defaultValue={parSueldos[0]?.estadoAltaEmpleado} id="estadoAltaEmpleado" name="estadoAltaEmpleado">
                            <option value="">Seleccionar</option> 
                            {
                                datosPersonalesState.estados && datosPersonalesState.estados.map((item, index)=>{                                  
                                    return(
                                        (Number((parSueldos[0].estadoAltaEmpleado)) === Number((item.idEstado))) ? <option key={index} selected value={parSueldos.estadoAltaEmpleado}>{item.nombreEstado}</option>
                                        :
                                        <option key={index} value={item.idEstado}>{item.nombreEstado}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-start'>
                            <label htmlFor="estadoBajaEmpleado">Estado Predeterminado Baja de un Empleado:</label>
                            <select onChange={(e)=> onChangeValues(e.target.value, "estadoBajaEmpleado")} disabled={modificar.empleados} className="formulario-input-Estado form-select ml-0 px-0" defaultValue={parSueldos[0]?.estadoBajaEmpleado} id="estadoBajaEmpleado" name="estadoBajaEmpleado">
                            <option value="">Seleccionar</option> 
                            {
                                datosPersonalesState.estados && datosPersonalesState.estados.map((item, index)=>{
                                   
                                    return(
                                        (Number((parSueldos[0].estadoBajaEmpleado)) === Number((item.idEstado))) ? <option selected key={index} value={parSueldos[0].estadoBajaEmpleado}>{item.nombreEstado}</option> 
                                        :
                                        <option key={index} value={item.idEstado}>{item.nombreEstado}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-start'>
                            <label htmlFor="IdTipoDocumentoPredeterminado">Tipo de Documento Predeterminado:</label>
                            <select onChange={(e)=> onChangeValues(e.target.value, "IdTipoDocumentoPredeterminado")}  disabled={modificar.empleados} className="formulario-input-Estado form-select ml-0 px-0" defaultValue={parSueldos[0]?.idTipoDocumentoPredeterminado} id="IdTipoDocumentoPredeterminado" name="IdTipoDocumentoPredeterminado">
                            <option value="">Seleccionar</option> 
                            {
                                datosPersonalesState.tiposDocumento && datosPersonalesState.tiposDocumento.map((item,index)=>{
                                    return(
                                        (Number((parSueldos[0].idTipoDocumentoPredeterminado)) === Number((item.iDtipoDocumento))) ? <option selected key={index} value={parSueldos[0].idTipoDocumentoPredeterminado}>{item.tipoDocumento}</option>
                                        :
                                        <option key={index} value={item.iDtipoDocumento}>{item.tipoDocumento}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-start'>
                            <label htmlFor="IdTipoDocumentoSinDatos">Tipo de Documento "Sin Datos":</label>
                            <select onChange={(e)=> onChangeValues(e.target.value, "IdTipoDocumentoSinDatos")}  disabled={modificar.empleados} className="formulario-input-Estado form-select ml-0 px-0" defaultValue={parSueldos[0]?.idTipoDocumentoSinDatos} id="IdTipoDocumentoSinDatos" name="IdTipoDocumentoSinDatos">
                            <option value="">Seleccionar</option> 
                            <option value="0">(Sin Datos)</option> 
                            {
                                datosPersonalesState.tiposDocumento && datosPersonalesState.tiposDocumento.map((item,index)=>{
                                    return(
                                        (Number((parSueldos[0].idTipoDocumentoSinDatos)) === Number((item.iDtipoDocumento))) ? <option selected key={index} value={parSueldos[0].idTipoDocumentoSinDatos}>{item.tipoDocumento}</option>
                                        :
                                        <option key={index} value={item.iDtipoDocumento}>{item.tipoDocumento}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-start'>
                            <label htmlFor="IdPaisPredeterminado">País Predeterminado:</label>
                            <select onChange={(e)=> onChangeValues(e.target.value, "IdPaisPredeterminado")}  disabled={modificar.empleados} className="formulario-input-Estado form-select ml-0 px-0" defaultValue={parSueldos[0]?.idPaisPredeterminado} id="IdPaisPredeterminado" name="IdPaisPredeterminado">
                            <option value="">Seleccionar</option> 
                            {
                                datosPersonalesState.paises && datosPersonalesState.paises.map((item,index)=>{
                                    return(
                                        (Number((parSueldos[0].idPaisPredeterminado)) === Number((item.idPais))) ? <option selected key={index} value={parSueldos[0].idPaisPredeterminado}>{item.nombrePais}</option>
                                        :
                                        <option key={index} value={item.idPais}>{item.nombrePais}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className='d-flex flex-row justify-content-end align-items-start'>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, empleados : false})}>Modificar</button>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, empleados : true})}>Aceptar</button>
                        </div>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2 contenedorFieldSet">
                                <i className="fs-5 bi-image "></i><span className="ms-1 d-none d-sm-inline colorFont">Foto del Empleado</span>
                            </legend> 
                            <div className='d-flex flex-row justify-content-start align-items-center'>
                                <label htmlFor="">Dimensiones Máximas</label>
                                <input onChange={(e)=> onChangeValues(e.target.value, "MaxAnchoFotoEmpleado")} disabled={modificar.fotoEmpleado} value={ modificar.fotoEmpleado ? parSueldos[0]?.maxAnchoFotoEmpleado : superadminValues?.MaxAnchoFotoEmpleado} className='inputAnchoAlto' type="text" name="MaxAnchoFotoEmpleado" id="MaxAnchoFotoEmpleado" />
                                <span>X</span>
                                <input onChange={(e)=> onChangeValues(e.target.value, "MaxAltoFotoEmpleado")} disabled={modificar.fotoEmpleado} value={ modificar.fotoEmpleado ? parSueldos[0]?.maxAltoFotoEmpleado : superadminValues?.MaxAltoFotoEmpleado} className='inputAnchoAlto' type="text" name="MaxAltoFotoEmpleado" id="MaxAltoFotoEmpleado" />
                                <span>pixels (Ancho x Alto)</span>
                            </div>
                            <div className='d-flex flex-row justify-content-end align-items-start'>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, fotoEmpleado : false})}>Modificar</button>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, fotoEmpleado : true})}>Aceptar</button>
                        </div>
                        </fieldset>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2 contenedorFieldSet">
                                <i className="fs-5 bi-calendar2-date "></i><span className="ms-1 d-none d-sm-inline colorFont">Días para la finalización del Contrato</span>
                            </legend> 
                            <div className='d-flex flex-row justify-content-start align-items-center'>
                                <label className='labelDiasConotrato' htmlFor="DiasFinalizacionContrato">A partir de</label>
                                <input onChange={(e)=> onChangeValues(e.target.value, "DiasFinalizacionContrato")} disabled={modificar.diasContrato} value={ modificar.fotoEmpleado ? parSueldos[0]?.diasFinalizacionContrato : superadminValues?.DiasFinalizacionContrato}   className='inputDiasConotrato' type="text" name="DiasFinalizacionContrato" id="DiasFinalizacionContrato" />
                                <span>días se mostrara un mensaje indicando los dias restantes del contrato.</span>
                            </div>
                            <div className='d-flex flex-row justify-content-end align-items-start'>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, diasContrato : false})}>Modificar</button>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, diasContrato : true})}>Aceptar</button>
                        </div>
                        </fieldset>
                    </div>
                    <div className='col-xl-5 border border-2'>
                    <h2>Adjuntos</h2>
                    <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2 contenedorFieldSet">
                                <i className="fs-5 bi-image "></i><span className="ms-1 d-none d-sm-inline colorFont">Imágenes</span>
                            </legend> 
                            <div className='d-flex flex-row justify-content-start align-items-center'>
                                <label className='labelAdjuntos' htmlFor="MaxAnchoImagenAdjunto">Dimensiones Máximas</label>
                                <input onChange={(e)=> onChangeValues(e.target.value, "MaxAnchoImagenAdjunto")} disabled={modificar.imgAdjuntos} value={ modificar.fotoEmpleado ? parSueldos[0]?.maxAnchoImagenAdjunto : superadminValues?.MaxAnchoImagenAdjunto} className='inputAnchoAlto' type="text" name="MaxAnchoImagenAdjunto" id="MaxAnchoImagenAdjunto" />
                                <span>X</span>
                                <input onChange={(e)=> onChangeValues(e.target.value, "MaxAltoImagenAdjunto")} disabled={modificar.imgAdjuntos} value={ modificar.fotoEmpleado ? parSueldos[0]?.maxAltoImagenAdjunto : superadminValues?.MaxAltoImagenAdjunto} className='inputAnchoAlto' type="text" name="MaxAltoImagenAdjunto" id="MaxAltoImagenAdjunto" />
                                <span>pixels (Ancho x Alto)</span>
                            </div>
                            <div className='d-flex flex-row justify-content-start align-items-center'>
                                <label className='labelAdjuntos' htmlFor="">Resolución Máxima</label>
                                <input onChange={(e)=> onChangeValues(e.target.value, "MaxResImagenAdjunto")} disabled={modificar.imgAdjuntos} value={ modificar.fotoEmpleado ? parSueldos[0]?.maxResImagenAdjunto : superadminValues?.MaxResImagenAdjunto}  className='inputAnchoAlto' type="text" name="MaxResImagenAdjunto" id="MaxResImagenAdjunto" />                                
                            </div>
                            <div className='d-flex flex-row justify-content-end align-items-start'>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, imgAdjuntos : false})}>Modificar</button>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, imgAdjuntos : true})}>Aceptar</button>
                        </div>
                        </fieldset>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2 contenedorFieldSet">
                                <i className="fs-5 bi-folder2-open "></i><span className="ms-1 d-none d-sm-inline colorFont">Archivos</span>
                            </legend> 
                            <div className='d-flex flex-row justify-content-start align-items-center'>
                                <label className='labelAdjuntos' htmlFor="MaxSizeArchivoAdjunto">Tamaño Máximo</label>
                                <input onChange={(e)=> onChangeValues(e.target.value, "MaxSizeArchivoAdjunto")} disabled={modificar.archivos} value={ modificar.fotoEmpleado ? parSueldos[0]?.maxSizeArchivoAdjunto : superadminValues?.MaxSizeArchivoAdjunto} className='inputAnchoAlto' type="text" name="MaxSizeArchivoAdjunto" id="MaxSizeArchivoAdjunto" />  <span>KB</span>                              
                            </div>
                            <div className='d-flex flex-row justify-content-end align-items-start'>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, archivos : false})}>Modificar</button>
                            <button className='btn btn-outline-danger btn-sm m-1' onClick={()=> setModificar({...modificar, archivos : true})}>Aceptar</button>
                        </div>
                        </fieldset>
                    </div>
                </div>  
        </fieldset>
    </div>
  )
}

export default Superadmin