import { ADD_DETALLE_LICENCIA, ADD_LIC_EMPLEADOS, ADD_NEW_DETALLE, ADD_ONE_LICENCIA, ADD_SELECT_DETALLE, CLEAR_IDS_LIC, CLEAR_LIC_SELECT, DELETE_DET_LIC, DELETE_LIC_EMPLEADO, ID_SELECT, LICENCIA_SELECT, OPTIONS_FORMULARIO, SAVE_IDS_LIC, SELECTED_OPTION, UPDATE_DETALLE,  } from "../types/LicenciasTypes";

export const initialState = {

    selectedOptionLicencia : "",
    formulario : {
        inputOpcionsLicencias : ""
    },
    licenciaEmpleado : "",
    detalleLicencia : "",
    detalleSelect : "",
    idsLic : [],
    idSelected : 0,
    licenciasEmpleado : "",
    licenciaSelected : ""
}

export const licenciasReducer=(state = initialState, action)=>{
    const {type, payload} = action;

    switch(type){
        case SELECTED_OPTION : {
            return {
                ...state,
                selectedOptionLicencia : payload
            }
        }
        case OPTIONS_FORMULARIO : {
            return {
                ...state,
                formulario : {...state.formulario, [payload.name]:payload.value}
            }
        }
        case ADD_ONE_LICENCIA : {
            return{
                ...state,
                licenciaEmpleado : payload
            }
        }
        case ADD_DETALLE_LICENCIA : {
            return {
                ...state,
                detalleLicencia : payload
            }
        }
        case ADD_SELECT_DETALLE : {
            return{
                ...state,
                detalleSelect : payload
            }
        }
       case DELETE_DET_LIC : {
        
        return {
            ...state,
            detalleLicencia : state.detalleLicencia && state.detalleLicencia.filter((det)=> det.idDetalleLicenciaEmpleado !== payload)
        }
       }
        
        case UPDATE_DETALLE : {
            const newDetalle = {...payload}
            return{
                ...state.detalleLicencia,
                detalleLicencia : state.detalleLicencia.filter((detalle)=> detalle.idDetalleLicenciaEmpleado === newDetalle.idDetalleLicenciaEmpleado)
            }
        }
        case ADD_NEW_DETALLE : {
            return{
                ...state.detalleLicencia,
                detalleLicencia : [...state.detalleLicencia, payload]
            }
        }
        case CLEAR_LIC_SELECT : {
            return{
                ...state,
                licenciaEmpleado: {}
            }
           }
         case SAVE_IDS_LIC : {
             return {
                 ...state,
                 idsLic : [...state.idsLic.push(payload)]
             }
         }
        case CLEAR_IDS_LIC : {
            return {
                ...state,
                idsLic : state.idsLic = []
            }
        }
        case ID_SELECT : {
            return{
                ...state,
                idSelected : payload
            }
        }
        case ADD_LIC_EMPLEADOS : {
            return{
                ...state,
                licenciasEmpleado : payload
            }
        }
        case DELETE_LIC_EMPLEADO : {
            return {
                ...state,
                licenciasEmpleado : state.licenciasEmpleado.filter((lic)=> lic.idLicenciaEmpleado !== payload)
            }
        }
        case LICENCIA_SELECT : {
            return{
                ...state,
                licenciaSelected : payload
            }
        }
        default :
        return state;
    }
}
