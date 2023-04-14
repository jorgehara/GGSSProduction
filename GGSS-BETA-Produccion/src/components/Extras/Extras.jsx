import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { classesTxtAreaExtras, inputButtonClasessExtras, inputButtonClasessExtrasAfectaciones, inputButtonClasessExtrasInstrum } from '../../classes/classes'
import { deleteDatoExtraEmpl, saveIdDe } from '../../redux/actions/extrasActions';
import { addDatosExtras, addInstrumLegales, addOneDatoExtra } from '../../redux/actions/fetchActions';
import { GET_INPUT_VALUES_EXTRAS } from '../../redux/types/extrasTypes';
import { AXIOS_ERROR, SET_LOADING } from '../../redux/types/fetchTypes';
import ButtonCancelarAceptar from '../Buttons/ButtonCancelarAceptar';
import Buttons from '../Buttons/Buttons';
import EmployeData from '../EmployeData/EmployeData'
import CheckLabel from '../Inputs/CheckLabel/CheckLabel';
import InputButtonLiquidacion from '../Inputs/InputButton/InputButtonLiquidacion'
import InputDate from '../Inputs/InputDate/InputDate';
import TextArea from '../Inputs/TextArea/TextArea';
import TableExtras from '../Tables/TableExtras';
import "./Extras.css";

const Extras = ({responses, setResponses, disable, setRefetch, refetch}) => {

    const columns = ["Seleccionar","Fecha", "Descripción", "Observaciones"]
    const dispatch = useDispatch();
    const [ formDatosExtras, setFormDatosExtras ] = useState(responses["formDatosExtras"]);
    const deshabilitar = useSelector((state)=> state.employeStates.disable);
    const empleadoUno = useSelector((state) => state.employeStates.employe);
    const datosExtras = useSelector((state)=> state.generalState.datosExtras);
    const instrumLegales = useSelector((state)=> state.generalState.instrumLegales);
    const datoExtraSelected = useSelector((state)=> state.extrasState.datoExtra);
    //const datosExtraEmpleado = useSelector((state)=>state.generalState.datosExtrasPorEmpleadosSelect);
    const datosExtraEmpleado = useSelector((state)=> state.extrasState.datosExtrasEmp);

    const bodyPetition = 
    {
      "idEmpleadoDatoExtra": 0,
      "fecha": formDatosExtras?.inputFechaExtras,
      "idEmpleado": empleadoUno.iDempleado,
      "idDatoExtra": formDatosExtras?.inputDatosExtrasCbo,
      "obs": formDatosExtras?.inputTextExtras
    }
  

    
    const urlPetition = `http://54.243.192.82/api/GuardarDatosExtras`
   
   

    async function sendData(){
      if(empleadoUno){
        try{
          await axios.post(urlPetition, bodyPetition)
          .then((res)=>{
              if(res.status === 200){
                setRefetch(!refetch)
                return swal({
                  title: "Ok",
                  text: "Dato Extra agregado con éxito",
                  icon: "success",
              })
              
              }
              return;
          })
        }catch(err){
          return swal({
              title: "Error",
              text: `Error al insertar el Dato Extra, error: ${err}`,
              icon: "error",
        })
        }
      }else{
        return swal({
          title: "Error",
          text: `Debe seleccionar un Empleado`,
          icon: "error",
        })
      }
      
      
    }


    async function deleteDatoExtra(id){
        dispatch(deleteDatoExtraEmpl(id));
        dispatch(saveIdDe(id));
      
    }
    

    function onChangeValues(e, key){
        const newResponse = {...formDatosExtras};
        if(key === "inputFechaExtras"){
          const inputDate = new Date(e);
          if (inputDate.getFullYear() > 2050) {
            const maxDate = new Date("2050-12-31");
            const formattedMaxDate = maxDate.toISOString().slice(0, 10);
            newResponse.inputFechaExtras = formattedMaxDate;
            setFormDatosExtras({
              ...newResponse
            });
            return;
          }
        }
        newResponse[key] = e;
        setFormDatosExtras({
          ...newResponse
        });
    };
    useEffect(()=>{
      let newResponse = {...formDatosExtras};
      newResponse["inputDatosExtrasCbo"] = null;
      newResponse["inputFechaExtras"] = "";
      newResponse["inputTextExtras"] = "";
      setFormDatosExtras({
        ...newResponse
      });
    },[datoExtraSelected])
  
  
    useEffect(() => {    
        setResponses({
          ...responses,
          formDatosExtras
        });    
    },[formDatosExtras]);

  
  

  return (
    <section className='sectionExtras'>
      <div className='container'>
          <div className='row'>
              <EmployeData />
          </div>
      </div>
      <div className='container-flex  border-top-0 p-0'>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button acordeonOption" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <p className="tituloAcordeon p-0 m-0">Datos Extras</p>
              </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <div className='row  mt-1'>
                    <div className='col-xl-12'>
                        <InputButtonLiquidacion
                        class='fs-5' 
                        idInput="inputDatosExtrasCbo" 
                        nameButton="..." 
                        onChange={onChangeValues} 
                        value={formDatosExtras?.inputDatosExtrasCbo && formDatosExtras?.inputDatosExtrasCbo}
                        propArrayOp="descripcion"
                        array={datosExtras && datosExtras}
                        propIdOption="idDatoExtra"
                        nameLabel="Datos Extras" 
                        clasess={inputButtonClasessExtras}
                        disabled={disable} 
                        idSelected={formDatosExtras?.inputDatosExtrasCbo  ? formDatosExtras?.inputDatosExtrasCbo : datoExtraSelected?.idDatoExtra}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-6'>
                    <div className="d-flex flex-row justify-content-start align-items-center ">
                      <div className="form-check-extras p-0 mt-2">
                        <label className="form-check-label-extras" htmlFor="flexCheckDefault">
                          Fecha
                        </label>
                      </div>
                      <div className="d-flex flex-row justify-content-start align-items-center">
                          
                          <input id="inputFechaExtras" className="secondCheckNacExtras" name="inputFechaExtras" type="date" value={formDatosExtras?.inputFechaExtras ? formDatosExtras?.inputFechaExtras : (datoExtraSelected?.fecha && datoExtraSelected?.fecha.substring(0, datoExtraSelected?.fecha.length -9))} disabled={disable} onChange={(e)=>onChangeValues(e.target.value, "inputFechaExtras")} />
                          
                      </div>
                  </div>
                       {/*  <InputDate valueCheck={true} value={formDatosExtras?.inputFechaExtras && formDatosExtras?.inputFechaExtras} onChange={onChangeValues} idInput="inputFechaExtras" nameInput="Fecha" action={GET_INPUT_VALUES_EXTRAS} disabled={disable} /> */}
                    </div>
                </div>
                <div className='row'>
                      <div className='col-xl-12 fs-6 '>
                          <TextArea  clasess={classesTxtAreaExtras}  onChange={onChangeValues} idInput="inputTextExtras" value={formDatosExtras?.inputTextExtras ? formDatosExtras?.inputTextExtras : datoExtraSelected?.obs} inputName="Observaciones" action={GET_INPUT_VALUES_EXTRAS} disableModal={disable} />
                          <Buttons cancelar="cancelar" aceptar="aceptar" idElimiar={datoExtraSelected.idEmpleadoDatoExtra} functionDelete={deleteDatoExtra} functionSend={sendData}  disabled={disable} />
                          <TableExtras descripcion={datosExtras} disabled={disable} datosExtraEmpleado={datosExtraEmpleado && datosExtraEmpleado} columns={columns} />
                      </div>
                </div>
            </div>
          </div>
        </div>
       {/*  <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                Adscripto
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse " aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className='row'>
                    <div className='col-xl-12 d-flex flex-row justify-content-start align-items-center'>
                        <CheckLabel idInput="inpútAdscriptoExtras" nameLabel="Adscripto" onChange={onChange} action={GET_INPUT_VALUES_EXTRAS} />
                        <InputButtonLiquidacion nameButton="..." nameLabel="Instrum. Legal" id="inputInstrumLegal" clasess={inputButtonClasessExtrasInstrum} onChange={onChange} action={GET_INPUT_VALUES_EXTRAS} />
                    </div>
                    <div className='divObservaciones'>
                        <TextArea idInput="inputTextExtrasAdscripto" inputName="Observaciones" onChange={onChange} action={GET_INPUT_VALUES_EXTRAS} />
                    </div>

              </div>
              <div className='linea' />
              <div className='row'>
                    <div className='col-xl-12 d-flex flex-row justify-content-start align-items-center'>
                        <CheckLabel idInput="inputAfectacionesExtras" nameLabel="Afectaciones" onChange={onChange} action={GET_INPUT_VALUES_EXTRAS} />
                        <InputButtonLiquidacion nameButton="..." nameLabel="Instrum. Legal" id="inputInstrumLegalAfectaciones" action={GET_INPUT_VALUES_EXTRAS} clasess={inputButtonClasessExtrasInstrum} onChange={onChange} />
                    </div>
                    <div className='divObservacionesAfectacion'>
                        <InputButtonLiquidacion nameButton="..." nameLabel="Sector" id="inputSectorExtras" action={GET_INPUT_VALUES_EXTRAS} clasess={inputButtonClasessExtrasAfectaciones} onChange={onChange} />
                    </div>
                    <div className='divObservacionesAfectacion'>
                        <InputButtonLiquidacion nameButton="..." nameLabel="Direcciones" id="inputDireccionesExtras" action={GET_INPUT_VALUES_EXTRAS} clasess={inputButtonClasessExtrasAfectaciones} onChange={onChange} />
                    </div>
                    <div className='divObservacionesAfectacionObs '>
                        <TextArea idInput="inputTextExtrasAfectaciones" inputName="Observaciones" onChange={onChange} action={GET_INPUT_VALUES_EXTRAS} />                          
                    </div>
                    
              </div>
              </div>
            </div>
          </div>  */}        
        </div>
      </div>
      </section>  
  )
}

export default Extras