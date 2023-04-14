//#region Imports
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DOMICILIOS } from "../../redux/types/domiciliosTypes";
import ButtonCancelarAceptar from "../Buttons/ButtonCancelarAceptar";
import InputCbo from "../Inputs/InputCbo/InputCbo";
import InputNumero from "../Inputs/InputNumero/InputNumero";
import TablaDomicilios from "../Tables/TablaDomicilios";
import './Domicilios.css';
import { addNewDomicilio, cleanIdsDom, deleteOneDomicilioSelect, saveIdsDom, selectedOption, selectedOptionBarrio, selectedOptionDpto } from "../../redux/actions/domiciliosActions";
import swal from "sweetalert";
import InputFormPiso from "../Inputs/InputForm/InputFormPiso";
import {
  inputClassCalleDomicilios,
  inputClassProvinciasDomicilios,
} from "../../classes/classes";
import { useEffect } from "react";
import { setRefetch } from "../../redux/actions/modalesActions";
import { updateDomicilio } from "../../redux/actions/fetchActions";
import Buttons from "../Buttons/Buttons";

//#endregion
const Domicilios = ({tabIndex,handleTabChange, responses, disabled, onChangeValues, formDatosPersonales, setFormDatosPersonales, domiciliosEmpleados, setRefectch, refetch, handleClickRef, referencia, modify, agregar }) => {
  const empleadoUno = useSelector((state)=> state.employeStates.employe);

  const [domicilios, setDomicilios] = useState([]);
  const [checked, setChecked] = useState(false);
  const [formDomicilios, setFormDomicilios] = useState(
    responses["formDomicilios"]
  );

  const generalStateData = useSelector((state)=> state.generalState)
  const provinciaSelected = useSelector((state)=> state.domiciliosStates.provinciaSelected);
  const departamentoSelected = useSelector((state)=> state.domiciliosStates.departamentoSelected);
  const localidadSelected = useSelector((state)=> state.domiciliosStates.localidadSelected);
  const domicilioDelEmpleado = useSelector((state)=> state.domiciliosStates.idDomicilioSelected);
  const domicilioSelected = useSelector((state)=> state.domiciliosStates.domicilioSelected);

  const empleadoDomicilio = useSelector((state)=> state.domiciliosStates.domicilioEmpleado);

  
  const listDomicilios = useSelector((state)=> state.generalState.domicilios); 

  const columns = [
    "Predeterminado",
    "Calle",
    "Número",
    "Barrio",
    "Localidad",
    "Piso/Of/Dpto",
    "Provincia",
  ];

  const paises = ["Argentina", "Uruguay", "Paraguay", "Bolivia", "Peru"];
  //#region ------------------------------------------------------------------------------REDUX
  const urlDomicilios = `http://54.243.192.82/api/InsertarNuevoDomicilio`;

  const dispatch = useDispatch();


 
  let arrayDepartamentos = provinciaSelected && provinciaSelected.payload && generalStateData.departamentos !== undefined && generalStateData.departamentos !== "" ? generalStateData.departamentos.filter((departamento) => departamento.idProvincia === provinciaSelected.payload.idProvincia) : null;
  
  if(domicilioSelected && domicilioSelected !== ""){
    arrayDepartamentos =  generalStateData && generalStateData?.departamentos?.filter((departamento) => departamento.idProvincia === domicilioSelected.idProvincia);
  }

  let arrayLocalidades = departamentoSelected && departamentoSelected.payload && generalStateData.localidades !== undefined && generalStateData.localidades !== "" ? generalStateData.localidades.filter((localidad) => localidad.idDepartamento === departamentoSelected.payload.idDepartamento) : null;
  
  if(domicilioSelected && domicilioSelected !== ""){
    arrayLocalidades =  generalStateData && generalStateData?.localidades?.filter((localidad) => localidad.idDepartamento === domicilioSelected.idDepartamento);
  }

  let arrayBarrios = localidadSelected  && localidadSelected.payload &&  generalStateData.barrios !== undefined && generalStateData.barrios !== "" ? generalStateData.barrios.filter((barrio) => barrio.idLocalidad === localidadSelected.payload.idLocalidad) : null;
  
  if(domicilioSelected && domicilioSelected !== ""){
    arrayBarrios =  generalStateData && generalStateData?.barrios?.filter((barrio) => barrio.idLocalidad === domicilioSelected.idLocalidad);
  }



  const refetching = useSelector((state)=> state.modalState.refetch);
 

  
  const bodyCreateDomicilio = {
    "idDomicilio": 0,
    "idCalle": formDatosPersonales?.inputCalleDomicilios,
    "numero": formDatosPersonales?.inputNumCalle,
    "idBarrio": formDatosPersonales?.inputBarriosDomicilios,
    "dpto": formDatosPersonales?.inputDepartamentosDomicilios,
    "predeterminado": formDatosPersonales?.inputPredeterminado,
    "iDEmpleado": empleadoUno?.iDempleado,
    "idEmpleador": 0
  }
  const bodyUpdateDomicilio = {
    "idDomicilio": domicilioSelected?.idDomicilio,
    "idCalle": formDatosPersonales?.inputCalleDomicilios,
    "numero": formDatosPersonales?.inputNumCalle,
    "idBarrio": formDatosPersonales?.inputBarriosDomicilios,
    "dpto": formDatosPersonales?.inputDepartamentosDomicilios,
    "predeterminado": formDatosPersonales?.inputPredeterminado,
    "iDEmpleado": empleadoUno?.iDempleado,
    "idEmpleador": 0
  }
 
    

  const sendDataDomicilios= async ()=>{
    try{
      if(domicilioSelected !== ""){
        await axios.post(urlDomicilios, bodyUpdateDomicilio, {
          headers: {
            'Access-Control-Allow-Origin' : '*', 
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Credentials':true
          }})
              .then((res)=> {     
                    
                if(res.status === 200){ 
                  dispatch(updateDomicilio(bodyUpdateDomicilio))  
                  setRefectch(!refetch)
                  dispatch(setRefetch(!refetching))
                  dispatch(cleanIdsDom());
                  const newResponse = {...formDatosPersonales};
                  newResponse["inputPredeterminado"] = false;
                  newResponse["inputCalleDomicilios"] = 0;
                  newResponse["inputNumCalle"] = "";
                  newResponse["inputPisoCalle"] = "";
                  newResponse["inputProvinciaDomicilios"] = 0;
                  newResponse["inputDepartamentosDomicilios"] = 0;
                  newResponse["inputLocalidadesDomicilios"] = 0;
                  newResponse["inputBarriosDomicilios"] = 0;
                  setFormDatosPersonales({
                    ...newResponse
                  });  
                  swal({
                    title: "Domicilio Actualizado",
                    text: "Domicilio actualizado con éxito",
                    icon: "success",
                  })          
                }; 
                setRefectch(!refetch)           
              })
      }else{
        await axios.post(urlDomicilios, bodyCreateDomicilio, {
          headers: {
            'Access-Control-Allow-Origin' : '*', 
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Credentials':true
          }})
              .then((res)=> {     
                    
                if(res.status === 200){ 
                  dispatch(addNewDomicilio(res.data))  
                  setRefectch(!refetch)
                  dispatch(setRefetch(!refetching))
                  dispatch(cleanIdsDom());
                  const newResponse = {...formDatosPersonales};
                  newResponse["inputPredeterminado"] = false;
                  newResponse["inputCalleDomicilios"] = 0;
                  newResponse["inputNumCalle"] = "";
                  newResponse["inputPisoCalle"] = "";
                  newResponse["inputProvinciaDomicilios"] = 0;
                  newResponse["inputDepartamentosDomicilios"] = 0;
                  newResponse["inputLocalidadesDomicilios"] = 0;
                  newResponse["inputBarriosDomicilios"] = 0;
                  setFormDatosPersonales({
                    ...newResponse
                  });  
                  swal({
                    title: "Domicilio Agregado",
                    text: "Domicilio agregado con éxito",
                    icon: "success",
                  })          
                }; 
                setRefectch(!refetch)           
              })
      }
    
    }catch(err){
      return swal({
        title: "Error",
        text: "Debe completar todos los campos",
        icon: "error",
      });
    }
  }
  const deleteDomicilio = (id)=>{
    dispatch(deleteOneDomicilioSelect(Number(id)))
    dispatch(saveIdsDom(Number(id))); 
   
  }


  const handleChangePredeterminado=(e, key)=>{
    setChecked(!checked)
    const newResponse = {...formDatosPersonales};
      newResponse[key] = e.target.checked;
      setFormDatosPersonales({
        ...newResponse
      });
  }

  return (
    //#region Menú Principal

    <div
      to="/domicilios"
      className="accordion-item"
      onClick={handleTabChange(0)}
    >
      <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              
            >
              Domicilios
            </button>
          </h2>
          
          {
            tabIndex === 0 && <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <section className="">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        name="inputPredeterminado"
                        checked={modify || agregar ? formDatosPersonales?.inputPredeterminado : formDatosPersonales?.inputPredeterminado }
                        disabled={disabled}
                        //checked={modify || agregar ? formDatosPersonales?.inputPredeterminado : (domicilioSelected && modify ? formDatosPersonales?.inputPredeterminado : checked)}
                        id="inputPredeterminado"
                        onChange={(e)=>handleChangePredeterminado(e, "inputPredeterminado" )}
                      />
                      <label className="ml-2" htmlFor="predeterminado">
                        Predeterminado
                      </label>
                    </div>{
                      //#endregion
                    }
                    <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 w-100">
                      <InputCbo
                        clasess={inputClassCalleDomicilios}
                        value={formDatosPersonales?.inputCalleDomicilios ? formDatosPersonales?.inputCalleDomicilios : empleadoUno?.calle}
                        action={ADD_DOMICILIOS}
                        sexo=""
                        handleClickRef={handleClickRef}
                        referencia={referencia.callesRef}
                        modalName="Calles"
                        nameButton="..."
                        nameLabel="Calle"
                        array={
                          generalStateData.calles !== null &&
                          generalStateData.calles !== ""
                            ? generalStateData.calles
                            : ["calle", "calle"]
                        }
                        propArrayOp="calle"
                        propArrayOpFem="calle"
                        propArray={empleadoDomicilio !== undefined && empleadoDomicilio !== null ? empleadoDomicilio.idCalle : null}
                        idSelected={formDomicilios?.inputCalleDomicilios ? formDomicilios?.inputCalleDomicilios : domicilioSelected.idCalle}
                        masculinos=""
                        femeninos=""
                        display={false}
                        idModal="calles"
                        disabled={disabled}
                        nameInput="inputCalleDomicilios"
                        idInput="inputCalleDomicilios"
                        onChange={onChangeValues}
                        valueId="idCalle"
                        obligatorio ={true}
                        esCalle = {true}
                        usaNumero={true}
                        dptoOpcion={true}
                        esCalleDom={true}
                        inputValueSate={formDatosPersonales?.inputNumCalle ? formDatosPersonales?.inputNumCalle : domicilioSelected.numero}
                      />
                    </div>
                    </div>
                      <InputFormPiso
                        value={
                          formDomicilios?.inputPisoCalle ? formDomicilios?.inputPisoCalle : domicilioSelected.dpto
                        }
                        nameInput="inputPisoCalle"
                        idInput="inputPisoCalle"
                        messageError="Solo puede contener números."
                        placeHolder="Piso Dpto"
                        disabled={disabled}
                        generalState={setDomicilios}
                        action={ADD_DOMICILIOS}
                        onChange={onChangeValues}
                        nameLabel="Piso/Dpto/
                        Ofic/Torre"
                        numbers={true}
                      />
                    
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 mx-4 gy-4 py-2">
                    
                      <InputCbo
                      value={
                        formDatosPersonales?.inputProvinciaDomicilios ? formDatosPersonales?.inputProvinciaDomicilios : empleadoUno.provincia
                      }
                      action={ADD_DOMICILIOS}
                      handleClickRef={handleClickRef}
                      referencia= {referencia.pldbRef}
                      modalName="Provincias - Localidades - Departamentos - Barrios"
                      sexo=""
                      nameButton="..."
                      nameLabel="Provincia"
                      array={generalStateData.provincias !== undefined && generalStateData.provincias !== ""  ? generalStateData.provincias : []}
                      propArrayOp="provincia"
                      propArrayOpFem="provincia"
                      masculinos=""
                      femeninos=""
                      idSelected={formDatosPersonales?.inputProvinciaDomicilios ? formDatosPersonales?.inputProvinciaDomicilios : domicilioSelected?.provincia}
                      display={false}
                      idModal="pdlb"
                      disabled={disabled}
                      nameInput="inputProvinciaDomicilios"
                      idInput="inputProvinciaDomicilios"
                      onChange={onChangeValues}
                      provinciaAction = {selectedOption}
                      valueId="idProvincia"
                      obligatorio ={true}
                    />
                      <InputCbo
                      value={
                        formDatosPersonales?.inputDepartamentosDomicilios ? formDatosPersonales?.inputDepartamentosDomicilios : empleadoUno.departamento
                      }
                      action={ADD_DOMICILIOS}
                      handleClickRef={handleClickRef}
                      referencia= {referencia.pldbRef}
                      modalName="Provincias - Localidades - Departamentos - Barrios"
                      sexo=""
                      nameButton="..."
                      nameLabel="Departamento"
                      array={ arrayDepartamentos !== null &&  arrayDepartamentos !== undefined  ? arrayDepartamentos : []}
                      propArrayOp="departamento"
                      propArrayOpFem="departamento"
                      //propArray={provinciaDepartamento !== undefined && provinciaDepartamento !== null ? provinciaDepartamento.toString() : null}
                      masculinos=""
                      femeninos=""
                      idSelected={formDatosPersonales?.inputDepartamentosDomicilios ? formDatosPersonales?.inputDepartamentosDomicilios : domicilioSelected?.departamento}
                      display={false}
                      idModal="pdlb"
                      disabled={disabled}
                      nameInput="inputDepartamentosDomicilios"
                      idInput="inputDepartamentosDomicilios"
                      onChange={onChangeValues}
                      provinciaAction = {selectedOptionDpto}
                      valueId="idDepartamento"
                      obligatorio ={true}
                      dptoOpcion={true}
                    />
                    <InputCbo
                      value={
                        formDatosPersonales?.inputLocalidadesDomicilios ? formDatosPersonales?.inputLocalidadesDomicilios : empleadoUno.localidad
                      }
                      action={ADD_DOMICILIOS}
                      handleClickRef={handleClickRef}
                      referencia= {referencia.pldbRef}
                      modalName="Provincias - Localidades - Departamentos - Barrios"
                      sexo=""
                      nameButton="..."
                      nameLabel="Localidad"
                      array={arrayLocalidades !== undefined && arrayLocalidades !== null ? arrayLocalidades : []}
                      propArrayOp="localidad"
                      propArrayOpFem="localidad"
                      masculinos=""
                      femeninos=""
                      idSelected={formDatosPersonales?.inputLocalidadesDomicilios ? formDatosPersonales?.inputLocalidadesDomicilios : domicilioSelected?.idLocalidad}
                      display={false}
                      idModal="pdlb"
                      disabled={disabled}
                      nameInput="inputLocalidadesDomicilios"
                      idInput="inputLocalidadesDomicilios"
                      onChange={onChangeValues}
                      provinciaAction = {selectedOptionBarrio}
                      valueId="idLocalidad"
                      obligatorio ={true}
                      dptoOpcion={true}
                    />
                    <InputCbo
                      value={
                        formDatosPersonales?.inputBarriosDomicilios ? formDatosPersonales?.inputBarriosDomicilios : empleadoUno.barrio
                      }
                      action={ADD_DOMICILIOS}
                      handleClickRef={handleClickRef}
                      referencia= {referencia.pldbRef}
                      modalName="Provincias - Localidades - Departamentos - Barrios"
                      sexo=""
                      nameButton="..."
                      nameLabel="Barrio"
                      array={arrayBarrios !== undefined && arrayBarrios !== null ? arrayBarrios : []}
                      propArrayOp="barrio"
                      propArrayOpFem="barrio"
                      masculinos=""
                      femeninos=""
                      idSelected={formDatosPersonales?.inputBarriosDomicilios ? formDatosPersonales?.inputBarriosDomicilios : domicilioSelected?.barrio}
                      display={false}
                      idModal="pdlb"
                      disabled={disabled}
                      nameInput="inputBarriosDomicilios"
                      idInput="inputBarriosDomicilios"
                      onChange={onChangeValues}
                      valueId="idBarrio"
                      obligatorio ={true}
                      dptoOpcion={true}
                    />
                  </div>
                  <Buttons cancelar="cancelar" aceptar="aceptar" idElimiar={domicilioDelEmpleado} functionDelete={deleteDomicilio} functionSend={sendDataDomicilios}  disabled={disabled} />
                  <TablaDomicilios 
                    columns={columns} 
                    disabled={disabled}
                    empleadoSelect={empleadoUno && empleadoUno} 
                    value={ empleadoDomicilio && empleadoDomicilio }
                      refetch={refetch}
                      setRefectch={setRefectch}
                  />

                  
                </div>
              </section>
            </div>
          </div>
          }
          
      
      
     
    </div>
  );
};
export default Domicilios;
