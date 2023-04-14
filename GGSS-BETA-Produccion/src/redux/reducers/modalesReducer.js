import { ADD_SELECTED_EC, ADD_SELECTED_ESTUDIO, GET_ESTUDIOS, CANCEL_MODALS, GET_ESTADOSCIVILES, ADD_SELECTED_TIPODOC, GET_TIPOSDOC, ADD_SELECTED_PARENTESCO, GET_PARENTESCOS, ADD_SELECTED_ESTADO, GET_ESTADOS, ADD_SELECTED_FORMAPAGO, GET_FORMASPAGO, ADD_SELECTED_CARGO, GET_CARGOS, ADD_SELECTED_TAREA, GET_TAREAS, SET_REFETCH, SELECTED_PROV, SELECTED_LOC, SELECTED_DPTO, SELECTED_BARRIO } from "../types/modalesTypes";

export const initialState = {
    estadoCivilSelected: "",
    estudioSelected: "",
    tipoDocumentoSelected: "",
    parentescoSelected: "",
    estadoSelected: "",
    formaPagoSelected: "",
    cargoSelected: "",
    tareaSelected: "",
    calleSelected: "",
    formulario: {
        // estados civiles
        inputEstadosCivilesModal: "",
        inputEstadosCivilesModalFem: "",
        // estudios
        inputNivelEstudio: "",
        // tipos de documento
        inputTipoDocumento: "",
        // parentescos
        inputParentesco: "",
        inputAsignacionParent: "",
        inputGananciaParent: "",
        inputImporteParent: "",
        textAreaParent: "",
        // estados para los empleados
        inputEstado: "",
        // formas de pago
        inputFormaPago: "",
        textAreaFormaPago: "",
        // cargos
        inputCargo : "",
        textAreaCargo : "",
        // tareas desempeñadas
        inputTarea : "",
        textAreaTarea : "",
        refetch : false
    },
    provSelect : "",
    localSelect : "",
    dptoSelect : "",
    barrioSelect : ""
}

const modalesReducer = (state = initialState, action) => {

    const { type, payload } = action;
    switch (type) {
        case SELECTED_PROV: {
            return {
                ...state,
                provSelect: payload
            };
        }
        case SELECTED_LOC: {
            return {
                ...state,
                localSelect: payload
            }
        }
        case SELECTED_DPTO: {
            return {
                ...state,
                dptoSelect: payload
            }
        }
        case SELECTED_BARRIO: {
            return {
                ...state,
                barrioSelect: payload
            }
        }
        case ADD_SELECTED_EC: {
            return {
                ...state,
                estadoCivilSelected: payload

            };
        }
        case GET_ESTADOSCIVILES: {
            return {
                ...state,
                formulario: { ...state.formulario, [payload.name]: payload.value }
            }
        }


        case ADD_SELECTED_ESTUDIO: {
            return {
                ...state,
                estudioSelected: payload
            }
        }
        case GET_ESTUDIOS: {
            return {
                ...state,
                formulario: { ...state.formulario, [payload.name]: payload.value }
            }
        }

        case ADD_SELECTED_TIPODOC: {
            return {
                ...state,
                tipoDocumentoSelected: payload
            }
        }
        case GET_TIPOSDOC: {
            return {
                ...state,
                formulario: {...state.formulario, [payload.name]: payload.value }
            }
        }

        case ADD_SELECTED_PARENTESCO : {
            return {
                ...state,
                parentescoSelected: payload

            }
        }
        case GET_PARENTESCOS : {
            return {
                ...state,
                formulario: {...state.formulario, [payload.name]: payload.value}

            }
        }

        case ADD_SELECTED_ESTADO : {
            return {
                ...state,
                estadoSelected: payload
            }
        }
        case GET_ESTADOS : {
            return {
                ...state,
                formulario: {...state.formulario, [payload.name]: payload.value}
            }
        }

        case ADD_SELECTED_FORMAPAGO : {
            return {
                ...state,
                formaPagoSelected: payload
            }
        }
        case GET_FORMASPAGO : {
            return {
                ...state,
                formulario: {...state.formulario, [payload.name]: payload.value}
            }
        }

        case ADD_SELECTED_CARGO : {
            return {
                ...state,
                cargoSelected: payload
            }
        }
        case GET_CARGOS : {
            return {
                ...state,
                formulario: {...state.formulario, [payload.name]: payload.value}
            }
        }

        case ADD_SELECTED_TAREA : {
            return {
                ...state,
                tareaSelected: payload
            }
        }
        case GET_TAREAS : {
            return {
                ...state,
                formulario: {...state.formulario, [payload.name]: payload.value}
            }
        }

        case SET_REFETCH : {
            return{
                ...state,
                refetch : !payload
            }
        }
        /// -------------- BTN CANCELAR
        case CANCEL_MODALS: {
             
            let newForm = { ...state.formulario }
            return {
                ...state,
                formulario: Object.keys(newForm).reduce((acc, curr) => ({ ...acc, [curr]: "" }), {})
            }
        }


        default:
            return state;
    }
}

export default modalesReducer;