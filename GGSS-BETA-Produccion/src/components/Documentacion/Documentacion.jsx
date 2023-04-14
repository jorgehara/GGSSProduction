import React, { useEffect, useState } from 'react'
import InputButtonLiquidacion from '../Inputs/InputButton/InputButtonLiquidacion'
import InputDate from '../Inputs/InputDate/InputDate'
import TextArea from '../Inputs/TextArea/TextArea'
import EmployeData from '../EmployeData/EmployeData';
import CheckLabel from '../Inputs/CheckLabel/CheckLabel';
import TableBasic1 from '../Tables/TableBasic1';
import ButtonCancelarAceptar from '../Buttons/ButtonCancelarAceptar';
import InputDateDocs from '../Inputs/InputDateDocs/InputDateDocs';
import { useDispatch, useSelector } from 'react-redux';
import { AXIOS_ERROR, SET_LOADING } from '../../redux/types/fetchTypes';
import { addDocumentacionEmpleados, addNewDoc, deleteDocu } from '../../redux/actions/fetchActions';
import axios from 'axios';
import { cleanIdsDoc, deleteDocuEmpleado, getInputValue, getOneDocumento, saveIds } from '../../redux/actions/documentacionActions';
import { classesDateDocs, inputButtonClasess, inputButtonClasessDocumentacion } from '../../classes/classes';
import { GET_INPUT_VALUE } from '../../redux/types/documentacionTypes';
import swal from 'sweetalert';
import { setRefetch } from '../../redux/actions/modalesActions';
import ButtonCallModal from '../ButtonCallModal/ButtonCallModal';
import ArchivosAdjuntos from './ArchivosAdjuntos/ArchivosAdjuntos';
import Buttons from '../Buttons/Buttons';

const Documentacion = ({responses, setResponses, disable, setRefectch, refetch}) => {
    const empleadoUno = useSelector((state)=> state.employeStates.employe);

    const columns = ["Seleccionar" ,"Fecha", "Vencimiento", "Documento", "Liq", "Observaciones", "Incluir Cuota"]
    const dispatch = useDispatch();
    const [ disableI, setDisableI] = useState(true);
    const [ formDocumentacion, setFormDocumentacion ] = useState(responses["formDocumentacion"]);
    const [ body , setBody ] = useState(0);
    const [ nameModal, setNameModal ] = useState({});

    const urlDocPost= `http://54.243.192.82/api/EmpleadosDocumentacion?id=${empleadoUno.iDempleado}`;
    const urlPost = "http://54.243.192.82/api/EmpleadosDocumentacion"
    const documentacionSeleccionada = useSelector((state)=> state.documentacionState.documentacionSeleccionada);
    const urlArchivosAdjuntos = `http://54.243.192.82/api/ArchivosDocumentacionEmpleados/${empleadoUno?.iDempleado}`

    const archivosAdjuntosEmpleado = useSelector((state)=> state.documentacionState.archivosAdjuntosEmpleado);


    function onChangeValues(e, key){
        const newResponse = {...formDocumentacion};
        if(key === "inputDatePresentacion"){
            const inputDate = new Date(e);
            if (inputDate.getFullYear() > 2050) {
              const maxDate = new Date("2050-12-31");
              const formattedMaxDate = maxDate.toISOString().slice(0, 10);
              newResponse.inputDatePresentacion = formattedMaxDate;
              setFormDocumentacion({
                ...newResponse
              });
              return;
            }
          }
          if(key === "inputDateVencimiento"){
            const inputDate = new Date(e);
            if (inputDate.getFullYear() > 2050) {
              const maxDate = new Date("2050-12-31");
              const formattedMaxDate = maxDate.toISOString().slice(0, 10);
              newResponse.inputDateVencimiento = formattedMaxDate;
              setFormDocumentacion({
                ...newResponse
              });
              return;
            }
          }
        newResponse[key] = e;
        setFormDocumentacion({
            ...newResponse
        });
    };
    useEffect(() => {
        setResponses({
          ...responses,
          formDocumentacion
        });      
    },[formDocumentacion]);
    const handleFetchComun = async (url, action) => {
        dispatch({ type: SET_LOADING });
        await axios
          .get(url)
          .then((res) => {
            dispatch(action(res.data));
          })
          .catch((err) => {
            dispatch({ type: AXIOS_ERROR });
          });
      };
    useEffect(()=>{
        //handleFetchComun(urlArchivosAdjuntos, getArAdjuntos);
    },[])
    
    const documentacionEmpleados = useSelector((state)=> state.generalState.documentacionEmpleados);

    const documentaciones = useSelector((state)=> state.documentacionState.domiciliosDelEmpleado);
    const refetching = useSelector((state)=> state.modalState.refetch);
    //const datosFormulario = useSelector((state)=> state.documentacionState.formulario);

    /* const documentacionDelEmpleado = empleadoUno && documentacionEmpleados && documentacionEmpleados.filter((doc)=> {return(doc.idEmpleado === empleadoUno.iDempleado)}); */

    const documentacionDelEmpleado = useSelector((state)=> state.documentacionState.documentacionDelEmpleado);

 

    let bodyPetition = {        
        "fecha": formDocumentacion?.inputDatePresentacion,
        "idEmpleado": empleadoUno.iDempleado,
        "idDocumentacion": Number(formDocumentacion?.inputSelectDocumentacion),
        "rutaAdjunto": "",
        "obs": formDocumentacion?.textAreaDocumentacion,
        "fechaVencimiento": (formDocumentacion?.inputDateVencimiento) ? (formDocumentacion?.inputDateVencimiento) : null,
        "generaLiquidacion": formDocumentacion?.inputCheckLiquidacion,
        "incluirCuotaAlimentaria": formDocumentacion?.inputIncluirCuotaAlim
    }
   

    function sendDataDoc(){
        if(empleadoUno.iDempleado && empleadoUno.iDempleado){
            setBody(((documentacionEmpleados && documentacionEmpleados[documentacionEmpleados.length -1] !== undefined && (documentacionEmpleados[documentacionEmpleados.length -1].idEmpleadoDocumentacion))+1))
            try{
                axios.post(urlPost, bodyPetition)
                .then((res)=>{
                    if(res.status === 200){
                        dispatch(addNewDoc(res.data))
                    setRefectch(!refetch)
                    dispatch(setRefetch(!refetching))
                        return swal({
                            title: "Ok",
                            text: "Documentacion agregada con éxito",
                            icon: "success",
                        })
                    }
                    return;
                })
            }catch(err){
                return swal({
                    title: "Error",
                    text: "Error al crear la Documentacion del Empleado",
                    icon: "error",
                })
            }
        }
        else
        return swal({
            title: "Error",
            text: "Debe seleccionar un Empleado",
            icon: "error",
        })
        
    }

    function deleteData(id){
      console.log("entra con id " + id)
        dispatch(deleteDocuEmpleado(id))
        dispatch(saveIds(id))
    }
    const handleClickClose=(nameModalProp)=>{
        let newState = {...nameModal}
    
        newState[nameModalProp] = false;
        setNameModal(newState);
    }
   

    useEffect(()=>{
        let newResponse = {...formDocumentacion};
        newResponse["inputDatePresentacion"] = "";
        newResponse["inputDateVencimiento"] = "";
        newResponse["inputCheckDocusDate"] = "";
        newResponse["inputSelectDocumentacion"] = "";
        newResponse["textAreaDocumentacion"] = "";
        newResponse["inputCheckLiquidacion"] = "";
        newResponse["inputIncluirCuotaAlim"] = "";
        setFormDocumentacion({
          ...newResponse
        });
      },[documentacionSeleccionada])

console.log(documentacionSeleccionada)
return (
    <div className='container'>
        <div className='row containerContainer'>
            <EmployeData />
        </div>
        <div className='row'>
            <div className='col-xl-12 d-flex flex-row justify-content-start align-items-center'>
                <InputDateDocs nameInput="Fecha Presentación" idInput="inputDatePresentacion" display={false} onChange={onChangeValues} action={GET_INPUT_VALUE} disabled={disable} value={formDocumentacion?.inputDatePresentacion ? formDocumentacion?.inputDatePresentacion : (documentacionSeleccionada?.fecha && documentacionSeleccionada?.fecha.substring(0, documentacionSeleccionada?.fecha.length -9))} />
            </div>
            <div className='col-xl-12'>
                <InputDate clasess={classesDateDocs} disabled={disable} nameInput="Fecha Vencimiento:" disable={disableI} setDisable={setDisableI} idInput="inputDateVencimiento" display={true}  onChange={onChangeValues} action={GET_INPUT_VALUE} actionReset={getInputValue} value={formDocumentacion?.inputDateVencimiento ? formDocumentacion?.inputDateVencimiento : documentacionSeleccionada?.fechaVencimiento} valueCheck={formDocumentacion?.inputCheckDocusDate && formDocumentacion?.inputCheckDocusDate} idInputCheck="inputCheckDocusDate" />
            </div>
            <div className='col-xl-12'>
                <InputButtonLiquidacion
                    clasess={inputButtonClasessDocumentacion}
                    // nameButton="..."
                    nameLabel="Documentación"
                    placeholder="Documentación"
                    array={documentaciones && documentaciones}
                    propArrayOp="documentacion1"
                    propIdOption="idDocumentacion"
                    idInput="inputSelectDocumentacion"
                    onChange={onChangeValues}
                    action={GET_INPUT_VALUE}
                    value={formDocumentacion?.inputSelectDocumentacion && formDocumentacion?.inputSelectDocumentacion}
                    disabled={disable}
                    idSelected={formDocumentacion?.inputSelectDocumentacion ? formDocumentacion?.inputSelectDocumentacion : documentacionSeleccionada?.idDocumentacion}
                />
            </div>
            <div className='col-xl-12'>
                <TextArea 
                disableModal={disable} 
                inputName="Observaciones " 
                onChange={onChangeValues} 
                idInput="textAreaDocumentacion" 
                value={formDocumentacion?.textAreaDocumentacion ? formDocumentacion?.textAreaDocumentacion : documentacionSeleccionada?.obs} 
                disabled={disable} />
            </div>
            <div className='col-xl-12 contDocumentacion'>
                <CheckLabel idInput="inputCheckLiquidacion" nameLabel="Se tiene en cuenta en la Liquidación (Sólo si se cumplen las condiciones necesarias)"  onChange={onChangeValues} action={GET_INPUT_VALUE} value={formDocumentacion?.inputCheckLiquidacion ? formDocumentacion?.inputCheckLiquidacion : documentacionSeleccionada?.generaLiquidacion} disabled={disable} />
            </div>
            <div className='col-xl-12 contDocumentacion'>
                <CheckLabel idInput="inputIncluirCuotaAlim" nameLabel="Incluir en cuota Alimentaria"  onChange={onChangeValues} action={GET_INPUT_VALUE} value={formDocumentacion?.inputIncluirCuotaAlim ? formDocumentacion?.inputIncluirCuotaAlim : documentacionSeleccionada?.incluirCuotaAlimentaria} disabled={disable} />
            </div>
            <div className='col-xl-12 contDocumentacion'>
                <Buttons cancelar="cancelar" aceptar="aceptar" idElimiar={documentacionSeleccionada?.idEmpleadoDocumentacion && documentacionSeleccionada?.idEmpleadoDocumentacion} functionSend={sendDataDoc} functionDelete={deleteData} disabled={disable} />
                <TableBasic1  refetch={refetch} setRefetch={setRefectch} columns={columns} value={documentacionDelEmpleado}  documentaciones={documentaciones} disabled={disable} />
            </div>
            <div className='col-xl-12 contDocumentacion mt-2'>
                <ButtonCallModal disable={disable} esBoton={true} nameModal={nameModal} setNameModal={setNameModal}  nameModalProp="archivosAdjuntos" nameButton="Adjuntar Archivos">
                    <ArchivosAdjuntos 
                    handleClickClose={handleClickClose}
                    nameModal = "Archivos Adjuntos"
                    nameModalProp="archivosAdjuntos"
                    onChangeValues={onChangeValues}
                    formDocumentacion={formDocumentacion}
                    refetch={refetch} 
                    setRefetch={setRefectch}
                    
                    />
                </ButtonCallModal>
            </div>
        </div>
    </div>
)
}

export default Documentacion