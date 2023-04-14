import { UPDATE_LICENCIA } from "../types/fetchTypes";
import { ADD_DETALLE_LICENCIA, ADD_LIC_EMPLEADOS, ADD_NEW_DETALLE, ADD_NEW_LICENCIA, ADD_ONE_LICENCIA, ADD_SELECT_DETALLE, CLEAR_IDS_LIC, CLEAR_LIC_SELECT, DELETE_DET_LIC, DELETE_LIC_EMPLEADO, ID_SELECT, LICENCIA_SELECT, OPTIONS_FORMULARIO, SAVE_IDS_LIC, SELECTED_OPTION, UPDATE_DETALLE } from "../types/LicenciasTypes"

export const selectedOption=(payload)=>{
    return{
        type : SELECTED_OPTION,
        payload,
    };
}
export const inputsValueFomr =(payload)=>{
    return {
        type : OPTIONS_FORMULARIO,
        payload,
    };
}
export const addOneLicencia=(payload)=>{
    return{
        type: ADD_ONE_LICENCIA,
        payload,
    };
}
export const addDetalleLicencia=(payload)=>{
    return{
        type : ADD_DETALLE_LICENCIA,
        payload,
    }
}
export const addSelectDetalle=(payload)=>{
    return{
        type : ADD_SELECT_DETALLE,
        payload,
    };
}


export const updateDetalle=(payload)=>{
    return{
        type: UPDATE_LICENCIA,
        payload
    }
}
export const addNewDetalle=(payload)=>{
    return{
        type: ADD_NEW_DETALLE,
        payload,
    };
}
export const deleteDetLic=(payload)=>{
    return{
        type : DELETE_DET_LIC,
        payload,
    };
}

export const clearLicSelect =(payload)=>{
    return{
        type: CLEAR_LIC_SELECT,
        payload
    }
}
export const saveIdsLic=(payload)=>{
    return{
        type: SAVE_IDS_LIC,
        payload
    }
}
export const clearIdsLic=(payload)=>{
    return{
        type : CLEAR_IDS_LIC,
        payload
    }
}
export const idSelect=(payload)=>{
    return{
        type: ID_SELECT,
        payload
    }
}
export const addLicEmpleado=(payload)=>{
    return{
        type: ADD_LIC_EMPLEADOS,
        payload
    }
}
export const deleteLicEmpleado=(payload)=>{
    return{
        type : DELETE_LIC_EMPLEADO,
        payload
    }
}
export const licenciaSelected=(payload)=>{
    return{
        type : LICENCIA_SELECT,
        payload
    }
}