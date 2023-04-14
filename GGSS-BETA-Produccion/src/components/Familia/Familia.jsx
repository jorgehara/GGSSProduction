// import axios from "axios";
import ButtonCancelarAceptar from "../Buttons/ButtonCancelarAceptar";
import EmployeData from "../EmployeData/EmployeData";
import InputChecked from "../Inputs/InputChecked/InputChecked";
import InputDateFlia from "../Inputs/InputDateFamilia/InputDateFlia";
import InputMultiple from "../Inputs/InputMultiple/InputMultiple";
import PaisOrigenFlia from "../Inputs/InputParentescoOpcions/PaisOrigenFlia";
import InputParentesco from "../Inputs/InputParentesco/InputParentesco";
import TextArea from "../Inputs/TextArea/TextArea";
import TableBasic from "../Tables/TableBasic";
import NacionalidadFlia from "../Inputs/InputParentescoOpcions/NacionalidadFlia";
import EstudioFlia from "../Inputs/InputParentescoOpcions/EstudioFlia";
import { useEffect } from "react";
import {  getFamiliarByIdFamiliar } from "../../services/fetchAPI";
import { useState } from "react";
import InputDateFliaBaja from "../Inputs/InputDateFamilia/InputDateFliaBaja";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FAMILIA } from "../../redux/types/familiaTypes";
import axios from "axios";
import swal from "sweetalert";
import { addNewFamiliar, deleteOneFamiliar } from "../../redux/actions/fetchActions";
import { disableFunctions } from "../../redux/actions/employeActions";
import { addFamiliar, deleteFam, saveIdFam } from "../../redux/actions/familiaActions";
import "./Familia.css"
import Buttons from "../Buttons/Buttons";
import CheckLabel from "../Inputs/CheckLabel/CheckLabel";

const Familia = ({responses, setResponses,disable, setRefetch, refetch, agregar , setAgregar, handleClickRef, referencia, modify }) => {
  
  //const { saveEmpl, saveNacionalidad, saveEstudio, parentescos, disable, saveFamSelect } = useContext(employeContext);

  const [familiarSeleccionado, setFamiliarSeleccionado] = useState({});
  const [ formFamilia, setFormFamilia ] = useState(responses["formFamilia"]);
  const familiarSeleccionadoR = useSelector((state)=> state.familiaStates.familiarSeleccionado);

  const dispatch = useDispatch();

  //#region ------------------------------------------------------------------------------CONSTANTES DE DATOS
  const urlFamiliares = "http://54.243.192.82/api/EliminarFamiliarPorId";
const urlCreateFamiliar = "http://54.243.192.82/api/GuardarFamiliar";
  function onChangeValues(e, key){
    let newResponse = {...formFamilia};
    if(key === "inputDateNac"){
      const inputDate = new Date(e);
      if (inputDate.getFullYear() > 2050) {
        const maxDate = new Date("2050-12-31");
        const formattedMaxDate = maxDate.toISOString().slice(0, 10);
        newResponse.inputDateNac = formattedMaxDate;
        setFormFamilia({
          ...newResponse
        });
        return;
      }
    }
    if(key === "inputDateBaja"){
      const inputDate = new Date(e);
      if (inputDate.getFullYear() > 2050) {
        const maxDate = new Date("2050-12-31");
        const formattedMaxDate = maxDate.toISOString().slice(0, 10);
        newResponse.inputDateBaja = formattedMaxDate;
        setFormFamilia({
          ...newResponse
        });
        return;
      }
    }
    newResponse[key] = e;
    setFormFamilia({
      ...newResponse
    });
  };


  useEffect(() => {
      setResponses({
        ...responses,
        formFamilia
      });      
  },[formFamilia]);

    useEffect(()=>{
      let newResponse = {...formFamilia};
      newResponse["textAreaObservacionesFamilia"] = "";
      newResponse["idRadioBtn"] = "";
      newResponse["inputCmbDni"] = null;
      newResponse["inputNroDni"] = "";
      
      newResponse["inputApellidoNombres"] = "";
      newResponse["inputParentesco"] = null;
      newResponse["inputDateNac"] = "";
      newResponse["nacionalidadFamilia"] = null;
      newResponse["idInputEstudios"] = null;
      newResponse["inputPaisOrigen"] = null;
      newResponse["inputDateBaja"] = "";
      setFormFamilia({
        ...newResponse
      });
    },[familiarSeleccionadoR])


  const empleadoUno = useSelector((state) => state.employeStates.employe)
  const familiaRedux = useSelector((state) => state.familiaStates.formulario);
  const tiposDni = useSelector((state) => state.generalState.tiposDocumento);
  const paisesValue = useSelector((state) => state.generalState.paises);
  const parentescosValue = useSelector((state)=> state.generalState.parentescos);
  const estudiosValue = useSelector((state)=> state.generalState.estudios);
  const familiaresValue = useSelector((state)=> state.generalState.familiares);
  const idFamiliarSelected = useSelector((state)=> state.familiaStates.familiar);
  const familiaresPorEmpleado = familiaresValue && familiaresValue.filter((familiar)=> familiar.iDempleado === empleadoUno.iDempleado);
  const familiaresPorEmplado = useSelector((state)=> state.familiaStates.familiarPorEmpleado);



  //#endregion

  const propsRadioButton = {
    idCboDni: "inputCmbDni",
    idNroDni: "inputNroDni",
    idRadioBtn: "idRadioBtn"
  }
  //#endregion
  const columns = [
    "Ape Nombre",
    "Tipo",
    "N°Documento",
    "Sexo",
    "Parentesco",
    "Nacimiento",
    "País Origen",
    "Nacionalidad",
    "Estudios",
    "Baja",
    "Deduce",
    "C. Alim",
    "Obs"
  ];
  function onSelect(saveFamiliar, idFamiliar) {
    getFamiliarByIdFamiliar(saveFamiliar, idFamiliar).then((res) => {
      dispatch(addFamiliar(res));
      setFamiliarSeleccionado(res);
    });
  }
  let bodyPetition = {
    "iDFamiliares": ((familiaresValue && familiaresValue[familiaresValue.length -1]  && (familiaresValue[familiaresValue.length -1].iDfamiliares))+1),
    "iDEmpleado": empleadoUno.iDempleado,
    "apellidoyNombres": responses.formFamilia?.inputApellidoNombres,
    "iDParentesco": responses.formFamilia?.inputParentesco,
    "sexo": responses.formFamilia?.idRadioBtn,
    "fechaNacimiento": responses.formFamilia?.inputDateNac,
    "iDNacionalidad": responses.formFamilia?.nacionalidadFamilia,
    "iDTipoDocumento": responses.formFamilia?.inputCmbDni,
    "nroDocumento": responses.formFamilia?.inputNroDni,
    "iDEstudios": responses.formFamilia?.idInputEstudios,
    "iDPaisOrigen": responses.formFamilia?.inputPaisOrigen,
    "f_Baja": responses.formFamilia?.inputDateBaja,
    "noDeducirGanancias": responses.formFamilia?.checkNoDeducirGana,
    "incluirCuotaAlimentaria": responses.formFamilia?.checkCuotaAlim,
    "obs": responses.formFamilia?.textAreaObservacionesFamilia
  }
   let bodyPetitionUpdate = {
    "iDFamiliares": familiarSeleccionadoR?.idFamiliares,
    "iDEmpleado": empleadoUno.iDempleado,
    "apellidoyNombres": responses.formFamilia?.inputApellidoNombres ? responses.formFamilia?.inputApellidoNombres : familiarSeleccionadoR?.apellidoyNombres,
    "iDParentesco": responses.formFamilia?.inputParentesco ? responses.formFamilia?.inputParentesco : familiarSeleccionadoR?.idParentesco,
    "sexo": responses.formFamilia?.idRadioBtn ? responses.formFamilia?.idRadioBtn : familiarSeleccionadoR?.sexo,
    "fechaNacimiento": responses.formFamilia?.inputDateNac ? responses.formFamilia?.inputDateNac : familiarSeleccionadoR?.fechaNacimiento,
    "iDnacionalidad": responses.formFamilia?.nacionalidadFamilia ? responses.formFamilia?.nacionalidadFamilia : familiarSeleccionadoR?.idNacionalidad,
    "iDTipoDocumento": responses.formFamilia?.inputCmbDni ? responses.formFamilia?.inputCmbDni : familiarSeleccionadoR?.idTipoDocumento,
    "nroDocumento": responses.formFamilia?.inputNroDni ? responses.formFamilia?.inputNroDni : familiarSeleccionadoR?.nroDocumento,
    "iDEstudios": responses.formFamilia?.idInputEstudios ? responses.formFamilia?.idInputEstudios : familiarSeleccionadoR?.idEstudios,
    "iDPaisOrigen": responses.formFamilia?.inputPaisOrigen ? responses.formFamilia?.inputPaisOrigen : familiarSeleccionadoR?.idPaisOrigen,
    "f_Baja": responses.formFamilia?.inputDateBaja ? responses.formFamilia?.inputDateBaja : familiarSeleccionadoR?.f_Baja,
    "noDeducirGanancias": responses.formFamilia?.checkNoDeducirGana ? responses.formFamilia?.checkNoDeducirGana : familiarSeleccionadoR?.noDeducirGanancias,
    "incluirCuotaAlimentaria": responses.formFamilia?.checkCuotaAlim ? responses.formFamilia?.checkCuotaAlim : familiarSeleccionadoR?.incluirCuotaAlimentaria,
    "obs": responses.formFamilia?.textAreaObservacionesFamilia ? responses.formFamilia?.textAreaObservacionesFamilia : familiarSeleccionadoR?.obs
  } 



  async function sendData() {
    if(familiarSeleccionadoR){
      try{
        await axios.post(urlCreateFamiliar, bodyPetitionUpdate)
        .then(res => {
          //dispatch(addNewFamiliar(res.data));
          if(res.status === 200){
            setRefetch(!refetch)
            return swal({
              title: "Ok",
              text: "Familiar actualizado correctamente",
              icon: "success",
            })
          }
          
        })
      }catch(err){
        return swal({
          title: "Error",
          text: "Error al Actualizar el Familiar" + err,
          icon: "error",
        })
      }
    }else{
      try {
        await axios.post(urlCreateFamiliar, bodyPetition)
          .then(res => {
            //dispatch(addNewFamiliar(res.data));
            if(res.status === 200){
              setRefetch(!refetch)
              return swal({
                title: "Ok",
                text: "Familiar cargado correctamente",
                icon: "success",
              })
            }
            
          })
        return;
      } catch (err) {
        return swal({
          title: "Error",
          text: "Error al Actualizar el Familiar" + err,
          icon: "error",
        })
      }
    }
    
  }
  const deleteFamiliar = (id) => {
    
      dispatch(deleteFam(id));
      dispatch(saveIdFam(id))
  }

  


  function cancelButton(){
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    if(formFamilia && formFamilia){
      const inputsArray = Object.entries(formFamilia);

      const clearInputs = inputsArray.map(([key])=> [key, '']);

      const inputsJson = Object.fromEntries(clearInputs);

      setFormFamilia(inputsJson);
    }
    dispatch(disableFunctions(false));
  }
  
  return (
    <>
      <div className="container-fluid contFamilia">
        <div className="row border border-1">
          <EmployeData disabled={disable} />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-7 p-2">
              <InputChecked
                value={formFamilia?.inputApellidoNombres ? formFamilia?.inputApellidoNombres : familiarSeleccionadoR.apellidoyNombres}
                nameLabel="Apellido y Nombres"
                nameCheck="Fijar"
                placeHolder="Apellido y Nombres"
                disabled={disable}
                idInput="inputApellidoNombres"
                nameInput="inputApellidoNombres"
                onChange={onChangeValues}
                obligatorio ={true}
              />
              <InputMultiple
                optionsDNI={tiposDni}
                idSelected="iDtipoDocumento"
                namePropOp="tipoDocumento"
                nameInputDNI="Documento"
                valueRadio={
                  formFamilia?.idRadioBtn ? formFamilia?.idRadioBtn : familiarSeleccionadoR?.sexo
                }
                valueDNI={
                  formFamilia?.inputNroDni ? formFamilia?.inputNroDni : familiarSeleccionadoR?.nroDocumento
                }
                nameFirst="Masculino"
                nameSecond="Femenino"
                nameInputRadio=""
                placeholder="Documento"
                disable={disable}
                propsRadioButton={propsRadioButton}
                onChange={onChangeValues}
                datosFamiliaValue1={ formFamilia?.inputCmbDni && formFamilia?.inputCmbDni }
                datosFamiliaRadio={formFamilia?.idRadioBtn && formFamilia?.idRadioBtn}
                propSelected= {formFamilia?.inputCmbDni ? formFamilia?.inputCmbDni : familiarSeleccionadoR?.idTipoDocumento}
                obligatorio ={true}
              />
              <InputParentesco
                nameInput="Parentesco"
                array={parentescosValue &&  parentescosValue }

                handleClickRef={handleClickRef}
                referencia= {referencia.parentRef}
                modalName="Parentescos"


                propArrayOp="nombreParentesco"
                propIdSelect="iDparentesco"
                placeHolder="Parentesco"
                nameButton="..."
                nameCheck="Fijar"
                checked=""
                useButton={false}
                display={false}
                idModal="Parentescos"
                propArray={formFamilia?.inputParentesco && formFamilia?.inputParentesco}
                disable={disable}
                idInput="inputParentesco"
                value={formFamilia?.inputParentesco ? formFamilia?.inputParentesco : familiarSeleccionadoR?.idParentesco}
                onChange={onChangeValues}
                action={ADD_FAMILIA}
                obligatorio ={true}
              />
              <InputDateFlia
                value={
                  !familiarSeleccionado ? (empleadoUno && empleadoUno.fechaNacimiento) : familiarSeleccionado.fechaNacimiento
                }
                display={false}
                checked={false}
                nameInput="Nacimiento"
                idInput="inputDateNac"
                valueGeneral={ formFamilia?.inputDateNac ? formFamilia?.inputDateNac : familiarSeleccionadoR && familiarSeleccionadoR?.fechaNacimiento?.substring(0, familiarSeleccionadoR && familiarSeleccionadoR?.fechaNacimiento?.length -9)}
                onChange={onChangeValues}
                disable={disable}
                familiarSeleccionado={familiarSeleccionado && familiarSeleccionado }
                
              />
                <EstudioFlia
                  handleClickRef={handleClickRef}
                  referencia= {referencia.estudiosRef}
                  modalName="Estudios"

                  nameInput="Estudios"
                  array={estudiosValue && estudiosValue}                
                  namePropOp="estudiosNivel"
                  idSelect="iDestudios"
                  propArray={ formFamilia?.idInputEstudios ? formFamilia?.idInputEstudios : familiarSeleccionadoR?.idEstudios}
                  placeHolder="Estudios"
                  nameButton="..."
                  nameCheck="Fijar"
                  checked=""
                  useButton={false}
                  display={false}
                  idModal="Estudios"
                  disable={disable}
                  idInput="idInputEstudios"
                  onChange={onChangeValues}
                  valueInputEstudios={ formFamilia?.idInputEstudios && formFamilia?.idInputEstudios }
                  action={ADD_FAMILIA}
                  obligatorio ={true}
                />
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 ml-5">

              <PaisOrigenFlia
                handleClickRef={handleClickRef}
                referencia= {referencia.paisesRef}
                modalName="Paises"
                nameLabel="Pais de Origen"
                array={paisesValue && paisesValue}
                namePropValue="nombrePais"
                nameInput="inputPaisOrigen"
                idSelected="idPais"
                placeHolder="Paises"
                nameButton="..."
                nameCheck="Fijar"
                checked=""
                useButton={false}
                display={false}
                propArray={formFamilia?.nombrePais ? formFamilia?.nombrePais : familiarSeleccionadoR?.idPaisOrigen}
                idModal="paises"
                disable={disable}
                onChange={onChangeValues}
                action={ADD_FAMILIA}
                obligatorio ={true}
              />
              <NacionalidadFlia
                handleClickRef={handleClickRef}
                referencia= {referencia.paisesRef}
                modalName="Paises"
                nameInput="Nacionalidad"
                array={paisesValue && paisesValue}
                namePropOp="nacionalidad_masc"
                placeHolder="Nacionalidad"
                nameButton="..."
                nameCheck="Fijar"
                checked=""
                display={false}
                masculinos={paisesValue && paisesValue}
                propIdSelect="idPais"
                propArrayOpMasc = "nacionalidad_masc"
                femeninos={paisesValue && paisesValue}
                propArrayOpFem = "nacionalidad_fem"
                sexo={formFamilia?.idRadioBtn && formFamilia?.idRadioBtn}
                propArray={formFamilia?.idRadioBtn ? formFamilia?.idRadioBtn : familiarSeleccionadoR?.idNacionalidad}
                idModal="nacionalidades"
                useButton={false}
                disable={disable}
                onChange={onChangeValues}
                idInput="nacionalidadFamilia"
                obligatorio ={true}
              />
              <InputDateFliaBaja
                value={
                  !familiarSeleccionado  ? (empleadoUno.fechaEgreso &&  empleadoUno.fechaEgreso ) : familiarSeleccionado.fBaja
                }
                display={false}
                checked={false}
                nameInput="Fecha Baja"
                idInput="inputDateBaja"
                disable={disable}
                familiarSeleccionado={familiarSeleccionado !== undefined ? familiarSeleccionado : null}
                valueGeneral={formFamilia?.inputDateBaja ? formFamilia?.inputDateBaja : familiarSeleccionadoR && familiarSeleccionadoR?.f_Baja?.substring(0, familiarSeleccionadoR && familiarSeleccionadoR?.f_Baja?.length -9)}
                onChange={onChangeValues}
              />
              <div className="col-xl-12 ">
                <CheckLabel
                  idInput="checkNoDeducirGana"
                  nameLabel="No Deducir Ganancias"
                  onChange={onChangeValues}
                  value={formFamilia?.checkNoDeducirGana ? formFamilia?.checkNoDeducirGana : familiarSeleccionadoR?.noDeducirGanancias}
                  disabled={disable}
                />
              </div>
              <div className="col-xl-12 ">
                <CheckLabel
                  idInput="checkCuotaAlim"
                  nameLabel="Incluir en cuota Alimentaria"
                  onChange={onChangeValues}
                  value={formFamilia?.checkCuotaAlim ? formFamilia?.checkCuotaAlim : familiarSeleccionadoR?.incluirCuotaAlimentaria}
                  disabled={disable}
                />
              </div>
              <TextArea
                disableModal={disable}
                inputName="Observaciones"
                maxLength="255"
                disabled={disable}
                onChange={onChangeValues}
                idInput="textAreaObservacionesFamilia"
                value={
                  formFamilia?.textAreaObservacionesFamilia
                    ? formFamilia?.textAreaObservacionesFamilia
                    : familiarSeleccionadoR?.obs
                }
              />
            </div>
          </div>
        </div>
        <Buttons cancelar="cancelar" aceptar="acpetar" disabled={disable} functionSend={sendData} functionDelete={deleteFamiliar} idElimiar={idFamiliarSelected}/>
        <div className="d-flex flex-row align-items-center">
          
          <TableBasic 
          onSelect={onSelect} 
          columns={columns} 
          disabled={disable} 
          array={familiaresPorEmplado &&  familiaresPorEmplado } 
          seleccionado={familiarSeleccionadoR} 
          
          />
        </div>
        

      </div>
    </>
  );
};
export default Familia;
