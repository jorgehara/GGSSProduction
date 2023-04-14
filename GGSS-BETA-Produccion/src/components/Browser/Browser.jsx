import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getEmployeById,
  getEmployeByLegajo,
  getEmployeByName,
} from "../../services/fetchAPI";
import { useDispatch, useSelector } from "react-redux";
import ButtonLarge from "../Buttons/ButtonLarge";
import "./Browser.css";
import ButtonCallModal from "../ButtonCallModal/ButtonCallModal";
import {
  addOneEmploye,
  cleanEmploye,
  disableFunctions,
  getEmployes,
} from "../../redux/actions/employeActions";
import { GET_INPUT_VALU_BROWSER } from "../../redux/types/employeTypes";
import swal from "sweetalert";
import { disabledInputs } from "../../redux/actions/fetchActions";
import "./Browser.css";
import {
  clearLicSelect,
  deleteDetLic,
} from "../../redux/actions/licenciasActions";
import { setRefetch } from "../../redux/actions/modalesActions";
import { domicilioSelected, recharge } from "../../redux/actions/domiciliosActions";
import ChildBajaEmpleado from "../Modals/ChildBajaEmpleado";
import ChildModalReincorporacion from "../Modals/ChildModalReincorporacion";
import ChildModalCamCate from "../Modals/ChildModalCamCate";

const Browser = ({ getEmpleados, disable, setDisable, setValueEmpl, responses, setResponses, setRefectch, refetch, deleteEmploye,setModify, agregar , setAgregar, renderButtons, handleClickRef, referencia, modalOpen, setModalOpen, setRenderButtons }) => {
  const [checked, setChecked] = useState(false);
  const [ browser, setBrowser ] = useState(responses["browser"]);
  const [ nameModal, setNameModal ] = useState({});

  const empleadoUno = useSelector((state)=> state.employeStates.employe);
  const estados = useSelector((state)=> state.generalState.estados);
  const parSueldos = useSelector((state)=> state.generalState.parSueldos);
  const idEstadoSelec = empleadoUno && empleadoUno.idEstado;
  const estadoSEleccionado = estados && estados.find(est => est.idEstado === idEstadoSelec); 
  function onChangeValues(e, key){
    const newResponse = {...browser};
    if(key === 'inpurLegajoBrowser'){
      if(browser?.inputApellidoNombreBrowser !== "" && e !== ""){
        newResponse.inputApellidoNombreBrowser = "";
      }
      newResponse.inpurLegajoBrowser = e;
    } else if(key === "inputApellidoNombreBrowser"){
      if(browser?.inpurLegajoBrowser !== "" && e !== ""){
        newResponse.inpurLegajoBrowser = "";
      }
      newResponse.inputApellidoNombreBrowser = e;
    }
    newResponse[key] = e;
    setBrowser({
      ...newResponse
    });
};
 
  useEffect(() => {  
    setResponses({
      ...responses,
      browser
    });    
},[browser]);


  const url = "http://54.243.192.82/api/Empleados?records=100";

  const dispatch = useDispatch();

  const empleados = useSelector((state) => state.employeStates.empleados);
  const valueInputLegajo = useSelector(
    (state) => state.employeStates.formulario.inpurLegajoBrowser
  );
  const valueInputApellido = useSelector(
    (state) => state.employeStates.formulario.inputApellidoNombreBrowser
  );
  const deshabilitado = useSelector((state) => state.employeStates.disable);
  const recharged = useSelector((state)=> state.domiciliosStates.recharge);
  

 

  const detalleSeleccionado = useSelector(
    (state) => state.licenciasState.detalleSelect
  );

  function onSelect(e, name, idEmpleado) {
    dispatch(recharge(!recharged))
    getEmployeById(empleados, idEmpleado).then((res) => {
      
      dispatch(addOneEmploye(res[0]));
    });
  }
  function onEnter(name, esLegajo, legajo){
    dispatch(recharge(!recharged))
    if(!esLegajo){
      getEmpleados()
    }else{
      getEmployeByLegajo(empleados, legajo).then((res) => {
      
        dispatch(addOneEmploye(res[0]));
      });
    }
    
  }
  

  function habilitaEdit() {
    setValueEmpl(true)
    setRefectch(!refetch)
    dispatch(cleanEmploye())
    setAgregar(true);
    
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );

    let formData = { ...responses.formDatosPersonales };

    const inputsArray = Object.entries(formData);

    const formDatosPersonale = inputsArray.map(([key]) => [key, ""]);

    const formDatosPersonales = Object.fromEntries(formDatosPersonale);
    setResponses({
      ...responses,
      formDatosPersonales})
    setDisable(false);

  }
  
  function habilitaUpdate(e) {
    e.preventDefault();
    dispatch(domicilioSelected(""))
    setModify(true);
    setValueEmpl(true)
    setRefectch(!refetch)
    if (empleadoUno.iDempleado && empleadoUno.iDempleado) {
      return setDisable(false);
    }
    swal({
      title: "Error",
      text: `Debe seleccionar un empleado`,
      icon: "error",
    });
  }
  /* async function bajaEmpleado(){
    if(empleadoUno?.iDempleado){
      try{
        await axios.post(`http://54.243.192.82/api/Empleados/sp_BajaEmpleado?idEmpleado=${empleadoUno?.iDempleado}&idMotivoEgreso=${}&FechaEgreso=${}`)
        .then((res)=>{
          if(res.status === 200){
            try{
              axios.post().then((res)=>{
                if(res.status === 200){
                  return swal({
                    title : "Ok",
                    text : "Baja realizada con éxito",
                    icon : "success"
                  })
                }
              })
            }catch(err){
              return swal({
                title : "Error",
                text : "Error al realizar la baja del Empleado" + err,
                icon : "error"
              })
            }
            
          }
        })
      }catch(err){
        return swal({
          title : "Error",
          text : "Error al realizar la baja del Empleado" + err,
          icon : "error"
        })
      }
    }
  } */
  /* useEffect(()=>{
    clearLegajo();
  },[browser?.inputApellidoNombreBrowser, browser?.inpurLegajoBrowser]) */
  const handleClickClose=(nameModalProp)=>{
    let newState = {...nameModal}

    newState[nameModalProp] = false;
    setNameModal(newState);
}

  return (
    <>
      <div className="row gy-1 container-flex p-0 m-o ">
        {/* <InputForm nameInput="Legajo:" messageError="Solo puede contener números." placeHolder="N° Legajo" value={empData.legajo} inputId="legajo" onChange={onInputChange}/>
        <InputForm nameInput="Nombre:" messageError="Solo puede contener letras." placeHolder="Buscar Nombres" value={empData.apellido} inputId="nombreApellido"  onChange={onInputChange}/> */}
        <div className="row mt-1 p-0 m-0 ">
          <div className="container m-0 p-2">
            <input
              onChange={(e) => onChangeValues(e.target.value, "inpurLegajoBrowser")}
              value={browser?.inpurLegajoBrowser}
              className="form__grupo__input__browser "
              type="number"
              name="inpurLegajoBrowser"
              id="inpurLegajoBrowser"
              placeholder="Ingrese Legajo "
              disabled={!disable}
              onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                  const legajo = e.target.value;
                  onEnter(null, true, legajo)
                }
              }}
              
            />

            <div className="row mt-1 m-0 p-0  w-100">
              <input
                onChange={(e) => onChangeValues(e.target.value, "inputApellidoNombreBrowser")}
                value={browser?.inputApellidoNombreBrowser}
                className="form__grupo__input__browser "
                type="text"
                name="inputApellidoNombreBrowser"
                id="inputApellidoNombreBrowser"
                placeholder="Ingrese Nombre "
                disabled={!disable}
                onKeyDown={(e)=>{
                  if(e.key === 'Enter'){
                    const name = e.target.value;
                    onEnter(name, false, null)
                  }
                }}
                
              />              
            </div>
            {/* <div className="wor mt-1 m-0 p-0 w-100">
              <label htmlFor="ordered">Ordenar:</label>
              <input type="checkbox" name="ordered" id="ordered" onChange={(e) => { setChecked(!checked); onChangeValues(e.target.checked, "ordered")}} checked={checked} />
            </div> */}
            <select
              defaultValue={[]}
              className="form-select  mt-1 selectMenu "
              multiple
              aria-label="multiple select example"
              disabled={!disable}
              onKeyDown={(e)=> onSelect(e,e.target.value.split(',')[0],Number(e.target.value.split(',')[1]))}
              onKeyUp={(e)=> onSelect(e,e.target.value.split(',')[0],Number(e.target.value.split(',')[1]))}
            >
              {empleados &&
                empleados?.map((emp, i) => {
                  return (
                    emp.idEstado === (parSueldos && parSueldos[0]?.estadoBajaEmpleado) ?  
                    <option
                    className="empleadoBaja"
                    key={i}
                    onClick={(e) => onSelect(e, emp.apellido, emp.iDempleado)}
                    value={`${emp.apellido},${emp.iDempleado}`}
                    apellido={emp.apellido && emp.apellido}
                    idEmpleado={emp.iDempleado && emp.iDempleado}
                  >{`${emp.apellido}, ${emp.nombres} (*)`}</option>
                    :
                    <option
                      key={i}
                      onClick={(e) => onSelect(e, emp.apellido, emp.iDempleado)}
                      value={`${emp.apellido},${emp.iDempleado}`}
                      apellido={emp.apellido && emp.apellido}
                      idEmpleado={emp.iDempleado && emp.iDempleado}
                    >{`${emp.apellido}, ${emp.nombres}`}</option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="container ">
          <div className="row align-items-start">
            {
              renderButtons === 0 && <><div className="col">
                <button
                  className={`btn btn-danger btn-sm d-flex justify-content-center m-1 align-items- newClass`}
                  onClick={habilitaEdit}
                  disabled={!disable}
                >
                  Agregar
                </button>
              </div>
              <div className="col">
                  <button
                    className={`btn btn-danger btn-sm d-flex justify-content-center m-1 align-items- newClass`}
                    onClick={(e) => habilitaUpdate(e)}
                    disabled={ estadoSEleccionado?.idEstado === (parSueldos && parSueldos[0]?.estadoBajaEmpleado) ? true : !disable}
                  >
                    Modificar
                  </button>
                </div>
                <div className="col">
                  <button
                    className={`btn btn-danger btn-sm d-flex justify-content-center m-1 align-items- newClass`}
                    onClick={() => deleteEmploye(empleadoUno.iDempleado)}
                    disabled={ estadoSEleccionado?.idEstado === (parSueldos && parSueldos[0]?.estadoBajaEmpleado) ? true : !disable}
                  >
                    Eliminar
                  </button>
                </div></>
            }
            {
              renderButtons === 1 && <div className="d-flex flex-row justify-content-center align-items-center w-100">
                <ButtonCallModal  esBoton={true} nameModal={nameModal} setNameModal={setNameModal}  nameModalProp="reincorporacionEmpleado" nameButton="Reincorporación">
                  <ChildModalReincorporacion
                  handleClickClose={handleClickClose}
                  nameModal = "Reincorporación"
                  nameModalProp="reincorporacionEmpleado"
                  onChangeValues={onChangeValues}
                  formDocumentacion={setBrowser}
                  value={browser}
                  refetch={refetch} 
                  setRefetch={setRefectch} 
                  handleClickRef={handleClickRef}
                  referencia= {referencia.docuRef}
                  modalName="Reincorporación"
                  modalOpen={modalOpen} 
									setModalOpen={setModalOpen}
                  setRefectch={setRefectch}
                  setRenderButtons={setRenderButtons} 
                  valueRender={0}
                  />
                </ButtonCallModal>
                  
              </div>
            }
            {
              renderButtons === 2 && <div className="d-flex flex-row justify-content-center align-items-center w-100">
                <ButtonCallModal  esBoton={true} nameModal={nameModal} setNameModal={setNameModal}  nameModalProp="bajaEmpleado" nameButton="Baja de un Empleado">
                  <ChildBajaEmpleado
                  handleClickClose={handleClickClose}
                  nameModal = "Baja de un Empleado"
                  nameModalProp="bajaEmpleado"
                  onChangeValues={onChangeValues}
                  formDocumentacion={setBrowser}
                  value={browser}
                  refetch={refetch} 
                  setRefetch={setRefectch} 
                  handleClickRef={handleClickRef}
                  referencia= {referencia.docuRef}
                  modalName="Baja de un Empleado"
                  modalOpen={modalOpen} 
									setModalOpen={setModalOpen}
                  setRefectch={setRefectch}
                  setRenderButtons={setRenderButtons} 
                  valueRender={0}
                  />
                </ButtonCallModal>
              </div>
            }
            {
              renderButtons === 3 && <div className="d-flex flex-row justify-content-center align-items-center w-100">
                 <ButtonCallModal  esBoton={true} nameModal={nameModal} setNameModal={setNameModal}  nameModalProp="cambioCategoria" nameButton="Cambio de Categoría">
                  <ChildModalCamCate
                  handleClickClose={handleClickClose}
                  nameModal = "Cambio de Categoría"
                  nameModalProp="cambioCategoria"
                  onChangeValues={onChangeValues}
                  formDocumentacion={setBrowser}
                  value={browser}
                  refetch={refetch} 
                  setRefetch={setRefectch} 
                  handleClickRef={handleClickRef}
                  referencia= {referencia.docuRef}
                  modalName="Cambio de Categoría"
                  modalOpen={modalOpen} 
									setModalOpen={setModalOpen}
                  setRefectch={setRefectch}
                  setRenderButtons={setRenderButtons} 
                  valueRender={0}
                  />
                </ButtonCallModal>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Browser;