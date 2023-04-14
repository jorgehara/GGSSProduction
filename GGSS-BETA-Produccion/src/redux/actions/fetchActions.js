import { ADD_TAREASDESEMPEÑADAS, ADD_CARGOS, ADD_ESTADOS, ADD_ESTADOSCIVILES, ADD_ESTUDIOS, ADD_PAISES, ADD_TIPOSDOCUMENTO, AXIOS_ERROR, AXIOS_SUCCESS, SET_LOADING, ADD_PARENTESCOS, ADD_FORMASPAGO, ADD_MODOSCONTRATACION, ADD_MODOSLIQUIDACION, ADD_EMPLEADORES, ADD_DOMICLIOS, ADD_CALLES, ADD_DEPARTAMENTOS, ADD_BARRIOS, ADD_PROVINCIAS, ADD_LOCALIDADES, ADD_FAMILIARES, ADD_NEW_FAMILIAR, DELETE_ONE_FAMILIAR, ADD_CONVENIOS, ADD_CATEGORIAS, ADD_AGRUPAMIENTOS, ADD_CENTRO_COSTO, ADD_SECTOR_DEPTO, ADD_OBRAS_SOCIALES, ADD_LUGARES_DE_PAGO, ADD_BANCOS, ADD_DIRECCIONES, ADD_SINDICATOS, ADD_ESQUEMAS, ADD_NEW_ESCI, ADD_NEW_ESTUDIO, GET_ID_ESCI, DELETE_ESCI, GET_ID_ESTUDIO, DELETE_ESTUDIO, ADD_NEW_TIPODOC, GET_ID_TIPODOC, DELETE_TIPODOC, PUT_ESCI, PUT_ESTUDIO, PUT_TIPODOC, ADD_NEW_PARENTESCO, GET_ID_PARENTESCO, DELETE_PARENTESCO, PUT_PARENTESCO, ADD_NEW_ESTADO, GET_ID_ESTADO, DELETE_ESTADO, PUT_ESTADO,  GET_ID_FORMAPAGO, DELETE_FORMAPAGO, PUT_FORMAPAGO, GET_ID_CARGO, DELETE_CARGO, ADD_NEW_CARGO, PUT_CARGO, ADD_NEW_TAREA, GET_ID_TAREA, DELETE_TAREA, PUT_TAREA, ADD_LICENCIAS_EMPLEADOS, UPDATE_LICENCIA, ADD_NEW_LICENCIA, DELETE_LICENCIA, DISABLED_INPUTS, ADD_NUMERADORES, ADD_DOCU_EMPL, ADD_DATOS_EXTRAS, ADD_INSTRUM_LEGALES, ADD_CONCEPTOS, ADD_NEW_DOC, DELETE_DOC, ADD_ADIC_LIQUIDACION, ADD_ONE_DE, DELETE_DOMICILIO, SAVE_DATOS_EXTRAS_EMPLEADOS, ACTUALIZA_DELETE,  ACTUALIZA_DELETE_FORMAS_PAGO,  ACTUALIZA_CREATE_FORMAS_PAGO, ACTUALIZA_UPDATE_FORMAS_PAGO, GET_PAR_SUELDOS, ACTUALIZA_DELETE_CARGOS, ACTUALIZA_CREATE_CARGOS, ACTUALIZA_UPDATE_CARGOS, ACTUALIZA_DELETE_TAREAS, ACTUALIZA_CREATE_TAREAS, ACTUALIZA_UPDATE_TAREAS, ACTUALIZA_DELETE_MODCONTRATACION, ACTUALIZA_CREATE_MODCONTRATACION, ACTUALIZA_UPDATE_MODCONTRATACION, ACTUALIZA_DELETE_PARENTESCO, ACTUALIZA_CREATE_PARENTESCO, ACTUALIZA_UPDATE_PARENTESCO, ACTUALIZA_DELETE_PAISES, ACTUALIZA_CREATE_PAISES, ACTUALIZA_UPDATE_PAISES, ACTUALIZA_CREATE_EC, ACTUALIZA_UPDATE_EC, ACTUALIZA_DELETE_ESTUDIOS, ACTUALIZA_CREATE_ESTUDIOS, ACTUALIZA_UPDATE_ESTUDIOS, ACTUALIZA_DELETE_TIPOSD, ACTUALIZA_CREATE_TIPOSD, ACTUALIZA_UPDATE_TIPOSD, ACTUALIZA_DELETE_ESTADOS, ACTUALIZA_CREATE_ESTADOS, ACTUALIZA_UPDATE_ESTADOS, ACTUALIZA_DELETE_CALLES, ACTUALIZA_CREATE_CALLES, ACTUALIZA_UPDATE_CALLES, ACTUALIZA_UPDATE_MODLIQUIDACION, ACTUALIZA_CREATE_MODLIQUIDACION, ACTUALIZA_DELETE_MODLIQUIDACION, ACTUALIZA_DELETE_PROVINCIAS, ACTUALIZA_CREATE_PROVINCIAS, ACTUALIZA_UPDATE_PROVINCIAS, ACTUALIZA_DELETE_DPTOS, ACTUALIZA_CREATE_DPTOS, ACTUALIZA_UPDATE_DPTOS, ACTUALIZA_DELETE_LOCALIDADES, ACTUALIZA_CREATE_LOCALIDADES, ACTUALIZA_UPDATE_LOCALIDADES, ACTUALIZA_DELETE_BARRIOS, ACTUALIZA_CREATE_BARRIOS, ACTUALIZA_UPDATE_BARRIOS, GET_ARCHIVOS_ADJUNTOS, ARCHIVOS_DOC_EMPLEADO, ADD_NEW_ARCHIVO, ARCHIVO_DOC_SELECTED, ACTUALIZA_UPDATE_ARCHIVO, ACTUALIZA_DELETE_ARCHIVO, UPDATE_DOMICILIO, GET_MOTIVOS_EGRESO, ACTUALIZA_DELETE_DOCU, ACTUALIZA_CREATE_DOCU, ACTUALIZA_UPDATE_DOCU } from "../types/fetchTypes";


export const setLoading = (payload) =>{
    return {
        type : SET_LOADING,
        payload,
    };
}
export const axiosSuccess = (payload) =>{
    return {
        type : AXIOS_SUCCESS,
        payload,
    };
}
export const axiosError = (payload) =>{
    return {
        type : AXIOS_ERROR,
        payload,
    };
}
export const getParSueldos =(payload)=>{
    return{
        type :  GET_PAR_SUELDOS,
        payload
    }
}
// export const actualizaDeleteEstadosCiviles=(payload)=>{
//     return{
//         type : ACTUALIZA_DELETE_ESTADOS_CIVILES, 
//         payload
//     }
// } 
//ACTIONS ESTADOS
export const addEstados = (payload) =>{
    return {
        type : ADD_ESTADOS,
        payload,
    };
}
export const addEstadosCiviles = (payload) =>{
    return {
        type : ADD_ESTADOSCIVILES,
        payload,
    };
}
export const addPaises = (payload) =>{
    return {
        type : ADD_PAISES,
        payload,
    };
}
export const addEstudios = (payload) =>{
    return {
        type : ADD_ESTUDIOS,
        payload,
    };
}
export const addTiposDocumento = (payload) =>{
    return {
        type : ADD_TIPOSDOCUMENTO,
        payload,
    };
}
export const addCargos = (payload) =>{
    return {
        type : ADD_CARGOS,
        payload,
    };
}
export const addTareasDesempeñadas = (payload) =>{
    return {
        type : ADD_TAREASDESEMPEÑADAS,
        payload,
    };
}
export const addParentescos = (payload) =>{
    return {
        type : ADD_PARENTESCOS,
        payload,
    };
}
export const addFormasPago = (payload) =>{
    return {
        type : ADD_FORMASPAGO,
        payload,
    };
}
export const addModosContratacion = (payload) =>{
    return {
        type : ADD_MODOSCONTRATACION,
        payload,
    };
}
export const addModosLiquidacion = (payload) =>{
    return {
        type : ADD_MODOSLIQUIDACION,
        payload,
    };
}
export const addEmpleadores = (payload) =>{
    return {
        type : ADD_EMPLEADORES,
        payload,
    };
}

export const addDomicilios = (payload) =>{
    return {
        type : ADD_DOMICLIOS,
        payload,
    };
}
export const addCalles = (payload) =>{
    return {
        type : ADD_CALLES,
        payload,
    };
}
export const addDepartamentos = (payload) =>{
    return {
        type : ADD_DEPARTAMENTOS,
        payload,
    };
}
export const addBarrios = (payload) =>{
    return {
        type : ADD_BARRIOS,
        payload,
    };
}
export const addProvincias = (payload) =>{
    return {
        type : ADD_PROVINCIAS,
        payload,
    };
}
export const addLocalidades = (payload) =>{
    return {
        type : ADD_LOCALIDADES,
        payload,
    };
}
export const addFamiliares =(payload)=>{
    return {
        type : ADD_FAMILIARES,
        payload,
    };
}
export const deleteOneFamiliar=(payload)=>{
    return {
        type : DELETE_ONE_FAMILIAR,
        payload
    }
}
export const addNewFamiliar =(payload)=>{
    return {
        type : ADD_NEW_FAMILIAR,
        payload
    }
}
export const addConvenios =(payload)=>{
    return {
        type : ADD_CONVENIOS,
        payload
    }
}
export const addCategorias =(payload)=>{
    return {
        type: ADD_CATEGORIAS,
        payload,
    };
}
export const addAgrupamientos=(payload)=>{
    return{
        type : ADD_AGRUPAMIENTOS,
        payload
    }
}
export const addCentroDeCosto=(payload)=>{
    return {
        type: ADD_CENTRO_COSTO,
        payload,
    };
}
export const addSectorDepto=(payload)=>{
    return {
        type: ADD_SECTOR_DEPTO,
        payload,
    };
}
export const deleteDomicilio=(payload)=>{
    return{
        type : DELETE_DOMICILIO,
        payload
    }
}
export const addObrasSociales=(payload)=>{
    return {
        type : ADD_OBRAS_SOCIALES,
        payload,
    };
}
export const addLugaresDePago=(payload)=>{
    return {
        type : ADD_LUGARES_DE_PAGO,
        payload,
    };
}
export const addBancos =(payload)=>{
    return {
        type : ADD_BANCOS,
        payload,
    };
}
export const addDirecciones=(payload)=>{
    return{
        type : ADD_DIRECCIONES,
        payload,
    };
}
export const addSindicatos=(payload)=>{
    return{
        type : ADD_SINDICATOS,
        payload,
    };
}
export const addEsquemas=(payload)=>{
    return {
        type : ADD_ESQUEMAS,
        payload,
    };
}


// --------- POST ACTIONS --------- ,,,,,,,,,,,,,,,,,,,,,,,,,
export const addNewEstadoCivil = (payload) => {
    return {
        type : ADD_NEW_ESCI,
        payload,
    };
}

export const addNewEstudio = (payload) => {
    return {
        type: ADD_NEW_ESTUDIO,
        payload,
    }
}

export const addNewTipoDoc = (payload) => {
    return {
        type: ADD_NEW_TIPODOC,
        payload
    }
}

export const addNewParentesco = (payload) => {
    return {
        type: ADD_NEW_PARENTESCO,
        payload
    }
}

export const addNewEstado = (payload) => {
    return {
        type: ADD_NEW_ESTADO,
        payload
    }
}

// export const addNewFormaPago = (payload) => {
//     return {
//         type: ADD_NEW_FORMAPAGO,
//         payload
//     }
// }

export const addNewCargo = (payload) => {
    return {
        type: ADD_NEW_CARGO,
        payload
    }
}

export const addNewTarea = (payload) => {
    return {
        type: ADD_NEW_TAREA,
        payload
    }
}
export const addNewDoc=(payload)=>{
    return{
        type : ADD_NEW_DOC,
        payload,
    }
}
export const deleteDocu=(payload)=>{
    return{
        type : DELETE_DOC,
        payload
    }
}
export const addAdicLiquidacion=(payload)=>{
    return{
        type: ADD_ADIC_LIQUIDACION,
        payload
    }
}


// -------- DELETE ACTIONS -----------

//estados civiles
export const getIdEstadoCivil = (payload) => {
    return{
        type : GET_ID_ESCI,
        payload,
    };
}
export const addDatosExtras=(payload)=>{
    return {
        type: ADD_DATOS_EXTRAS,
        payload,
    };
}
export const addInstrumLegales=(payload)=>{
    return{
        type : ADD_INSTRUM_LEGALES,
        payload,
    };
}
export const deleteEstadoCivil = (payload) => {
    return{
        type : DELETE_ESCI,
        payload
    }
}

//estudios

export const getIdEstudio = (payload) => {
    return{
        type : GET_ID_ESTUDIO,
        payload
    }
}
export const deleteEstudio = (payload) => {
    return{
        type: DELETE_ESTUDIO,
        payload
    }
}

// tipos de documento

export const getIdTipoDoc = (payload) => {
    return{
        type: GET_ID_TIPODOC,
        payload
    }
}
export const deleteTipoDoc = (payload) => {
    return{
        type: DELETE_TIPODOC,
        payload
    }
}

// parentescos

export const getIdParentesco = (payload) => {
    return {
        type: GET_ID_PARENTESCO,
        payload
    }
}
export const deleteParentesco = (payload) => {
    return {
        type: DELETE_PARENTESCO,
        payload
    }
}

// estados para los empleados

export const getIdEstado = (payload) => {
    return {
        type: GET_ID_ESTADO,
        payload
    }
}
export const deleteEstado = (payload) => {
    return {
        type: DELETE_ESTADO,
        payload
    }
}

// formas de pago

export const getIdFormaPago = (payload) => {
    return {
        type: GET_ID_FORMAPAGO,
        payload
    }
}
export const deleteFormaPago = (payload) => {
    return {
        type: DELETE_FORMAPAGO,
        payload
    }
}

// cargos
export const getIdCargo = (payload) => {
    return {
        type: GET_ID_CARGO,
        payload
    }
}
export const deleteCargo = (payload) => {
    return {
        type: DELETE_CARGO,
        payload
    }
}

// tareas desempeñadas
export const getIdTarea = (payload) => {
    return {
        type: GET_ID_TAREA,
        payload
    }
}
export const addDocumentacionEmpleados=(payload)=>{
    return{
        type : ADD_DOCU_EMPL,
        payload
    };
}
export const deleteTarea = (payload) => {
    return {
        type: DELETE_TAREA,
        payload
    }
}
export const addNumeradores=(payload)=>{
    return {
        type :ADD_NUMERADORES,
        payload,
    }
}
// -------- PUT ACTIONS -----------

export const putEstadoCivil = (payload) => {
    return{
        type: PUT_ESCI,
        payload
    }
}

export const putEstudio = (payload) => {
    return{
        type: PUT_ESTUDIO,
        payload
    }
}

export const putTipoDoc = (payload) => {
    return{
        type: PUT_TIPODOC,
        payload
    }
}

export const putParentesco = (payload) => {
    return {
        type: PUT_PARENTESCO,
        payload
    }
}
export const addConceptos=(payload)=>{
    return{
        type : ADD_CONCEPTOS,
        payload,
    };
}
export const addLicenciaEmpleados=(payload)=>{
    return {
        type : ADD_LICENCIAS_EMPLEADOS,
        payload,
    };
}
export const addNewLicencia=(payload)=>{
    return{
        type: ADD_NEW_LICENCIA,
        payload,
    };
}
export const updateLicencia=(payload)=>{
    return{
        type: UPDATE_LICENCIA,
        payload,
    };
}
export const deleteLicencia=(payload)=>{
    return{
        type: DELETE_LICENCIA,

    }
}

export const putEstado = (payload) => {
    return {
        type: PUT_ESTADO,
        payload
    }
}

export const putFormaPago = (payload) => {
    return {
        type: PUT_FORMAPAGO,

        payload
    }
}
export const addOneDatoExtra=(payload)=>{
    return {
        type : ADD_ONE_DE,
        payload
    }
}
export const putCargo = (payload) => {
    return {
        type: PUT_CARGO,
        payload
    }
}

export const putTarea = (payload) => {
    return {
        type: PUT_TAREA,
        payload,
    }
}
export const saveDatosExtrasEmpleados=(payload)=>{
    return{
        type : SAVE_DATOS_EXTRAS_EMPLEADOS,
        payload
    }
}
//Estados Civiles
export const actualizaDelete = (payload) => {
    return {
        type: ACTUALIZA_DELETE,
        payload
    };
}
// export const actualizaModificarESCI = (payload) => {
//     return {
//         type: ACTUALIZA_MODIFICAR_ESCI,
//         payload
//     };
// }

//Formas de Pago
export const actualizaDeleteFormasdePago = (payload) => {
    return {
        type: ACTUALIZA_DELETE_FORMAS_PAGO,
        payload
    };
}

export const actualizaCreaFormasdePago = (payload) => {
    return {
        type: ACTUALIZA_CREATE_FORMAS_PAGO,
        payload
    };
}
export const actualizaCreateEstadosCiviles=(payload)=>{
    return{
        type: ACTUALIZA_CREATE_EC,
        payload
    }
}
export const actualizaUpdateEstadosCiviles=(payload)=>{
    return{
        type: ACTUALIZA_UPDATE_EC,
        payload
    }
}


//Estudios
export const actualizaCreateEstudios = (payload) => {
    return {
        type: ACTUALIZA_CREATE_ESTUDIOS,
        payload
    };
}
export const actualizaUpdateEstudios=(payload)=>{
    return{
        type: ACTUALIZA_UPDATE_ESTUDIOS,
        payload
    }
}
export const actualizaDeleteEstudios=(payload)=>{
    return{
        type: ACTUALIZA_DELETE_ESTUDIOS,
        payload
    }
}

//Estudios
export const actualizaCreateTiposDoc = (payload) => {
    return {
        type: ACTUALIZA_CREATE_TIPOSD,
        payload
    };
}
export const actualizaUpdateTiposDoc=(payload)=>{
    return{
        type: ACTUALIZA_UPDATE_TIPOSD,
        payload
    }
}
export const actualizaDeleteTiposDoc=(payload)=>{
    return{
        type: ACTUALIZA_DELETE_TIPOSD,
        payload
    }
}

//Estados
export const actualizaCreateEStados = (payload) => {
    return {
        type: ACTUALIZA_CREATE_ESTADOS,
        payload
    };
}
export const actualizaUpdateEStados=(payload)=>{
    return{
        type: ACTUALIZA_UPDATE_ESTADOS,
        payload
    }
}
export const actualizaDeleteEStados=(payload)=>{
    return{
        type: ACTUALIZA_DELETE_ESTADOS,
        payload
    }
}

//Calles
export const actualizaCreateCalles = (payload) => {
    return {
        type: ACTUALIZA_CREATE_CALLES,
        payload
    };
}
export const actualizaUpdateCalles=(payload)=>{
    return{
        type: ACTUALIZA_UPDATE_CALLES,
        payload
    }
}
export const actualizaDeleteCalles=(payload)=>{
    return{
        type: ACTUALIZA_DELETE_CALLES,
        payload
    }
}

export const actualizaModificarFormasdePago = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_FORMAS_PAGO,
        payload
    };
}
//Cargos
export const actualizaDeleteCargos = (payload) => {
    return {
        type: ACTUALIZA_DELETE_CARGOS,
        payload
    };
}

export const actualizaCreaCargos = (payload) => {
    return {
        type: ACTUALIZA_CREATE_CARGOS,
        payload
    };
}

export const actualizaModificarCargos = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_CARGOS,
        payload
    };
}
//Tareas Desempeñadas
export const actualizaDeleteTareas = (payload) => {
    return {
        type: ACTUALIZA_DELETE_TAREAS,
        payload
    };
}

export const actualizaCreaTareas = (payload) => {
    return {
        type: ACTUALIZA_CREATE_TAREAS,
        payload
    };
}

export const actualizaModificarTareas = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_TAREAS,
        payload
    };
}

//Modos de Contratacion
export const actualizaDeleteModContratacion = (payload) => {
    return {
        type: ACTUALIZA_DELETE_MODCONTRATACION,
        payload
    };
}

export const actualizaCreaModContratacion = (payload) => {
    return {
        type: ACTUALIZA_CREATE_MODCONTRATACION,
        payload
    };
}

export const actualizaModificarModContratacion = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_MODCONTRATACION,
        payload
    };
}

//Modos de Liquidacion
export const actualizaDeleteModLiquidacion = (payload) => {
    return {
        type: ACTUALIZA_DELETE_MODLIQUIDACION,
        payload
    };
}

export const actualizaCreaModLiquidacion = (payload) => {
    return {
        type: ACTUALIZA_CREATE_MODLIQUIDACION,
        payload
    };
}

export const actualizaModificarModLiquidacion = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_MODLIQUIDACION,
        payload
    };
}
//Parentescos
export const actualizaDeleteParentesco = (payload) => {
    return {
        type: ACTUALIZA_DELETE_PARENTESCO,
        payload
    };
}

export const actualizaCreaParentesco = (payload) => {
    return {
        type: ACTUALIZA_CREATE_PARENTESCO,
        payload
    };
}

export const actualizaModificarParentesco = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_PARENTESCO,
        payload
    };
}

//Paises
export const actualizaDeletePaises = (payload) => {
    return {
        type: ACTUALIZA_DELETE_PAISES,
        payload
    };
}

export const actualizaCreaPaises = (payload) => {
    return {
        type: ACTUALIZA_CREATE_PAISES,
        payload
    };
}

export const actualizaModificarPaises = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_PAISES,
        payload
    };
}

//Provincias
export const actualizaDeleteProvincias = (payload) => {
    return {
        type: ACTUALIZA_DELETE_PROVINCIAS,
        payload
    };
}

export const actualizaCreaProvincias = (payload) => {
    return {
        type: ACTUALIZA_CREATE_PROVINCIAS,
        payload
    };
}

export const actualizaModificarProvincias = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_PROVINCIAS,
        payload
    };
}
//Dptos
export const actualizaDeleteDptos = (payload) => {
    return {
        type: ACTUALIZA_DELETE_DPTOS,
        payload
    };
}

export const actualizaCreaDptos = (payload) => {
    return {
        type: ACTUALIZA_CREATE_DPTOS,
        payload
    };
}

export const actualizaModificarDptos = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_DPTOS,
        payload
    };
}
//Localidades
export const actualizaDeleteLocalidades = (payload) => {
    return {
        type: ACTUALIZA_DELETE_LOCALIDADES,
        payload
    };
}

export const actualizaCreaLocalidades = (payload) => {
    return {
        type: ACTUALIZA_CREATE_LOCALIDADES,
        payload
    };
}

export const actualizaModificarLocalidades = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_LOCALIDADES,
        payload
    };
}
//Barrios
export const actualizaDeleteBarrios = (payload) => {
    return {
        type: ACTUALIZA_DELETE_BARRIOS,
        payload
    };
}

export const actualizaCreaBarrios = (payload) => {
    return {
        type: ACTUALIZA_CREATE_BARRIOS,
        payload
    };
}

export const actualizaModificarBarrios = (payload) => {
    return {
        type: ACTUALIZA_UPDATE_BARRIOS,
        payload
    };
}

export const getArchivosAdjuntos=(payload)=>{
    return{
        type : GET_ARCHIVOS_ADJUNTOS,
        payload
    }
}
export const archivosDocEmpleado=(payload)=>{
    return{
        type : ARCHIVOS_DOC_EMPLEADO,
        payload
    }
}
export const addNewArchivoEmp=(payload)=>{
    return{
        type: ADD_NEW_ARCHIVO,
        payload
    }
}
export const archivoDocSelected=(payload)=>{
    return{
        type : ARCHIVO_DOC_SELECTED,
        payload
    }
}
export const actualizaUpdateArchivo=(payload)=>{
    return{
        type : ACTUALIZA_UPDATE_ARCHIVO,
        payload
    }
}
export const actualizaDeleteArchivo=(payload)=>{
    return{
        type : ACTUALIZA_DELETE_ARCHIVO,
        payload
    }
}
export const updateDomicilio=(payload)=>{
    return{
        type : UPDATE_DOMICILIO,
        payload
    }
}
export const getMotivosEgreso=(payload)=>{
    return{
        type : GET_MOTIVOS_EGRESO,
        payload
    }
}
