/* eslint-disable no-fallthrough */
import React, { useEffect } from "react";
import Browser from "../Browser/Browser";
import DatosPersonales from "../DatosPersonales/DatosPersonales";
import Documentacion from "../Documentacion/Documentacion";
import Familia from "../Familia/Familia";
import Footer from "../Footer/Footer";
import Licencias from "../Licencias/Licencias";
import Liquidacion from "../Liquidacion/Liquidacion";
import AdicLiquidacion from "../AdicLiquidacion/AdicLiquidacion";
import Navbar from "../Navbar/Navbar";
import TrabajosAnteriores from "../TrabajosAnteriores/TrabajosAnteriores";
import Extras from "../Extras/Extras";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdicLiquidacion,
  addAgrupamientos,
  addBancos,
  addBarrios,
  addCalles,
  addCargos,
  addCategorias,
  addCentroDeCosto,
  addConceptos,
  addConvenios,
  addDatosExtras,
  addDepartamentos,
  addDirecciones,
  addDocumentacionEmpleados,
  addDomicilios,
  addEmpleadores,
  addEsquemas,
  addEstados,
  addEstadosCiviles,
  addEstudios,
  addFamiliares,
  addFormasPago,
  addInstrumLegales,
  addLicenciaEmpleados,
  addLocalidades,
  addLugaresDePago,
  addModosContratacion,
  addModosLiquidacion,
  addNumeradores,
  addObrasSociales,
  addPaises,
  addParentescos,
  addProvincias,
  addSectorDepto,
  addSindicatos,
  addTareasDesempeñadas,
  addTiposDocumento,
  deleteDomicilio,
  disabledInputs,
  getArchivosAdjuntos,
  getMotivosEgreso,
  getParSueldos,
  saveDatosExtrasEmpleados,
} from "../../redux/actions/fetchActions";
import { AXIOS_ERROR, SET_LOADING } from "../../redux/types/fetchTypes";
import axios from "axios";
import { cleanIds, getTrabajosAnteriores, reloadItem } from "../../redux/actions/trabajosAnterioresActions";
import { cleanIdsDoc, documentacionDelEmpleado, getArAdjuntos, getOneDocumento } from "../../redux/actions/documentacionActions";
import {
  addDetalleLicencia,
  addLicEmpleado,
  clearIdsLic,
  deleteDetLic,
} from "../../redux/actions/licenciasActions";
import swal from "sweetalert";
import { getEmployeByLegajo, getEmployeByName } from "../../services/fetchAPI";
import { cleanEmploye, getEmployes, updateEmploye } from "../../redux/actions/employeActions";
import { cleanIdFam, getDAtosFamiliaresEmpleado } from "../../redux/actions/familiaActions";
import { addOneDomicilio, cleanIdsDom, deleteOneDomicilioSelect } from "../../redux/actions/domiciliosActions";
import { addDatosExtraPorEmpleado, cleanIdDe } from "../../redux/actions/extrasActions";
import { setRefetch } from "../../redux/actions/modalesActions";
import "./Home.css"
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";

const Empleados = ({tokenDef, setTokenDef, setRenderButtons, loading, handleClickRef, referencia, renderButtons, modalOpen, setModalOpen}) => {
  const [tabIndex, setTabIndex] = useState(0);
  
  const [responses, setResponses] = useState({});

  const [disable, setDisable] = useState(true);
  const [ agregar , setAgregar ] = useState(false);
  const [image, setImage] = useState("");
  const [disableEstado, setDisableEstado] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [licenciaEmpleadoDatos, setLicenciaEmpladoDatos] = useState([]);
  const [datosExtraEmpleado, setDatosExtraEmpleado ] = useState([]);
  const [ modify, setModify ] = useState(false);
  const [ valueempl, setValueEmpl ] = useState(false);
  const [saveEmpleado , setSaveEmpleado ] = useState(false);
  const token = useSelector((state)=> state.generalState.token);
  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);

  const refetching = useSelector((state)=> state.modalState.refetch);
  const [refetch, setRefectch] = useState(false);
  const empleadoUno = useSelector((state) => state.employeStates.employe);
  const detalleSeleccionado = useSelector(
    (state) => state.licenciasState.detalleSelect
  );
  const domicilioSelected = useSelector((state)=> state.domiciliosStates.domicilioSelected);
  const licenciaEmpleado = useSelector(
    (state) => state.licenciasState.licenciaEmpleado
  );
  const dispatch = useDispatch();

  const conceptosPorEmpelado = useSelector(
    (state) => state.generalState.conceptosXesquemas
  );
  
  //#region URLs

  const urlEstados = "http://54.243.192.82/api/Estados";
  const urlEstadosCiviles = "http://54.243.192.82/api/EstadosCiviles";
  const urlPaisesNac = "http://54.243.192.82/api/Paises";
  const urlEstudios = "http://54.243.192.82/api/Estudios";
  const urlTiposDNI = "http://54.243.192.82/api/TiposDocumento";
  const urlParentescos = "http://54.243.192.82/api/Parentescos";
  const urlFamiliares = "http://54.243.192.82/api/MostrarDatosFamiliares";
  const urlNumeradores = "http://54.243.192.82/api/Numeradores";

  const urlDomicilios = "http://54.243.192.82/api/MostrarDatosDomicilios";
  const urlCalles = "http://54.243.192.82/api/Calles";
  const urlDeptos = "http://54.243.192.82/api/Departamentos";
  const urlProvincias = "http://54.243.192.82/api/Provincias";
  const urlLocalidades = "http://54.243.192.82/api/Localidades";
  const urlBarrios = "http://54.243.192.82/api/Barrios";

  const urlEmpleadores = "http://54.243.192.82/api/Empleadores";
  const urlConvenios = "http://54.243.192.82/api/Convenios";
  const urlCategorias = "http://54.243.192.82/api/Categorias";
  const urlAgrupamientos = "http://54.243.192.82/api/Agrupamientos";
  const urlCargos = "http://54.243.192.82/api/Cargos";
  const urlTareas = "http://54.243.192.82/api/TareasDesempeñadas";
  const urlModosCont = "http://54.243.192.82/api/ModosContratacion";
  const urlModoLiq = "http://54.243.192.82/api/ModosLiquidacion";
  const urlCentroCosto = "http://54.243.192.82/api/CentrosDeCostos";
  const urlSectorDepto = "http://54.243.192.82/api/SectoresDptos/0,%201";
  const urlObrasSociales = "http://54.243.192.82/api/ObrasSociales";
  const urlFormasDePago = "http://54.243.192.82/api/FormasdePagos";
  const urlLugaresDePago = "http://54.243.192.82/api/LugaresdePago";
  const urlBancos = "http://54.243.192.82/api/Bancos";
  const urlDirecciones =
    "http://54.243.192.82/api/Direcciones/DireccionesDatos/0,1";
  const urlSindicatos = "http://54.243.192.82/api/Sindicatos";
  const urlEsquemas = "http://54.243.192.82/api/Esquemas";
  const urlConceptos = "http://54.243.192.82/api/ConceptosDatos/0,1";
  const urlTrabajosAnteriores = "http://54.243.192.82/api/TrabajosAnteriores";
  const urlDocumentacionEmpleados =
    "http://54.243.192.82/api/EmpleadosDocumentacion";
  const urlDocumentacion = "http://54.243.192.82/api/Documentacion";
  const urlDatosExtras = `http://54.243.192.82/api/DatosExtras/0,%201`;
  const urlInstrumLegal =
    "http://54.243.192.82/api/InstrumentosLegales/0?modo=1";
  const urlLicenciaEmpleados = "http://54.243.192.82/api/MostrarDatosLicencias";
  const urlDetalleLicenciasEmpleados =
    "http://54.243.192.82/api/DetalleLicenciasEmpleados";
  const urlEsquemasConceptos = "http://54.243.192.82/api/ConceptosEsquemas";
  const urlParSueldos = "http://54.243.192.82/api/ParSueldos";
 const urlArchivosAdjuntos = "http://54.243.192.82/api/ArchivosDocumentacionEmpleados/sp_ArchivosDocumentacionEmpleadosDatos"
 const urlMotivosEgreso = "http://54.243.192.82/api/MotivosEgreso/0,%201"

  //#endregion

  function setImageEmpleado() {
    empleadoUno.obsFechaIngreso !== undefined &&
      setImage(empleadoUno.obsFechaIngreso);
  }
  function handleTabChange(value) {
    setTabIndex(value);
  }
  function cancelEdit(e) {
    //Accion de redux que haga un state.domicilios.psuh(payload)... payload=[los items que se "borraron"]... Esos items guardarlso en un estado.
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    dispatch(cleanIds());
    setRefectch(!refetch);

    let formData = { ...responses.formDatosPersonales };

    const inputsArray = Object.entries(formData);

    const formDatosPersonales = inputsArray.map(([key]) => [key, ""]);

    const inputsJson = Object.fromEntries(formDatosPersonales);
    setResponses({
      ...responses,
      inputsJson})

    setDisable(true);

  }
 
  const handleFetch = async (url, action) => {
    dispatch({ type: SET_LOADING });
    await axios
      .get(url)
      .then((res) => {
        dispatch(action(res.data.result));
      })
      .catch((err) => {
        dispatch({ type: AXIOS_ERROR });
      });
  };

const domiciliosEmpleados = useSelector((state)=> state.generalState.domicilios)
const empleadoDomicilio = useSelector((state)=> state.domiciliosStates.domicilioEmpleado);
const recharge = useSelector((state)=> state.domiciliosStates.recharge);
const bodyArchivosDocs = {
  "idArchivoDocumentacionEmpleado": 0,
  "idEmpleadoDocumentacion": 0,
  "modo": 0,
  "idEmpleado": 0
}

//#region useEffect handleFetch
useEffect(()=>{
   handleFetch(urlEstados, addEstados);
   handleFetch(urlEstadosCiviles, addEstadosCiviles);
   handleFetch(urlPaisesNac, addPaises);
   handleFetch(urlEstudios, addEstudios);
   handleFetch(urlTiposDNI, addTiposDocumento);
   handleFetch(urlDomicilios, addDomicilios);
   handleFetch(urlParSueldos, getParSueldos);
   handleFetch(urlDocumentacionEmpleados, addDocumentacionEmpleados);
   handleFetch(urlMotivosEgreso, getMotivosEgreso);
   axios.post(urlArchivosAdjuntos, bodyArchivosDocs).then((res)=>{
    if(res.status === 200){
      dispatch(getArchivosAdjuntos(res.data.result))
    }
   })
   //handleFetch(urlArchivosAdjuntos, getArAdjuntos);
},[refetching, empleadoUno, refetch])

useEffect(()=>{
  axios
      .get(
        `http://54.243.192.82/api/MostrarDatosExtrasPorEmpleado/${empleadoUno?.iDempleado}`
      )
      .then((res) => {
        dispatch(saveDatosExtrasEmpleados(res.data.result));
      });//
},[empleadoUno, refetch])





/* const fetchData = async (url, action) => {
  dispatch({ type: SET_LOADING });
  try {
    const res = await axios.get(url);
    dispatch(action(res.data.result));
  } catch (err) {
    dispatch({ type: AXIOS_ERROR });
  }
}; */

/* const urls = [  
  { url: urlEstados, action: addEstados },  
  { url: urlEstadosCiviles, action: addEstadosCiviles }, 
  { url: urlSindicatos, action: addSindicatos },  
  { url: urlEsquemas, action: addEsquemas },  
  { url: urlConceptos, action: addConceptos }
];

useEffect(() => {
  urls.forEach((item) => {
    fetchData(item.url, item.action);
  });
}, []); */























  useEffect(() => {
    handleFetch(urlEstados, addEstados);
   handleFetch(urlEstadosCiviles, addEstadosCiviles);
   handleFetch(urlPaisesNac, addPaises);
   handleFetch(urlEstudios, addEstudios);
   handleFetch(urlTiposDNI, addTiposDocumento);
   handleFetch(urlDomicilios, addDomicilios);

   handleFetch(urlDocumentacionEmpleados, addDocumentacionEmpleados);

     handleFetch(urlEstados, addEstados);
     handleFetch(urlEstadosCiviles, addEstadosCiviles);
     handleFetch(urlPaisesNac, addPaises);
     handleFetch(urlEstudios, addEstudios);

     handleFetch(urlTiposDNI, addTiposDocumento);
     handleFetch(urlFamiliares, addFamiliares);
     handleFetch(urlNumeradores, addNumeradores);

     handleFetch(urlCalles, addCalles);
     handleFetch(urlDeptos, addDepartamentos);
     handleFetch(urlProvincias, addProvincias);
     handleFetch(urlLocalidades, addLocalidades);
     handleFetch(urlBarrios, addBarrios);

     handleFetch(urlConvenios, addConvenios);
     handleFetch(urlEmpleadores, addEmpleadores);
     handleFetch(urlCategorias, addCategorias);
     handleFetch(urlAgrupamientos, addAgrupamientos);
     handleFetch(urlCargos, addCargos);
     handleFetch(urlTareas, addTareasDesempeñadas);
     handleFetch(urlModosCont, addModosContratacion);
     handleFetch(urlModoLiq, addModosLiquidacion);
     handleFetch(urlCentroCosto, addCentroDeCosto);
     handleFetch(urlObrasSociales, addObrasSociales);
     handleFetch(urlFormasDePago, addFormasPago);
     handleFetch(urlLugaresDePago, addLugaresDePago);
     handleFetch(urlBancos, addBancos);
     handleFetch(urlDirecciones, addDirecciones);
     handleFetch(urlSindicatos, addSindicatos);
     handleFetch(urlEsquemas, addEsquemas);

     handleFetch(urlConceptos, addConceptos);

     handleFetch(urlDocumentacion, getOneDocumento);


     handleFetch(urlMotivosEgreso, getMotivosEgreso);

   handleFetch(urlSectorDepto, addSectorDepto);
     handleFetch(urlInstrumLegal, addInstrumLegales);
     handleFetch(urlDatosExtras, addDatosExtras);
     handleFetch(urlDomicilios, addDomicilios);


     handleFetch(urlTrabajosAnteriores, getTrabajosAnteriores);
  }, [disable, refetch,refetching, empleadoUno]);
  const motivosEgreso = useSelector((state)=> state.generalState.motivosEgreso);


  useEffect(() => {

    handleFetch(urlLicenciaEmpleados, addLicenciaEmpleados);
     handleFetch(urlDetalleLicenciasEmpleados, addDetalleLicencia);

  }, [refetch]);
//#endregion

  useEffect(() => {
    setImageEmpleado();
  }, [empleadoUno.obsFechaIngreso]);

  useEffect(() => {
    setDisableEstado(false);
  }, [responses?.inputSexo]);

  

  useEffect(() => {
    axios
      .get(
        `http://54.243.192.82/api/MostrarDatosPorEmpleado/${empleadoUno?.iDempleado}`

      )
      .then((res) => {
        dispatch(addLicEmpleado(res.data.result));
        setLicenciaEmpladoDatos(res.data.result);
      });

      axios.get(`http://54.243.192.82/api/MostrarDatosFamiliarPorEmpleado/${empleadoUno?.iDempleado}`)
      .then((res)=>{
        dispatch(getDAtosFamiliaresEmpleado(res.data.result))
      })

      axios.get(`http://54.243.192.82/api/Documentacion/sp_DocumentacionDatosXIdEmpleado?IdEmpleado=${empleadoUno?.iDempleado}`)
      .then((res)=>{
        dispatch(documentacionDelEmpleado(res.data))
      })
      axios.get(`http://54.243.192.82/api/MostrarDatosExtras/0,${empleadoUno?.iDempleado},1,`)
      .then((res)=>{
        dispatch(addDatosExtraPorEmpleado(res.data.result))
      })
      handleFetch(urlDomicilios, addDomicilios);
      handleFetch(urlDocumentacionEmpleados, addDocumentacionEmpleados);
      handleFetch(urlFamiliares, addFamiliares);
      handleFetch(urlParentescos, addParentescos);
      handleFetch(urlMotivosEgreso, getMotivosEgreso);

  }, [empleadoUno?.iDempleado, refetch, refetching]);


    useEffect(()=>{
      axios.get(`http://54.243.192.82/api/sp_DomiciliosDatosxIdEmpleado?IdEmpleado=${empleadoUno?.iDempleado}`)
      .then((res)=>{
        dispatch(addOneDomicilio(res.data))
      })
    },[empleadoUno?.iDempleado, refetch])




  useEffect(() => {
    dispatch(deleteDetLic(detalleSeleccionado.idDetalleLicenciaEmpleado));
  }, [empleadoUno?.iDempleado]);

  const valueInputLegajo = useSelector(
    (state) => state.employeStates.formulario.inpurLegajoBrowser
  );
  const valueInputApellido = useSelector(
    (state) => state.employeStates.formulario.inputApellidoNombreBrowser
  );
  const urlBasica = `http://54.243.192.82/api/Empleados?page=2000&ordered=true`;



    const url = `http://54.243.192.82/api/Empleados?filter=12121212121`;
    const urlEmpleadoPorApellido = `http://54.243.192.82/api/Empleados?filter=${responses?.browser?.inputApellidoNombreBrowser ? responses?.browser?.inputApellidoNombreBrowser : null}&modo=${renderButtons}`;
    const urlEmpleadoPorLegajo = `http://54.243.192.82/api/Empleados?legajo=${responses?.browser?.inpurLegajoBrowser ? responses?.browser?.inpurLegajoBrowser : null}&modo=${renderButtons}`;
    const urlEmpleadoApYLegajo = `http://54.243.192.82/api/Empleados?filter=${responses?.browser?.inputApellidoNombreBrowser ? responses?.browser.inputApellidoNombreBrowser : null}&legajo=${responses?.browser?.inpurLegajoBrowser ? responses?.browser?.inpurLegajoBrowser : null}&modo=${renderButtons}`;
    const urlApeLegOrdered = `http://54.243.192.82/api/Empleados?filter=${responses?.browser?.inputApellidoNombreBrowser ? responses?.browser?.inputApellidoNombreBrowser : null}&legajo=${responses?.browser?.inpurLegajoBrowser ? responses?.browser?.inpurLegajoBrowser : null}&modo=${renderButtons}`;

    
    async function getEmpleados(){
      if(responses?.browser?.inputApellidoNombreBrowser){
        await axios({method: 'get',
                      url: urlEmpleadoPorApellido,
                      timeout: 2000}).then((res) => {
                      
          dispatch(getEmployes(res.data.result));
        });
        return;
      }
      else if(responses?.browser?.inpurLegajoBrowser){
        await axios({method: 'get',
                    url: urlEmpleadoPorLegajo,
                    timeout: 2000}).then((res) => {
          dispatch(getEmployes(res.data.result));
        });
        return;      
      }else{
       
          dispatch(getEmployes(null));
      
      }
    }





    useEffect(() => {
    getEmpleados();
  }, [responses?.browser?.inputApellidoNombreBrowser,responses?.browser?.inpurLegajoBrowser, saveEmpleado, refetch, renderButtons]);


  const idsTrabajosAnterioresDelete = useSelector((state)=> state.trabajosAnteriores.ids);
  const documentacionDelte = useSelector((state)=> state.documentacionState.ids);
  const licenciasDelete = useSelector((state)=> state.licenciasState.idsLic);
  const idDomiciliosArray = useSelector((state)=> state.domiciliosStates.idsDom);
  const arraysFamiliares = useSelector((state)=> state.familiaStates.idsFAm);
  const arrayIdsDatoExtra = useSelector((state)=> state.extrasState.idsDe);

  const urlTRabajoDelete = "http://54.243.192.82/api/TrabajosAnteriores?IdTrabajoAnterior=";
  const urlDocDelte = "http://54.243.192.82/api/EmpleadosDocumentacion/"
  const urlLicDelete = "http://54.243.192.82/api/deleteLicencia/"
  const urlEmpleadoGuarda = "http://54.243.192.82/api/Empleados/Guardar"
  const urlDOmicilioElimina = `http://54.243.192.82/api/ActualizaEliminaDomicilio/${empleadoUno?.iDempleado},`
  const urlDeleteFAmiliar = "http://54.243.192.82/api/EliminarFamiliarPorId/"
  const urlDatoExtraElimina = "http://54.243.192.82/api/EliminarDatosExtras/"


  const objectRequest = {
    urls : {
      urlTRabajoDelete : urlTRabajoDelete,
      urlDocDelte : urlDocDelte,
      urlLicDelete : urlLicDelete,
      urlEmpleadoGuarda : urlEmpleadoGuarda,
      urlDOmicilioElimina : urlDOmicilioElimina,
      urlDeleteFAmiliar : urlDeleteFAmiliar,
      urlDatoExtraElimina : urlDatoExtraElimina
    },
    arrays : [
      idsTrabajosAnterioresDelete,
      documentacionDelte,
      licenciasDelete,
      idDomiciliosArray,
      arraysFamiliares,
      arrayIdsDatoExtra
    ]
  }

 


  const { urls, arrays } = objectRequest;



  function cleanIdsGeneral(){


    setImageSelectedPrevious(null);
    Array.from(document.querySelectorAll("input[type=text]")).forEach(
      (input) => (input.value = "")
    );

    let formData = { ...responses.formDatosPersonales };

    const inputsArray = Object.entries(formData);

    const formDatosPersonale = inputsArray.map(([key]) => [key, ""]);

    const formDatosPersonales = Object.fromEntries(formDatosPersonale);
    setResponses({
      ...responses,
      formDatosPersonales})
     
      setAgregar(false)
    setDisable(true);
    dispatch(cleanIds())
    dispatch(cleanIdsDoc())
    dispatch(clearIdsLic())
    dispatch(cleanIdsDom())
    dispatch(cleanIdFam())
    dispatch(cleanIdDe())
    setValueEmpl(false)
    setRefectch(!refetch)
    dispatch(setRefetch(!refetching))
    setModify(false)
  }
  async function deleteEmploye(id){
    try{
      await axios.delete(`http://54.243.192.82/api/Empleados/${id}`)
      .then((res)=>{
        if(res.data.isSuccess === true || res.data.status === 200){
          
          
          return swal({
            title: "Ok",
            text: "Empleado Eliminado con éxito",
            icon: "success",
          });
          ;
        }else{
          return swal({
            title: "Error",
            text: "Error al eliminar el Empleado, debe eliminar sus relaciones",
            icon: "error",
          });
        }

      })
    }catch(err){
      
      return swal({
        title: "Error",
        text: "Error al eliminar el Empleado, debe eliminar sus relaciones",
        icon: "error",
      });
    }
    cleanIdsGeneral();
  }

  async function deleteItems(objectRequest){
    const { urls, arrays } = objectRequest;
    let bodyPetitionEmpleadoGuarda = {
      "iDempleado": 0,
      "legajo": responses.formDatosPersonales?.numLegajo,
      "apellido":  responses.formDatosPersonales?.apellidoInput,
      "iDtipoDocumento":  responses.formDatosPersonales?.dniSelected,
      "nroDocumento":  responses.formDatosPersonales?.documentoInput,
      "cuil":  responses.formDatosPersonales?.inputCuil,
      "sexo": responses.formDatosPersonales?.inputSexo,
      "iDestadoCivil": responses.formDatosPersonales?.estadoCivilInput,
      "idNacionalidad": responses.formDatosPersonales?.nacionalidadesInput,
      "fechaNacimiento": responses.formDatosPersonales?.inputDateNac,
      "iDEstudios": responses.formDatosPersonales?.estudiosInput,
      "fechaIngreso": null,
      "fechaEfectiva": null,
      "iDCategoria": 0,
      "iDCargo": 0,
      "iDTareaDesempeñada": 0,
      "idCentrodeCosto":  0,
      "iDSectorDpto": 0,
      "iDModoContratacion": 0,
      "iDModoLiquidacion": 0,
      "iDFormadePago": 0,
      "idBanco": 0,
      "nroCtaBanco": 0,
      "cbu": null,
      "iDLugardePago": 0,
      "iDAFJP": 1,
      "idObraSocial": 0,
      "iDSindicato":0,
      "fechaEgreso": "2022-12-27T15:45:01.031Z",
      "iDMotivoEgreso": 4,
      "iDEsquema": 0,
      "iDEmpleador": 0,
      "nombres": responses.formDatosPersonales?.nombresInput,
      "idEstado": responses.formDatosPersonales?.estadosEmpleados,
      "idEmpresadeTelefonia": 2,
      "imagen": (responses.formDatosPersonales?.inputImage)?.substring(22) ? (responses.formDatosPersonales?.inputImage)?.substring(22) : "",
      "rutaFoto": null,
      "telFijo": responses.formDatosPersonales?.telefonoInput,
      "acuerdo": 0,
      "neto": null,
      "idPaisOrigen": responses.formDatosPersonales?.paisOrigenInput,
      "mail": responses.formDatosPersonales?.email,
      "telMovil": responses.formDatosPersonales?.movil,
      "tipoCuenta": null,
      "totalRemuneracion": null,
      "totalNeto": null,
      "tieneEmbargos": null,
      "tieneSumarioAdministrativo": null,
      "tieneLicenciaSinGoceHaberes": null,
      "obsEstudios": responses.formDatosPersonales?.observacionesEstudios,
      "obsFechaIngreso": "",
      "idAgrupamiento": 0,
      "idDireccion":0,
      "idInstrumentoLegal": 2
    }

    let bodyPetitionEmpleadoUpdate = {
      "iDempleado": empleadoUno.iDempleado && empleadoUno.iDempleado,
      "legajo": responses.formDatosPersonales?.numLegajo ?  responses.formDatosPersonales?.numLegajo : empleadoUno.legajo,
      "apellido":  responses.formDatosPersonales?.apellidoInput ? responses.formDatosPersonales?.apellidoInput  : empleadoUno.apellido,
      "iDtipoDocumento":  responses.formDatosPersonales?.dniSelected ? responses.formDatosPersonales?.dniSelected  : empleadoUno.iDtipoDocumento,
      "nroDocumento":  responses.formDatosPersonales?.documentoInput ? responses.formDatosPersonales?.documentoInput  : empleadoUno.nroDocumento,
      "cuil":  responses.formDatosPersonales?.inputCuil ? responses.formDatosPersonales?.inputCuil  : empleadoUno.cuil,
      "sexo": responses.formDatosPersonales?.inputSexo ? responses.formDatosPersonales?.inputSexo  : empleadoUno.sexo,
      "iDestadoCivil": responses.formDatosPersonales?.estadoCivilInput ? responses.formDatosPersonales?.estadoCivilInput  : empleadoUno.iDestadoCivil,
      "idNacionalidad": responses.formDatosPersonales?.nacionalidadesInput ? responses.formDatosPersonales?.nacionalidadesInput  : empleadoUno.iDnacionalidad,
      "fechaNacimiento": responses.formDatosPersonales?.inputDateNac ? responses.formDatosPersonales?.inputDateNac  : empleadoUno.fechaNacimiento,
      "iDEstudios": responses.formDatosPersonales?.estudiosInput ?  responses.formDatosPersonales?.estudiosInput : empleadoUno.iDestudios,
      "fechaIngreso": responses.formLiquidacion?.ingresoDateInput ? responses.formLiquidacion?.ingresoDateInput  : empleadoUno.fechaIngreso,
      "fechaEfectiva": responses.formLiquidacion?.inputDateEfectivo ? responses.formLiquidacion?.inputDateEfectivo  : empleadoUno.fechaEfectiva,
      "iDCategoria": responses.formLiquidacion?.inputCategoria ?  responses.formLiquidacion?.inputCategoria : empleadoUno.iDcategoria,
      "iDCargo": responses.formLiquidacion?.inputCargo ?  responses.formLiquidacion?.inputCargo : empleadoUno.iDcargo,
      "iDTareaDesempeñada": responses.formLiquidacion?.inputTareaDesempeñada ? responses.formLiquidacion?.inputTareaDesempeñada  : empleadoUno.iDtareaDesempeñada,
      "idCentrodeCosto": responses.formLiquidacion?.inputCentroCosto ?  responses.formLiquidacion?.inputCentroCosto  : empleadoUno.idCentrodeCosto,
      "iDSectorDpto": responses.formLiquidacion?.inputSectorDepto ? responses.formLiquidacion?.inputSectorDepto  : empleadoUno.iDsectorDpto,
      "iDModoContratacion": responses.formLiquidacion?.inputModoCOntratacion ? responses.formLiquidacion?.inputModoCOntratacion  : empleadoUno.iDmodoContratacion,
      "iDModoLiquidacion": responses.formLiquidacion?.inputModoLiquidacion ? responses.formLiquidacion?.inputModoLiquidacion  : empleadoUno.iDmodoLiquidacion,
      "iDFormadePago": responses.formLiquidacion?.inputFormaDePago ? responses.formLiquidacion?.inputFormaDePago  : empleadoUno.iDformadePago,
      "idBanco": responses.formLiquidacion?.inputBanco ? responses.formLiquidacion?.inputBanco  : empleadoUno.idbanco,
      "nroCtaBanco": responses.formLiquidacion?.inputNumCta ?  responses.formLiquidacion?.inputNumCta : empleadoUno.nroCtaBanco,
      "cbu": responses.formLiquidacion?.inputCBU ? responses.formLiquidacion?.inputCBU  : empleadoUno.cbu,
      "iDLugardePago": responses.formLiquidacion?.inputLugaresDePago ? responses.formLiquidacion?.inputLugaresDePago  : empleadoUno.iDlugardePago,
      "iDAFJP": 1,
      "idObraSocial": responses.formLiquidacion?.inputObraSocial ? responses.formLiquidacion?.inputObraSocial  : empleadoUno.iDobraSocial,
      "iDSindicato": responses.formLiquidacion?.sindicatosLiquidacion ? responses.formLiquidacion?.sindicatosLiquidacion  : empleadoUno.iDsindicato,
      "fechaEgreso": "2022-12-27T15:45:01.031Z",
      "iDMotivoEgreso": 4,
      "iDEsquema": responses.formLiquidacion?.selectOptionsId ? responses.formLiquidacion?.selectOptionsId  : empleadoUno.iDesquema,
      "iDEmpleador": responses.formLiquidacion?.inputEmpleadorLiquidacion ? responses.formLiquidacion?.inputEmpleadorLiquidacion  : empleadoUno.iDempleador,
      "nombres": responses.formDatosPersonales?.nombresInput ? responses.formDatosPersonales?.nombresInput  : empleadoUno.nombres,
      "idEstado": responses.formDatosPersonales?.estadosEmpleados ? responses.formDatosPersonales?.estadosEmpleados  : empleadoUno.idEstado,
      "idEmpresadeTelefonia": 2,
      "imagen": (responses.formDatosPersonales?.inputImage)?.substring(22) ? (responses.formDatosPersonales?.inputImage)?.substring(22) : empleadoUno?.imagen,
      "rutaFoto": null,
      "telFijo": responses.formDatosPersonales?.telefonoInput ? responses.formDatosPersonales?.telefonoInput  : empleadoUno.telFijo,
      "acuerdo": 0,
      "neto": responses.formLiquidacion?.inputTotalNeto ? responses.formLiquidacion?.inputTotalNeto  : empleadoUno.neto,
      "idPaisOrigen": responses.formDatosPersonales?.paisOrigenInput ? responses.formDatosPersonales?.paisOrigenInput  : empleadoUno.idPaisOrigen,
      "mail": responses.formDatosPersonales?.email ? responses.formDatosPersonales?.email  : empleadoUno.mail,
      "telMovil": responses.formDatosPersonales?.movil ? responses.formDatosPersonales?.movil  : empleadoUno.telMovil,
      "tipoCuenta": responses.formLiquidacion?.inputRadioAsidePagos ? responses.formLiquidacion?.inputRadioAsidePagos  : empleadoUno.tipoCuenta,
      "totalRemuneracion": responses.formLiquidacion?.inputTotalRemu ? responses.formLiquidacion?.inputTotalRemu  : empleadoUno.totalRemuneracion,
      "totalNeto": responses.formLiquidacion?.inputTotalNeto ? responses.formLiquidacion?.inputTotalNeto   : empleadoUno.totalNeto,
      "tieneEmbargos": responses.formLiquidacion?.inputCheckEmbargo ? responses.formLiquidacion?.inputCheckEmbargo  : empleadoUno.tieneEmbargos,
      "tieneSumarioAdministrativo": responses.formLiquidacion?.inputCheckSumAdministrativo ? responses.formLiquidacion?.inputCheckSumAdministrativo  : empleadoUno.tieneSumarioAdministrativo,
      "tieneLicenciaSinGoceHaberes": responses.formLiquidacion?.inputCheckLicSinGoce ? responses.formLiquidacion?.inputCheckLicSinGoce  : empleadoUno.tieneLicenciaSinGoceHaberes,
      "obsEstudios": responses.formDatosPersonales?.observacionesEstudios ? responses.formDatosPersonales?.observacionesEstudios  : empleadoUno.obsEstudios,
      "obsFechaIngreso": "",
      "idAgrupamiento": responses.formLiquidacion?.inputAgrupamiento ?  responses.formLiquidacion?.inputAgrupamiento : empleadoUno.idAgrupamiento,
      "idDireccion": responses.formLiquidacion?.inputDireccionLiquidacion ? responses.formLiquidacion?.inputDireccionLiquidacion  : empleadoUno.idDireccion,
      "idInstrumentoLegal": 2
    }
    try{

    if(tabIndex === 0 || tabIndex === 2 || tabIndex === 8){
      if(empleadoUno.iDempleado === 0 || empleadoUno.iDempleado === undefined){
        //#region Validation alerts

          if(!bodyPetitionEmpleadoGuarda.legajo){
              return swal({
                title: "Error",
                text: "Debe escribir el legajo del Empleado",
                icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.apellido){
            return swal({
              title: "Error",
              text: "Debe escribir el/los Apellido/s del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.nombres){
            return swal({
              title: "Error",
              text: "Debe escribir el/los Apellido/s del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.iDtipoDocumento){
            return swal({
              title: "Error",
              text: "Debe seleccionar el tipo de DNI del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.nroDocumento){
            return swal({
              title: "Error",
              text: "Debe escribir el N° de DNI del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.cuil){
            return swal({
              title: "Error",
              text: "Debe escribir el N° de CUIL del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.telFijo){
            return swal({
              title: "Error",
              text: "Debe escribir el N° de Telefono del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.iDestadoCivil){
            return swal({
              title: "Error",
              text: "Debe seleccionar el Estado Civil del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.idNacionalidad){
            return swal({
              title: "Error",
              text: "Debe seleccionar la Nacionalidad del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.idEstado){
            return swal({
              title: "Error",
              text: "Debe seleccionar el Estado del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.sexo){
            return swal({
              title: "Error",
              text: "Debe seleccionar el Sexo del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.idPaisOrigen){
            return swal({
              title: "Error",
              text: "Debe seleccionar el País de Origen del Empleado",
              icon: "error",
            })
          }
          if(!bodyPetitionEmpleadoGuarda.iDEstudios){
            return swal({
              title: "Error",
              text: "Debe seleccionar el Nivel de Estudios del Empleado",
              icon: "error",
            })
          }
          
        //#endregion

      }else{
          //#region validation Updates
          if(!bodyPetitionEmpleadoUpdate.legajo){

            return swal({
              title: "Error",
              text: "Debe escribir el legajo del Empleado",
              icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.apellido){
          return swal({
            title: "Error",
            text: "Debe escribir el/los Apellido/s del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.nombres){
          return swal({
            title: "Error",
            text: "Debe escribir el/los Apellido/s del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.iDtipoDocumento){
          return swal({
            title: "Error",
            text: "Debe seleccionar el tipo de DNI del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.nroDocumento){
          return swal({
            title: "Error",
            text: "Debe escribir el N° de DNI del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.cuil){
          return swal({
            title: "Error",
            text: "Debe escribir el N° de CUIL del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.iDestadoCivil){
          return swal({
            title: "Error",
            text: "Debe seleccionar el Estado Civil del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.idNacionalidad){
          return swal({
            title: "Error",
            text: "Debe seleccionar la Nacionalidad del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.idEstado){
          return swal({
            title: "Error",
            text: "Debe seleccionar el Estado del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.sexo){
          return swal({
            title: "Error",
            text: "Debe seleccionar el Sexo del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.idPaisOrigen){
          return swal({
            title: "Error",
            text: "Debe seleccionar el País de Origen del Empleado",
            icon: "error",
          })
        }
        if(!bodyPetitionEmpleadoUpdate.iDEstudios){
          return swal({
            title: "Error",
            text: "Debe seleccionar el Nivel de Estudios del Empleado",
            icon: "error",
          })
        }
          //#endregion
      }


          if(empleadoUno.iDempleado === 0 || empleadoUno.iDempleado === undefined){
             await axios.post(urls.urlEmpleadoGuarda, bodyPetitionEmpleadoGuarda, {
              headers: {
                'Access-Control-Allow-Origin' : '*'
              }})
             .then((res)=>{
                setRefectch(!refetch);
                setSaveEmpleado(!saveEmpleado)
                setDisable(true)
                setModify(false)
                setAgregar(false)
                if(res.data.statusCode === 200){
                  return swal({
                  title: "Ok",
                  text: "Empleado Guardado con éxito",
                  icon: "success",
                  })
                }else{
                  swal({
                    title: "Error",
                    text: "Error al guardar el Empleado",
                    icon: "error",
                    })
                }
              
             })
          }else{
            await axios.put(urls.urlEmpleadoGuarda, bodyPetitionEmpleadoUpdate)
            .then((res)=>{
              if(res.status === 200){     
                 
                dispatch(updateEmploye(res.data.result))
                dispatch(setRefetch(!refetching))
                setRefectch(!refetch);
                setDisable(true)
                setModify(false)
                setAgregar(false)
                 return swal({
                  title: "Ok",
                  text: "Empleado Modificado con éxito",
                  icon: "success",
              })
              }
            })
            arrays[3].map(async (id)=>{
        
              let array = {
                "arrayList": [
                  id
                ]
              }
              await axios.delete(`${urls.urlDOmicilioElimina}${id}`, {headers : {'Content-Type': 'application/json;'}})
              .then((res) => {
                
                if(res.data.statusCode === 200){
                  dispatch(setRefetch(!refetching))
                  setDisable(true)
                  setRefectch(!refetch)
                  dispatch(deleteOneDomicilioSelect(id))
                  dispatch(deleteDomicilio(id));
                  setModify(false)
                  setAgregar(false)
                  const newResponse = {...responses.formDatosPersonales};
                  newResponse["inputPredeterminado"] = false;
                  newResponse["inputCalleDomicilios"] = 0;
                  newResponse["inputNumCalle"] = "";
                  newResponse["inputPisoCalle"] = "";
                  newResponse["inputProvinciaDomicilios"] = 0;
                  newResponse["inputDepartamentosDomicilios"] = 0;
                  newResponse["inputLocalidadesDomicilios"] = 0;
                  newResponse["inputBarriosDomicilios"] = 0;
                  setResponses({
                    ...newResponse
                  });  
                  return swal({
                    title : "Ok",
                    text : "Domicilio eliminado con éxito",
                    icon : "success"
                  })
                }else{
                  return swal({
                    title : "Error",
                    text : "Error al eliminar el Domicilio",
                    icon : "error"
                  })
                }
                setRefectch(!refetch)
              })
           });
          }
    }else{
      switch(urls){
        case urls.urlTRabajoDelete : {
            arrays.idsTrabajosAnterioresDelete.map(async (id)=>{
              await axios.delete(`${urls.urlTRabajoDelete}${id}`)
              .then((res) => {})
            })
        }
        case urls.urlDocDelte : {
          arrays.documentacionDelte.map(async (id)=>{
            await axios.delete(`${urls.urlDocDelte}${id}`)
            .then((res) =>  swal({
              title: "Ok",
              text: "Documentacion eliminada con éxito",
              icon: "success",
          }))
          })}
        case urls.urlLicDelete : {
           arrays.licenciasDelete.map(async (id)=>{
             await axios.delete(`${urls.urlLicDelete}${id}`)
             .then((res) => {})
          })}
        case urls.urlDOmicilioElimina : {
          arrays.idDomiciliosArray.map(async (id)=>{

            await axios.delete(`${urls.urlDOmicilioElimina}${id}`)
            .then((res) => {
           
            })
          })}
          case urls.urlDeleteFAmiliar : {
            arrays.arraysFamiliares.map(async (id)=>{
              await axios.delete(`${urls.urlDeleteFAmiliar}${id}`)
              .then((res) => {})
            })}
            case urls.urlDatoExtraElimina : {
              arrays.arrayIdsDatoExtra.map(async (id)=>{
                await axios.delete(`${urls.urlDatoExtraElimina}${id}`)
                .then((res) => {})
              })
      }
        default : {
            arrays[0].map(async (id)=>{
              let array = {
                "arrayList": [
                  id
                ]
              }
              await axios.delete(`${urls.urlTRabajoDelete}${id}`, {data : array, headers : {'Content-Type': 'application/json;'}})
              .then((res) => 
              {
                if(res.status === 200){
                  setDisable(true);
                  swal({
                    title: "Ok",
                    text: "Trabajo Anterior eliminado con éxito",
                    icon: "success",
                    })
                  }
                })              
            });
            arrays[1].map(async (id)=>{
              await axios.delete(`${urls.urlDocDelte}${id}`)
              .then((res) => { 
                if(res.status === 200){
                  setDisable(true);
                  swal({
                      title: "Ok",
                      text: "Documentacion eliminada con éxito",
                      icon: "success",
                  })
                }
              })
            });
            arrays[2].map(async (id)=>{
              let array = {
                "arrayList": [
                  id
                ]
              }
              try{
                await axios.delete(`${urls.urlLicDelete}${id}`, {data : array, headers : {'Content-Type': 'application/json;','Access-Control-Allow-Origin' : '*'}})
              .then((res) => {

                    if(res.status === 200){
                      setDisable(true);
                    return swal({
                      title: "Ok",
                      text: "Licencia eliminada con éxito",
                      icon: "success",
                  })
                  }
                }
              )
              }catch(err){
                setRefectch(!refetch);
                return swal({
                  title: "Error",
                  text: "No se puede elimiar una Licencia que tiene asignado un Detalle",
                  icon: "error",
              })
              }

          });
              arrays[4].map(async (id)=>{
                await axios.delete(`${urls.urlDeleteFAmiliar}${id}`)
                .then((res) => {
                  if(res.status === 200){
                    setDisable(true);
                  swal({
                    title: "Ok",
                    text: "Familiar eliminado con éxito",
                    icon: "success",
                })
                }} )
            });
              arrays[5].map(async (id)=>{
                await axios.delete(`${urls.urlDatoExtraElimina}${id}`)
                .then((res) => {if(res.status === 200){
                  setDisable(true);
                  swal({
                    title: "Ok",
                    text: "Dato Extra eliminado con éxito",
                    icon: "success",
                })
                }} )
            });
        }
      }
    }

    }catch(err){
        //codigo de error
        swal({
            title: "Error",
            text: "Error al guardar/actualizar el empleado",
            icon: "error",
        })
    }
}
const getTabComponent = (tabIndex) => {
  switch (tabIndex) {
    case 0:
      return (
        <DatosPersonales
          empleados={empleados}
          disableEstado={disableEstado}
          image={image}
          disable={disable}
          setDisable={setDisable}
          responses={responses}
          setResponses={setResponses}
          valueempl={valueempl}
          domiciliosEmpleados={domiciliosEmpleados}
          setRefectch={setRefectch}
          refetch={refetch}
          handleTabChange={handleTabChange}
          tabIndex={tabIndex}
          ImageSelectedPrevious={ImageSelectedPrevious}
          setImageSelectedPrevious={setImageSelectedPrevious}
          modify={modify}
          agregar = {agregar}
          handleClickRef={handleClickRef}
          referencia={referencia}
        />
      );
    case 1:
      return (
        <Familia
          disable={disable}
          setDisable={setDisable}
          responses={responses}
          setResponses={setResponses}
          setRefetch={setRefectch}
          refetch={refetch}
          modify={modify}
          agregar = {agregar}
        />
      )
    case 2 :
      return(
        <Liquidacion
            disable={disable}
            setDisable={setDisable}
            responses={responses}
            setResponses={setResponses}
            modify={modify}
            agregar = {agregar}
          />
      )
    case 3 :
      return(
        <AdicLiquidacion
          disable={disable}
          setDisable={setDisable}
          responses={responses}
          setResponses={setResponses}
          modify={modify}
          agregar = {agregar}
        />
      )
    case 4 :
      return(
        <TrabajosAnteriores
        setRefetch={setRefectch}
        refetch={refetch}
        disable={disable}
        setDisable={setDisable}
        responses={responses}
        setResponses={setResponses}
        modify={modify}
          agregar = {agregar}
      />
      )
    case 5 :
      return(
        <Documentacion
          setRefectch={setRefectch}
          refetch={refetch}
          disable={disable}
          setDisable={setDisable}
          responses={responses}
          setResponses={setResponses}
          modify={modify}
          agregar = {agregar}
        />
      )
      case 6 :
        return(
          <Licencias
            setRefectch={setRefectch}
            refetch={refetch}
            setLicenciaEmpladoDatos={setLicenciaEmpladoDatos}
            licenciaEmpleadoDatos={licenciaEmpleadoDatos}
            disable={disable}
            setDisable={setDisable}
            responses={responses}
            setResponses={setResponses}
            modify={modify}
          agregar = {agregar}
          />
        )
      case 7 :
        return(
          <Extras
            setDatosExtraEmpleado={setDatosExtraEmpleado}
            datosExtraEmpleado={datosExtraEmpleado}
            disable={disable}
            setDisable={setDisable}
            responses={responses}
            setResponses={setResponses}
            refetch={refetch}
            setRefetch={setRefectch}
            modify={modify}
          agregar = {agregar}
          />
        )
      ;default:
      return null;
  }
};
  return (
    <>
    
    {  localStorage.getItem('token') ? <div className="container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-3">
          <Browser setRenderButtons={setRenderButtons} renderButtons={renderButtons} getEmpleados={getEmpleados} modify={modify} setModify={setModify} deleteEmploye={deleteEmploye} setRefectch={setRefectch} refetch={refetch} disable={disable} setDisable={setDisable} setValueEmpl={setValueEmpl} responses={responses} setResponses={setResponses} agregar={agregar}  setAgregar={setAgregar} handleClickRef={handleClickRef} referencia={referencia} modalOpen={modalOpen} 
									setModalOpen={setModalOpen} />
        </div>
        <div className="col-xl-9 col-lg-9 col-md-9 ">
          <Navbar  handleTabChange={handleTabChange} tabIndex={tabIndex} />
          {(tabIndex === 0 || tabIndex === 8) && (
            <DatosPersonales
              empleados={empleados}
              disableEstado={disableEstado}
              image={image}
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
              valueempl ={valueempl}
              domiciliosEmpleados={domiciliosEmpleados}
              setRefectch={setRefectch}
              refetch={refetch}
              handleTabChange={handleTabChange}
              tabIndex={tabIndex}
              ImageSelectedPrevious={ImageSelectedPrevious}
              setImageSelectedPrevious={setImageSelectedPrevious}
              agregar={agregar}  
              setAgregar={setAgregar}
              handleClickRef={handleClickRef}
              referencia={referencia}
              modify={modify}
            />
          )}
          {tabIndex === 1 && (
            <Familia
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
              setRefetch={setRefectch}
              refetch={refetch}
              agregar={agregar}  
              setAgregar={setAgregar}
              handleClickRef={handleClickRef}
              referencia={referencia}
            />
          )}
          {tabIndex === 2 && (
            <Liquidacion
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
              modify={modify}
              agregar={agregar}  
              setAgregar={setAgregar}
            />
          )}
          {tabIndex === 3 && (
            <AdicLiquidacion
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
              modify={modify}
            />
          )}
          {tabIndex === 4 && (
            <TrabajosAnteriores
              setRefetch={setRefectch}
              refetch={refetch}
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
            />
          )}
          {tabIndex === 5 && (
            <Documentacion
              setRefectch={setRefectch}
              refetch={refetch}
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
            />
          )}
          {tabIndex === 6 && (
            <Licencias
              setRefectch={setRefectch}
              refetch={refetch}
              setLicenciaEmpladoDatos={setLicenciaEmpladoDatos}
              licenciaEmpleadoDatos={licenciaEmpleadoDatos}
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
            />
          )}
          {tabIndex === 7 && (
            <Extras
            setDatosExtraEmpleado={setDatosExtraEmpleado}
            datosExtraEmpleado={datosExtraEmpleado}
              disable={disable}
              setDisable={setDisable}
              responses={responses}
              setResponses={setResponses}
              refetch={refetch}
              setRefetch={setRefectch}
            />
          )}
        </div>
      </div>
      <div className="d-flex flex-row-reverse btnEmpl w-100 gap-2">
        <button className="btn btn-danger btn-sm " onClick={()=> {cleanIdsGeneral(); handleTabChange(0)}}>
          Cancelar
        </button>
        <button className="btn btn-success btn-sm " onClick={()=> {deleteItems( objectRequest); handleTabChange(0)}}>Aceptar</button>
      </div>
      <Footer setTokenDef={setTokenDef} tokenDef={tokenDef}/>
    </div> : <ErrorPage loading={loading}/>}
    </>
  );
};
export default Empleados;
