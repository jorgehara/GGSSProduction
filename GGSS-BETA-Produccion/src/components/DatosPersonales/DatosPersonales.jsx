//#region Imports

import React, { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import DNICboBox from "../Inputs/DNICboBox/DNICboBox";
import InputButton from "../Inputs/InputButton/InputButton";
import InputCbo from "../Inputs/InputCbo/InputCbo";
import InputDate from "../Inputs/InputDate/InputDate";
import InputFile from "../Inputs/InputFile/InputFile";
import InputForm from "../Inputs/InputForm/InputForm";
import InputRadio from "../Inputs/InputRadio/InputRadio";
import "./DatosPersonales.css";
import Domicilios from "../Domicilios/Domicilios";
import generateCuil from "./funcGenerarCuil.js";
import TextArea from "../Inputs/TextArea/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DATOS_PERSONALES } from "../../redux/types/datosPersonalesTypes";
import axios from "axios";
import {  classesTxtAreaPersonales, inputButtonClasessCUIL } from "../../classes/classes";
import { disableFunctions } from "../../redux/actions/employeActions";
import EmployeData from "../EmployeData/EmployeData";
import InputButtonCUIL from "../Inputs/InputButtonCUIL/InputButtonCUIL";

//#endregion

const DatosPersonales = ({ modify,tabIndex ,handleTabChange, responses, setResponses, cancelar, image, disableEstado, disable, empleados, valueempl, domiciliosEmpleados, setRefectch, refetch,ImageSelectedPrevious, setImageSelectedPrevious, agregar , setAgregar, handleClickRef, referencia }) => {
  //#region ---------------------------------------------------------ONCHANGE-HANDLER

  const [ formDatosPersonales, setFormDatosPersonales ] = useState(responses["formDatosPersonales"]);

  const dispatch = useDispatch();
  
  
  //#region ------------------------------------------------------REDUX
  const empleadoUno = useSelector((state)=> state.employeStates.employe);
  const datosPersonalesState = useSelector((state)=> state.generalState);
  const numeradores = useSelector((state)=> state.generalState.numeradores);
  const parSueldos = useSelector((state)=> state.generalState.parSueldos);
 

  
  //#endregion

  function onChangeValues(e, key){
      const newResponse = {...formDatosPersonales};
      if(key === "inputDateNac"){
        const inputDate = new Date(e);
        if (inputDate.getFullYear() > 2050) {
          const maxDate = new Date("2050-12-31");
          const formattedMaxDate = maxDate.toISOString().slice(0, 10);
          newResponse.inputDateNac = formattedMaxDate;
          setFormDatosPersonales({
            ...newResponse
          });
          return;
        }
      }
      newResponse[key] = e;
      setFormDatosPersonales({
        ...newResponse
      });
  };
  const domicilioSelected = useSelector((state)=> state.domiciliosStates.domicilioSelected);
  


  useEffect(() => {  
      setResponses({
        ...responses,
        formDatosPersonales
      });    
  },[formDatosPersonales]);
 
 

useEffect(()=>{
    const newResponse = {...formDatosPersonales};
    newResponse["inputPredeterminado"] = false;
    setFormDatosPersonales({
      ...newResponse
    });
},[])



useEffect(()=>{
  const newResponse = {...formDatosPersonales};
  newResponse["inputPredeterminado"] = domicilioSelected !== "" ? domicilioSelected?.predeterminado : ( modify || agregar ? formDatosPersonales?.inputPredeterminado : false);
  newResponse["inputCalleDomicilios"] = domicilioSelected !== "" ? domicilioSelected?.idCalle : (modify || agregar ? formDatosPersonales?.inputCalleDomicilios : 0);
  newResponse["inputNumCalle"] = domicilioSelected !== "" ? domicilioSelected?.numero : ( modify || agregar ? formDatosPersonales?.inputNumCalle : "");
  newResponse["inputPisoCalle"] = domicilioSelected !== "" ? domicilioSelected?.dpto : ( modify || agregar ? formDatosPersonales?.inputPisoCalle : "");
  newResponse["inputProvinciaDomicilios"] = domicilioSelected !== "" ? domicilioSelected?.idProvincia : ( modify || agregar ? formDatosPersonales?.inputProvinciaDomicilios : 0);
  newResponse["inputDepartamentosDomicilios"] = domicilioSelected !== "" ? domicilioSelected?.idDepartamento : ( modify || agregar ? formDatosPersonales?.inputDepartamentosDomicilios : 0);
  newResponse["inputLocalidadesDomicilios"] = domicilioSelected !== "" ? domicilioSelected?.idLocalidades : ( modify || agregar ? formDatosPersonales?.inputLocalidadesDomicilios : 0);
  newResponse["inputBarriosDomicilios"] = domicilioSelected !== "" ? domicilioSelected?.idBarrio : ( modify || agregar ? formDatosPersonales?.inputBarriosDomicilios : 0);
  setFormDatosPersonales({
    ...newResponse
  });
},[domicilioSelected])
useEffect(()=>{
  const newResponse = {...formDatosPersonales};
  newResponse["inputSexo"] = "F";
  if(agregar){
    newResponse["documentoInput"] = parSueldos && parSueldos[0].idTipoDocumentoPredeterminado;
    newResponse["estadosEmpleados"] = parSueldos && parSueldos[0].estadoAltaEmpleado;
    newResponse["paisOrigenInput"] = parSueldos && parSueldos[0].idPaisPredeterminado;
  }
  setFormDatosPersonales({
    ...newResponse
  });
},[])


  useEffect(()=>{
    const newResponse = {...formDatosPersonales};
    if(agregar){
      newResponse["dniSelected"] = parSueldos && parSueldos[0].idTipoDocumentoPredeterminado;
      newResponse["estadosEmpleados"] = parSueldos && parSueldos[0].estadoAltaEmpleado;
      newResponse["paisOrigenInput"] = parSueldos && parSueldos[0].idPaisPredeterminado;
    }else{
      newResponse["dniSelected"] = empleadoUno?.idTipoDocumentoPredeterminado;
      newResponse["estadosEmpleados"] = empleadoUno?.idEstado;
      newResponse["paisOrigenInput"] = empleadoUno?.idPaisPredeterminado;
    }
    setFormDatosPersonales({
      ...newResponse
    });
  },[agregar])

   function getNumeradorId(tabla){
    return numeradores && numeradores.filter((num)=>{
      return (num.tabla === tabla)
    })
  }

  
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  
  //#region ------------------------------------------------------------------------------VALIDACIONES

  const validateNumbers = (e) => {
    if (!/[-+\/0-9]/.test(e.key)) {
      swal({
        title: "Error",
        text: "Debe ingresar sólo números",
        icon: "error",
      });
      e.preventDefault();
    }
  };
  const validateNumbersDNI = (e) => {
    if (!/^([0-9]?){8}$/.test(e.key)) {
      swal({
        title: "¡Error!",
        text: `Ingrese número de DNI válido`,
        icon: "error",
      });
      e.preventDefault();
    }
  };
  const validateTexts = (e) => {
    if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(e.key)) {
      swal({
        title: "Error",
        text: "Debe ingresar sólo letras",
        icon: "error",
      });
      e.preventDefault();
    }
  };
  const validateEmails = (e) => {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(e.key)) {
      swal({
        title: "Error",
        text: "Debe ingresar un email válido",
        icon: "error",
      });
      e.preventDefault();
    }
  };

  
  

  function cancelButton(){
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    if(formDatosPersonales && formDatosPersonales){
      const inputsArray = Object.entries(formDatosPersonales);

      const clearInputs = inputsArray.map(([key])=> [key, '']);

      const inputsJson = Object.fromEntries(clearInputs);

      setFormDatosPersonales(inputsJson);
    }
    dispatch(disableFunctions(false));
     
  }

  return (
      //#region Menú Principal

    <>
      <EmployeData responses={responses} image={image} />
      <div className="Lateral-Derecho">
        <div className="accordion" id="accordionExample" onClick={handleTabChange(0)}>
          <div className="accordion-item">
            <h4 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                Datos Personales
              </button>
            </h4>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <section className="container">
                  <div className="row">
                    <div className="formulario__grupo"></div>
                    <form action="" className="form__datos__personales ">
                      <div className="row row-cols-12">
                        <div className="segunda__columna col-xl-4 col-lg-4 col-md-4">
                          {
                            //#endregion
                          }
                          <InputForm
                            value={agregar || modify ? formDatosPersonales?.numLegajo : empleadoUno.legajo}
                          
                            idInput="numLegajo"
                            messageError="Solo puede contener números."
                            placeHolder="N° Legajo"
                            disabled={disable}
                            onChange={onChangeValues}
                            nameLabel="Legajo"
                            validateNumbers={validateNumbers}
                            numbers={true}
                            cancelar={cancelar} 
                            obligatorio ={true}
                            />
                          <InputForm
                            value={agregar || modify ? formDatosPersonales?.apellidoInput  : empleadoUno.apellido}
                           
                            idInput="apellidoInput"
                            messageError="Solo puede contener letras."
                            placeHolder="Ingrese Apellidos"
                            disabled={disable}
                            onChange={onChangeValues}
                            nameLabel="Apellidos"
                            validateLetters={validateTexts}
                            numbers={false} 
                            obligatorio ={true}
                            />
                          <InputForm
                            value={agregar || modify ? formDatosPersonales?.nombresInput  : empleadoUno.nombres}
                           
                            action={ADD_DATOS_PERSONALES}
                            idInput="nombresInput"
                            messageError="Solo puede contener letras."
                            placeHolder="Ingrese Nombres"
                            disabled={disable}
                            onChange={onChangeValues}
                            nameLabel="Nombres"
                            validateLetters={validateTexts}
                            numbers={false} 
                            obligatorio ={true}
                            />
                          <DNICboBox
                            value={agregar || modify ? formDatosPersonales?.documentoInput  : empleadoUno.nroDocumento}                          
                            idInput="documentoInput"
                            messageError="Solo puede contener números, sin puntos."
                            placeHolder="Documento"
                            array={datosPersonalesState.tiposDocumento && datosPersonalesState.tiposDocumento !== "" ? datosPersonalesState.tiposDocumento : ["no entro"]}
                            propArrayOp="tipoDocumento"
                            propArrayId="iDtipoDocumento"
                            disabled={disable}
                            nameLabel="D.N.I."
                            onChange={onChangeValues}
                            selectedId="dniSelected"
                            idSelected={formDatosPersonales?.dniSelected && formDatosPersonales?.dniSelected  !== "" ? formDatosPersonales?.dniSelected && formDatosPersonales?.dniSelected : empleadoUno.iDtipoDocumento}
                            agregar={agregar}
                            handleClickRef={handleClickRef}
                            referencia= {referencia.tipoDocumentoRef}
                            modalName="Tipos Documento"
                            parSueldos={parSueldos && parSueldos}

                            validateNumbersDNI={validateNumbersDNI}
                            obligatorio ={true}
                            />
                            <InputButtonCUIL
                             value={agregar || modify ? formDatosPersonales?.inputCuil  : empleadoUno.cuil}
                       
                             action={ADD_DATOS_PERSONALES}
                             idInput="inputCuil"
                             nameInput="inputCuil"
                            nameLabel="C.U.I.L"
                            nameButton="Generar"
                            placeholder="##-########-#"
                             disabled={disable}
                             datosPersonalesValue={formDatosPersonales?.inputCuil && formDatosPersonales?.inputCuil}
                             onChange={onChangeValues}
                             validateLetters={validateTexts}
                             nroDocumento={formDatosPersonales?.documentoInput && formDatosPersonales?.documentoInput}
                            genre={formDatosPersonales?.inputSexo && formDatosPersonales?.inputSexo}
                            usaCuil={true}
                            funcionCuil={generateCuil}
                            swal={swal} 
                             numbers={false} 
                             obligatorio ={true}
                             formDatosPersonales ={formDatosPersonales}
                             setFormDatosPersonales={setFormDatosPersonales}
                            />
                          <InputForm
                            value={agregar || modify ? formDatosPersonales?.telefonoInput  : empleadoUno.telFijo}
                           
                            action={ADD_DATOS_PERSONALES}
                            nameInput="telefonoInput"
                            idInput="telefonoInput"
                            messageError="Solo puede contener números."
                            placeHolder="Telefono"
                            disabled={disable}
                            onChange={onChangeValues}
                            nameLabel="Telefono"
                            datosPersonalesValue={formDatosPersonales?.telefonoInput && formDatosPersonales?.telefonoInput}
                            validateNumbers={validateNumbers}
                            numbers={true} 
                           
                            />
                          <InputCbo
                            value={ agregar || modify ? formDatosPersonales?.estadoCivilInput: empleadoUno?.iDestadoCivil}
                           
                            action={ADD_DATOS_PERSONALES}
                            sexo={agregar || modify ? formDatosPersonales?.inputSexo : empleadoUno?.sexo}

                            handleClickRef={handleClickRef}
                            referencia= {referencia.estadoCivilRef}
                            modalName="Estados Civiles"

                            nameButton="..."
                            nameLabel="Estado Civil"
                            array={datosPersonalesState.estadosCiviles && datosPersonalesState.estadosCiviles && datosPersonalesState.estadosCiviles !== "" ? datosPersonalesState.estadosCiviles : ["no entro"]}
                            propArrayOp="masculino"
                            propArrayOpFem="femenino"
                            idSelected={formDatosPersonales?.estadoCivilInput ? formDatosPersonales?.estadoCivilInput : empleadoUno.iDestadoCivil}
                           
                            valueId="idEstadoCivil"
                            propArray="Casado"
                            display={false}
                            idModal="EstadoCivil"
                            disabled={(formDatosPersonales?.inputSexo && formDatosPersonales?.inputSexo && formDatosPersonales?.inputSexo === "") ? disableEstado : disable}
                            nameInput="estadoCivilInput"
                            idInput="estadoCivilInput"
                            onChange={onChangeValues} 
                            obligatorio ={true}
                            />
                          <InputCbo
                            value={agregar || modify  ? formDatosPersonales?.nacionalidadesInput :  empleadoUno.idNacionalidad }
                              
                            action={ADD_DATOS_PERSONALES}
                            sexo={agregar || modify ? formDatosPersonales?.inputSexo : empleadoUno?.sexo}

                            handleClickRef={handleClickRef}
                            referencia= {referencia.paisesRef}
                            modalName="Paises"
                        
                            nameButton="..."
                            nameLabel="Nacionalidad"
                            array={datosPersonalesState.paises !== undefined && datosPersonalesState.paises !== "" ? datosPersonalesState.paises : ["Nacionalidad"]}
                            propArrayOp="nacionalidad_masc"
                            propArrayOpFem="nacionalidad_fem"
                            idSelected={formDatosPersonales?.nacionalidadesInput ? formDatosPersonales?.nacionalidadesInput : empleadoUno.iDnacionalidad}
                           
                            valueId="idPais"
                            propArray="Casado"
                            display={false}
                            idModal="nacionalidades"
                            disabled={disable}
                            idInput="nacionalidadesInput"
                            onChange={onChangeValues} 
                            obligatorio ={true}
                            />
                        </div>
                        <div className="tercera_columna col-xl-4 col-lg-4 col-md-4">
                          <InputCbo
                            value={modify ? formDatosPersonales?.estadosEmpleados :  empleadoUno.idEstado }
                            handleClickRef={handleClickRef}
                            referencia= {referencia.estadoRef}
                            modalName="Estado"
                            action={ADD_DATOS_PERSONALES}
                            sexo=""
                            nameButton="..."
                            nameLabel="Estado"
                            array={datosPersonalesState.estados !== undefined && datosPersonalesState.estados !== "" ? datosPersonalesState.estados : []}
                            propArrayOp="nombreEstado"
                            propArrayOpFem="nombreEstado"
                            idSelected={formDatosPersonales?.estadosEmpleados ? formDatosPersonales?.estadosEmpleados : empleadoUno.idEstado}
                            parSueldos={parSueldos && parSueldos[0]?.estadoAltaEmpleado}
                            agregar={agregar}
                            valueId="idEstado"
                            masculinos=""
                            femeninos=""
                            onChange={onChangeValues}
                            display={false}
                            idInput="estadosEmpleados"
                            idModal="estadosEmpleados"
                            disabled={disable} 
                            obligatorio ={true}
                            esAltaDeEmpleado={true}
                            modify={modify}
                            />
                          <InputRadio
                            value={agregar || modify ? formDatosPersonales?.inputSexo : empleadoUno.sexo}
                      
                            action={ADD_DATOS_PERSONALES}
                            nameFirst="Masculino"
                            nameSecond="Femenino"
                            nameLabel="Sexo"
                            idInput="inputSexo"
                            disabled={disable}
                            onChange={onChangeValues}
                            datosPersonalesValue={formDatosPersonales?.inputSexo && formDatosPersonales?.inputSexo} 
                            obligatorio ={true}
                            nameThird="Otro"
                            />
                          <InputDate
                            value={formDatosPersonales?.inputDateNac ? formDatosPersonales?.inputDateNac : empleadoUno?.fechaNacimiento?.substring(0, empleadoUno.fechaNacimiento.length -9)}
                      
                            
                            action={ADD_DATOS_PERSONALES}
                            nameInput="Nacimiento"
                            disabled={disable}
                            idInput="inputDateNac"
                            onChange={onChangeValues} />
                          <InputForm
                            value={agregar  || modify ? formDatosPersonales?.movil : empleadoUno.movil}
                  
                            action={ADD_DATOS_PERSONALES}
                            nameInput="movil"
                            idInput="movil"
                            messageError="Solo puede contener números."
                            placeHolder="Ingrese su celular"
                            disabled={disable}
                            nameLabel="Celular"
                            onChange={onChangeValues}
                            validateNumbers={validateNumbers}
                            numbers={true} />
                          <InputForm
                            value={agregar || modify ? formDatosPersonales?.email : empleadoUno.email}
                 
                            action={ADD_DATOS_PERSONALES}
                            nameInput="email"
                            idInput="email"
                            messageError="Ingrese un email válido."
                            placeHolder="correo@correo.com.ar"
                            disabled={disable}
                            nameLabel="Email"
                            onChange={onChangeValues}
                            validateEmails={validateEmails}
                            numbers={false}
                            email={true} />
                          <InputCbo
                            value={agregar || modify ? formDatosPersonales?.paisOrigenInput : empleadoUno.idPaisdeOrigen}
                  
                            action={ADD_DATOS_PERSONALES}
                            sexo=""
                            nameButton="..."
                            nameLabel="País O"
                            array={datosPersonalesState.paises !== undefined && datosPersonalesState.paises !== "" ? datosPersonalesState.paises : []}
                            propArrayOp="nombrePais"
                            propArrayOpFem="nombrePais"
                            idSelected={formDatosPersonales?.paisOrigenInput ? formDatosPersonales?.paisOrigenInput : empleadoUno.idPaisOrigen}
                            handleClickRef={handleClickRef}
                            referencia= {referencia.paisesRef}
                            parSueldos={parSueldos && parSueldos[0]?.idPaisPredeterminado}
                            agregar={agregar}
                            modalName="Paises"
                            valueId="idPais"
                            masculinos=""
                            femeninos=""
                            display={false}
                            idModal="paisOrigenInput"
                            disabled={disable}
                            idInput="paisOrigenInput"
                            onChange={onChangeValues} 
                            obligatorio ={true}
                            />
                          <InputCbo
                            value={agregar || modify ? formDatosPersonales?.estudiosInput : empleadoUno.idEstudios}
                            handleClickRef={handleClickRef}
                            referencia= {referencia.estudiosRef}
                            modalName="Estudios"
                            action={ADD_DATOS_PERSONALES}
                            sexo=""
                            nameButton="..."
                            nameLabel="Estudios"
                            array={datosPersonalesState.estudios !== undefined && datosPersonalesState.estudios !== "" ? datosPersonalesState.estudios : []}
                            propArrayOp="estudiosNivel"
                            propArrayOpFem="estudiosNivel"
                            idSelected={formDatosPersonales?.estudiosInput ? formDatosPersonales?.estudiosInput : empleadoUno.iDestudios}
                            
                            valueId="iDestudios"
                            masculinos=""
                            femeninos=""
                            display={false}
                            idModal="Estudios"
                            disabled={disable}
                            idInput="estudiosInput"
                            onChange={onChangeValues}
                            obligatorio ={true}
                            />
                          <TextArea
                            inputName="Observaciones"
                            idInput="observacionesEstudios"
                            maxLength="255"
                            value={formDatosPersonales?.observacionesEstudios ? formDatosPersonales?.observacionesEstudios : empleadoUno.obsEstudios}
                            clasess={classesTxtAreaPersonales}
                            disableModal={disable}
                            action={ADD_DATOS_PERSONALES}
                            onChange={onChangeValues} />
                        </div>



                        <div className="col-xl-3 col-lg-3 col-md-3 colImagen">
                          <InputFile
                            ImageSelectedPrevious={ImageSelectedPrevious}
                            setImageSelectedPrevious={setImageSelectedPrevious}
                            inputName="Arrastre su imagen"
                            disabled={disable}
                            imagen={empleadoUno?.imagen}
                            onChange={onChangeValues}
                            idInput="inputImage"
                            action={ADD_DATOS_PERSONALES} 
                            setRefectch={setRefectch}
                            refetch={refetch}
                            setResponses={setResponses}
                            responses={responses}
                            />
                        </div>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <Domicilios referencia={referencia} handleClickRef={handleClickRef} tabIndex={tabIndex} handleTabChange={handleTabChange} setRefectch={setRefectch} refetch={refetch} domiciliosEmpleados={domiciliosEmpleados} onChangeValues={onChangeValues} formDatosPersonales={formDatosPersonales} setFormDatosPersonales={setFormDatosPersonales} disabled={disable} deshabilitar={disable} responses={responses} setResponses={setResponses} modify={modify} agregar={agregar} />
        </div>
        <div className="d-flex justify-content-end">
          
        </div>
      </div></>
  );
};
export default DatosPersonales;
