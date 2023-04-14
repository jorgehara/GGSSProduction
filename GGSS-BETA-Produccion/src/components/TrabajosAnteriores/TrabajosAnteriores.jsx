import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { addTrabajoAnterior, deleteOneTrabajo, getInput, getTrabajosAnteriores, saveId } from '../../redux/actions/trabajosAnterioresActions';
import { AXIOS_ERROR, SET_LOADING } from '../../redux/types/fetchTypes';
import { GET_INPUT } from '../../redux/types/trabajosAnteriores';
import EmployeData from '../EmployeData/EmployeData';
import InputTextTrabajos from '../Inputs/InputTextTrabajos/InputTextTrabajos';
import TableTrabajosAnteriores from '../Tables/TableTrabajosAnteriores';
import "./TrabajosAnteriores.css";

const TrabajosAnteriores = ({responses, setResponses, setRefetch, refetch,disable}) => {
    const [checked , setChecked] = useState(false);
    const [disabled , setDisabled] = useState(false);
    const [ modificar, setModificar ] = useState(false);
    const [ formTrabajosAnteriores, setFormTrabajosAnteriores ] = useState(responses["formTrabajosAnteriores"]);
    const dispatch = useDispatch();

    const trabajoAnterior = useSelector((state)=> state.trabajosAnteriores.trabajoAnterior);


    const handleFetch=(url, action )=>{
    dispatch({type: SET_LOADING});
        axios.get(url)
        .then((res)=>{
        dispatch( action(res.data.result));
        })
        .catch((err)=>{
        dispatch({type:AXIOS_ERROR});
        })
    }
    
    function onChangeValues(e, key){
        const newResponse = {...formTrabajosAnteriores};
        if(key === "idDateDesde"){
            const inputDate = new Date(e);
            if (inputDate.getFullYear() > 2050) {
              const maxDate = new Date("2050-12-31");
              const formattedMaxDate = maxDate.toISOString().slice(0, 10);
              newResponse.idDateDesde = formattedMaxDate;
              setFormTrabajosAnteriores({
                ...newResponse
              });
              return;
            }
          }
          if(key === "idDateHasta"){
            const inputDate = new Date(e);
            if (inputDate.getFullYear() > 2050) {
              const maxDate = new Date("2050-12-31");
              const formattedMaxDate = maxDate.toISOString().slice(0, 10);
              newResponse.idDateHasta = formattedMaxDate;
              setFormTrabajosAnteriores({
                ...newResponse
              });
              return;
            }
          }
        newResponse[key] = e;
        setFormTrabajosAnteriores({
            ...newResponse
        });
    };


    useEffect(() => {
    setResponses({
        ...responses,
        formTrabajosAnteriores
    });      
},[formTrabajosAnteriores]);
    
    

    const estado = useSelector((state)=> state.trabajosAnteriores.formulario);

    const empleadoUno = useSelector((state)=> state.employeStates.employe);
    const trabajosAnteriores = useSelector((state)=> state.trabajosAnteriores.trabajosAnteriores);
    const valueIdTrabajoAnterior = useSelector((state)=> state.trabajosAnteriores.idTrabajoAnterior);    

    const columns = ["Seleccionar" , "Desde" , "Hasta", "Descripción"];
    const urlTrabajosAnteriores = `http://54.243.192.82/api/TrabajosAnteriores?IdTrabajoAnterior=0&IdEmpleado=${empleadoUno.iDempleado}&Desde=${formTrabajosAnteriores?.idDateDesde}&Hasta=${formTrabajosAnteriores?.idDateHasta}&Actualidad=${formTrabajosAnteriores?.idCheckTrabajos ? formTrabajosAnteriores?.idCheckTrabajos : false}&Descripcion=${formTrabajosAnteriores?.idDescripcionTrabajos}`;
    const urlTrabajosAnterioresDelete = "http://54.243.192.82/api/TrabajosAnteriores";

    const trabajosAnterioresDelEmpleado = trabajosAnteriores && trabajosAnteriores.filter((trabajo)=> trabajo.idEmpleado === empleadoUno.iDempleado);

    const bodyPetition = {
        "idEmpleado": empleadoUno.iDempleado,
        "desde": formTrabajosAnteriores?.idDateDesde && formTrabajosAnteriores?.idDateDesde,
        "hasta": formTrabajosAnteriores?.idDateHasta && formTrabajosAnteriores?.idDateHasta,
        "descripcion": formTrabajosAnteriores?.idDescripcionTrabajos && formTrabajosAnteriores?.idDescripcionTrabajos,
        "actualidad": formTrabajosAnteriores?.idCheckTrabajos && formTrabajosAnteriores?.idCheckTrabajos
    }  

    const onCheckActualidad=(e, key, idValues)=>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        
        if(!checked){
            setDisabled(true);
            const newRespons = {...formTrabajosAnteriores}
            newRespons[idValues] = "";
            newRespons[key] = e;
            setFormTrabajosAnteriores({
                ...newRespons
            });
            return;
        }
        const newRespons = {...formTrabajosAnteriores}
        setDisabled(false);
        newRespons[key] = e;
            setFormTrabajosAnteriores({
                ...newRespons
            });
            return;
        }

        const ids = useSelector((state)=> state.trabajosAnteriores.ids);


    



    const sendData=async()=>{
        try{
            //LOADING
            axios.post(urlTrabajosAnteriores, bodyPetition)
            .then((res)=>{
                if(res.status === 200){
                    //loading false
                    dispatch(addTrabajoAnterior(res.data)) //crear la accion para agregar un nuevo trabajo.
                    handleFetch(urlTrabajosAnteriores, getTrabajosAnteriores);
                    swal({
                        title: "Trabajo anterior Agregado",
                        text: "Trabajo anterior agregado con éxito",
                        icon: "success",
                    })
                }
            })
        }catch(err){
            //error true
            swal({
                title: "Error",
                text: err.toString(),
                icon: "error",
            })
        }
    }
    const deleteTRabajoAnterior= async (id)=>{
        
        dispatch(deleteOneTrabajo(Number(id)));
        dispatch(saveId(id))
        
    }


  return (
    <div className='container-flex p-0'>
        <div className="container-flex m-0 p-0">
            <EmployeData />
        </div>

        <div className="container-flex  ">


        {/* <div className='row '> */}
            <div className='col-xl-4 cont-Desde'>
                <div className='d-flex flex-row justify-content-start align-items-center mt-2 '>
                    <label htmlFor="idDateDesde">Desde:</label>
                    <input type="date" max="2050-12-31" disabled={disable} onChange={(e)=> onChangeValues(e.target.value, "idDateDesde")} value={ modificar ? (formTrabajosAnteriores?.idDateDesde ? formTrabajosAnteriores?.idDateDesde : trabajoAnterior?.desde.substring(0, trabajoAnterior?.desde.length - 9)) : formTrabajosAnteriores?.idDateDesde && formTrabajosAnteriores?.idDateDesde} name="idDateDesde" id="idDateDesde" className='dateTrabajos '/>
                </div>
            </div>        
        </div>
        <div className='row px-3'>
            <div className='col-xl-4'>
                <div className='d-flex flex-row justify-content-start align-items-center mt-2 '>
                    <label htmlFor="idDateDesde">Hasta:</label>
                    <input type="date" max="2050-12-31" onChange={(e)=> onChangeValues(e.target.value, "idDateHasta")} disabled={disable ? disable : disabled} value={modificar ? (checked ? null : formTrabajosAnteriores?.idDateHasta ? formTrabajosAnteriores?.idDateHasta : (trabajoAnterior?.hasta &&trabajoAnterior?.hasta.substring(0, trabajoAnterior?.desde.length - 9))) : formTrabajosAnteriores?.idDateHasta && formTrabajosAnteriores?.idDateHasta} name="idDateHasta" id="idDateHasta" className='dateTrabajos2 '/>
                    <input type="checkbox" disabled={disable} checked={modificar ? (checked ? checked : trabajoAnterior?.actualidad) : checked && checked} name="idCheckTrabajos" id="idCheckTrabajos" className='checkTrabajos' onChange={(e)=>{ setChecked(!checked); onCheckActualidad(e.target.checked , "idCheckTrabajos", "idDateHasta")}} />
                    <label htmlFor="idDateDesde" className='labelTrabajos'>Hasta la Actualidad:</label>
                </div>
            </div>        
        </div>
        <div className='row px-3'>
            <InputTextTrabajos cancelar="cancelar" aceptar="acpetar" disable={disable} nameLabel="Descripción" inputId="idDescripcionTrabajos" onChange={onChangeValues} value={modificar ? (formTrabajosAnteriores?.idDescripcionTrabajos ? formTrabajosAnteriores?.idDescripcionTrabajos : trabajoAnterior?.descripcion) : formTrabajosAnteriores?.idDescripcionTrabajos && formTrabajosAnteriores?.idDescripcionTrabajos} action={GET_INPUT} onSend={sendData} onDelete={deleteTRabajoAnterior} id={valueIdTrabajoAnterior} />
        </div>
        <div className='row px-3'>
            <TableTrabajosAnteriores disable={disable} setModificar={setModificar} nameLabel="Historial:" columns={columns} array={trabajosAnterioresDelEmpleado}/>
        </div>
    </div>
  )
}

export default TrabajosAnteriores