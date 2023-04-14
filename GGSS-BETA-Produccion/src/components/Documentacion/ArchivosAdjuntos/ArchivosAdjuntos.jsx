import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizaDeleteArchivo, actualizaUpdateArchivo, addNewArchivoEmp, archivoDocSelected, archivosDocEmpleado } from '../../../redux/actions/fetchActions';
import InputForm from '../../Inputs/InputForm/InputForm';
import TextArea from '../../Inputs/TextArea/TextArea';
import "./ArchivosAdjuntos.css";
import swal from 'sweetalert';


const ArchivosAdjuntos = ({handleClickClose,disabled, nameModalProp, transition, nameModal, disableModalButtons, setDisableMOdal, setDisableModalButtons, onChangeValues, formDocumentacion, setRefetch, refetch}) => {
    const [file, setFile] = useState(null);
    const [fileArray, setFileArray] = useState(null);
    const [fileSize, setFileSize] = useState(0);
    const [ jsonArray , setJsonArray ] = useState(null);
    const [rutaImagen, setRutaImagen] = useState("");
    const [nombreArchivo, setNombreArchivo] = useState("fotoAdjunta.png");
    const [fileBase64, setFileBase64] = useState('');
    const [reload, setReload] = useState(false);
    const [ modificar, setModificar ] = useState(false);
    const [disableButtons, setDisableButtons] = useState(true)
   

    const dispatch = useDispatch();
    const archivosAdjuntos = useSelector((state)=> state.generalState.archivosAdjuntos);
    const documentacionSeleccionada = useSelector((state)=> state.documentacionState.documentacionSeleccionada);
    const archivoDocumentacionEmpleado = useSelector((state)=> state.generalState.archivosDocEmpleado);
    const empleadoUno = useSelector((state)=> state.employeStates.employe);
    const archivoSelected = useSelector((state)=> state.generalState.archivoDocSelected);
    const urlArchiviosDocumentacion = "http://54.243.192.82/api/ArchivosDocumentacionEmpleados/sp_ArchivosDocumentacionEmpleadosDatos"
    const bodyGetArchivosDoc = {
        "idArchivoDocumentacionEmpleado": 0,
        "idEmpleadoDocumentacion": documentacionSeleccionada?.idEmpleadoDocumentacion,
        "modo": 4,
        "idEmpleado": empleadoUno?.iDempleado
      }
      const bodyCreateArchivoDocEmpleado = {
        "idArchivoDocumentacionEmpleado": 0,
        "idEmpleadoDocumentacion": documentacionSeleccionada?.idEmpleadoDocumentacion,
        "archivo": fileBase64,
        "nombreOriginal": file?.name,
        "nombreArchivo": file?.name,
        "esImagen": true,
        "obs": formDocumentacion?.obsArchivoDocEmpleado
      }
      const bodyUpdateArchivoDocEmpleado = {
        "idArchivoDocumentacionEmpleado": archivoSelected?.idArchivoDocumentacionEmpleado,
        "idEmpleadoDocumentacion": documentacionSeleccionada?.idEmpleadoDocumentacion,
        "archivo": fileBase64 ? fileBase64 : archivoSelected?.archivo,
        "nombreOriginal": file ? file?.name : archivoSelected?.nombreOriginal,
        "nombreArchivo": file ? file?.name : archivoSelected?.nombreArchivo,
        "esImagen": true,
        "obs": formDocumentacion?.obsArchivoDocEmpleado
      }
      const bodyToUpdate = {...bodyCreateArchivoDocEmpleado, idArchivoDocumentacionEmpleado : ((archivosAdjuntos &&
        archivosAdjuntos[archivosAdjuntos.length - 1] !== undefined &&
        archivosAdjuntos[archivosAdjuntos.length - 1].idArchivoDocumentacionEmpleado) + 1) };
        
      
 /*    (archivoDocumentacionEmpleado &&
        archivoDocumentacionEmpleado[archivoDocumentacionEmpleado.length - 1] !== undefined &&
        archivoDocumentacionEmpleado[archivoDocumentacionEmpleado.length - 1].idArchivoDocumentacionEmpleado) + 1 */
    async function sendDataArchivos(type, id){
        if(documentacionSeleccionada){
            switch(type){
                case "modify" : 
                    try{
                        if(modificar){
                            await axios.post("http://54.243.192.82/api/ArchivosDocumentacionEmpleados", bodyUpdateArchivoDocEmpleado)
                            .then((res)=>{
                               
                                if(res.status ===200){

                                    dispatch(actualizaUpdateArchivo(bodyUpdateArchivoDocEmpleado))

                                    setReload(!reload)
                                    setDisableButtons(true)
                                    setModificar(false)
                                    return swal({
                                        title : "Ok",
                                        text : "Archivo actualizado con éxito",
                                        icon : "success"
                                    });
                                    
                                }
                            })
                            }else{
                                await axios.post("http://54.243.192.82/api/ArchivosDocumentacionEmpleados", bodyCreateArchivoDocEmpleado)
                                .then((res)=>{
                                    if(res.data.statusCode ===200){
                                        dispatch(addNewArchivoEmp(bodyToUpdate))
                                        setReload(!reload)
                                        setDisableButtons(true)
                                        return swal({
                                            title : "Ok",
                                            text : "Archivo guardado con éxito",
                                            icon : "success"
                                        });
                                        
                                    }
                                })
                        }
                        
                    }catch(err){
                        return swal({
                            title : "Error",
                            text : "Error al crear/actualizar el Archivo" + err,
                            icon : "error"
                        });
                    }
                
                break;
                case "delete" : 
                    try{
                        swal({
                              title: "¿Desea eliminar el Archivo Adjunto?",
                              text: "Si acepta, el detalle se eliminará de la Base de Datos",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            })
                            .then(async (willDelete) => {
                              if (willDelete) {
                                await axios.delete(`http://54.243.192.82/api/ArchivosDocumentacionEmpleados/${id}`)
                                .then((res)=>{
                                    if(res.data.statusCode ===200){
                                        dispatch(actualizaDeleteArchivo(id))
                                        setReload(!reload)
                                        setModificar(false)
                                        setDisableButtons(true)
                                        return swal({
                                            title : "Ok",
                                            text : "Archivo eliminado con éxito",
                                            icon : "success"
                                        });
                                    }
                                })
                                
                              } else {
                                return swal("Cancelado, puede seguir operando");
                              }
                            });                        
                    }catch(err){
                        return swal({
                            title : "Error",
                            text : "Error al eliminar el Archivo" + err,
                            icon : "error"
                        });
                    }
                
                break;
                default : {
                    try{
                        await axios.post("http://54.243.192.82/api/ArchivosDocumentacionEmpleados", bodyCreateArchivoDocEmpleado)
                        .then((res)=>{
                            if(res.data.statusCode ===200){
                                dispatch(addNewArchivoEmp(bodyToUpdate))
                                setReload(!reload)
                                return swal({
                                    title : "Ok",
                                    text : "Archivo guardado con éxito",
                                    icon : "success"
                                });
                                
                            }
                        })
                    }catch(err){
                        return swal({
                            title : "Error",
                            text : "Error al guardar el Archivo" + err,
                            icon : "error"
                        });
                    }
                }
            }
            
        }
    }

    async function getArchivosDocumentacionEmpleado(){
        if(documentacionSeleccionada && empleadoUno){
            try{
                axios.post(urlArchiviosDocumentacion, bodyGetArchivosDoc)
                .then((res)=>{
                    if(res.status === 200){
                        dispatch(archivosDocEmpleado(res.data.result));
                    }
                })
            }catch(err){

            }
        }
    }
   
    
        useEffect(()=>{
            getArchivosDocumentacionEmpleado();
        },[empleadoUno?.iDempleado, reload])

      const handleLoade = (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();

        let base64 = btoa(reader.result);

       
          setFileArray(base64)
        
      };
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64 = reader.result.toString();
            const base64Content = base64.split(";base64,").pop();
            resolve(base64Content);
          };
          reader.onerror = (error) => reject(error);
        });
      }
      
      function handleLoad(e) {
        setFile(e.target.files[0]);
        const file = e.target.files[0];
        getBase64(file).then((base64) => {
        setFileBase64(base64);
        });
      }
     
      //aca tomamos el valor en KB del tamaño del archivo, hay que hacer una validacion para que cuando sea mayor al valor otorgado por
      //el superadmin, no lo deje cargar.
      //A su vez estamos convirtiendolo en array de bytes, no se si de esta forma hay que enviarlo o como binario
      useEffect(()=>{
            setFileSize(Number(file?.size) / 1024);
            toJsonByteArray(fileArray);
      },[file])

      function toJsonByteArray(array){
        const encoder = new TextEncoder();
        const jsonByteArray = encoder.encode(JSON.stringify(array));
        setJsonArray(jsonByteArray);
      }
      

      function getMimeType(nombreArchivo) {
        const extension = nombreArchivo.split(".").pop();
        switch (extension) {
          case "pdf":
            return "application/pdf";
          case "png":
            return "image/png";
          case "jpg":
          case "jpeg":
            return "image/jpeg";
          // Agregar otros tipos MIME según sea necesario
          default:
            throw new Error("Tipo de archivo no compatible");
        }
      }
      function handleTableRowClick(e) {
        const fileName = e.currentTarget.querySelectorAll('td')[0].innerText;
        const inputFile = document.getElementById('inputFile');
        inputFile.value = fileName;
      }
      const inputRef = useRef(null);

      function handleLoader(event) {
        const fileName = event.target.files[0].name;
        inputRef.current.value = fileName;
      }
      
  return (
    <section className={transition ? 'transitionClassUp' : ' transitionClassneDone '} >
        <div className='cortina'></div>
    <div className='modalBodyClass ' >
        <div className="row w-100 titleModalClass">
          <div className="d-flex flex-row justify-content-between align-items-center">
          <p className="h3"><ins>{nameModal}</ins></p>
            <button
              className="btn btn-outline-danger text-white fs-6 btn-md buttonModal border border-white"
              onClick={() => {
                handleClickClose(nameModalProp);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="row p-2 w-100">
            <div className='col-xl-12 col-lg-12 col-md-12 overflow-scroll rowTAbles'>
                {
                    
                    <table className="table table-danger  w-100">
                        <thead>
                            <tr>
                                <th>
                                    Seleccionar
                                </th>
                                <td>
                                    Nombre
                                </td>
                                <td>
                                    Observación
                                </td>                       
                            </tr>
                        </thead>
                        <tbody className="table-group-divider" id="cuerpodetabla">
                    
                            
                                {
                                    archivoDocumentacionEmpleado && archivoDocumentacionEmpleado.map((item)=>{
                                        return(
                                            <tr className="" onClick={(e)=>handleTableRowClick(e)}>
                                                <th scope="row"> 
                                                    <input disabled={!disableButtons} type="radio" name="seleccionar" id="seleccionar" onClick={(e)=> {dispatch(archivoDocSelected(item)); }} /> 
                                                </th>
                                                <td scope="row">
                                                    {item?.nombreArchivo}
                                                </td>
                                                <td>
                                                    {item?.obs}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                                    
                            
                        </tbody>
                    </table>
                }
            </div>
        </div>
        <div className='row w-100 p-1'>
            <div className='col-xl-7 col-lg-7 col-md-12'>
                <button disabled={!disableButtons} onClick={()=>setDisableButtons(false)}  className='btn btn-dark btn-sm m-1'>
                    Agregar
                </button>
                <button disabled={!disableButtons} onClick={()=> {
                    setModificar(true); 
                    setDisableButtons(false)
                    if(!archivoSelected){
                        return swal({
                            title : "Error",
                            text : "Debe seleccionar un Archivo Adjunto",
                            icon : "error"
                        });
                    }
                    }} className='btn btn-dark btn-sm m-1'>
                    Modificar
                </button>
                <button disabled={!disableButtons} onClick={()=>sendDataArchivos("delete", archivoSelected?.idArchivoDocumentacionEmpleado)} className='btn btn-dark btn-sm m-1'>
                    Eliminar
                </button>
            </div>
            <div className='col-xl-5 col-lg-5 col-md-12 d-flex flex-row-reverse'>
                {
                    archivoSelected?.idArchivoDocumentacionEmpleado && (
                        <a  className='btn btn-dark btn-sm m-1' href={`data:${getMimeType(archivoSelected?.nombreOriginal)};base64,${archivoSelected?.archivo}`} target="_blank" rel="noreferrer">
                          Ver
                        </a>
                      )
                }
            </div>
        </div>
        <div className='row border border-3 m-2 p-1 rowModalDocu'>
            <div className='col-xl-12'>
                <input disabled={disableButtons} onChange={(e)=>handleLoad(e)} type="file" className='inputFile' name="inputFile" id="inputFile" ref={inputRef} />
                <label className='labelforinput' htmlFor="inputFile">{archivoSelected ? archivoSelected?.nombreOriginal : file?.name}</label>
            </div>
            <div className='col-xl-12'>
                <InputForm disabled={disableButtons} idInput="nombreAdjunto" nameLabel="Nombre" value={modificar ? archivoSelected?.nombreOriginal : (file ? file?.name : null)} />
            </div>
            <TextArea disableModal={disableButtons}  onChange={onChangeValues} idInput="obsArchivoDocEmpleado" value={formDocumentacion?.obsArchivoDocEmpleado} />
            <div className='col-xl-12 d-flex flex-row-reverse'>
                <button disabled={disableButtons} onClick={()=> sendDataArchivos("modify")} className='btn btn-dark m-1'>
                    Aceptar
                </button>
                <button disabled={disableButtons} onClick={()=> setDisableButtons(true)} className='btn btn-dark m-1'>
                    Cancelar
                </button>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ArchivosAdjuntos