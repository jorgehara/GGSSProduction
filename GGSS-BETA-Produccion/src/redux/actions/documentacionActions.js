import { ACTUALIZA_CREATE_DOCU, ACTUALIZA_DELETE_DOCU, ACTUALIZA_UPDATE_DOCU, ADD_NEW_DOC, CLEAN_IDS_DOC, DELETE_DOC_EMPLEADO, DOCU_DEL_EMPLEADO, GET_AR_AD, GET_DOC_EMPL, GET_DOC_SELECT, GET_INPUT_VALUE, RESET_VALUE, SAVE_IDS } from "../types/documentacionTypes"

export const getInputValue=(payload)=>{
    return {
        type : GET_INPUT_VALUE,
        payload,
    };
}
export const getOneDocumento=(payload)=>{
    return {
        type : GET_DOC_EMPL,
        payload,
    };
}
export const resetValue=(payload)=>{
    return {
        type : RESET_VALUE,
        payload
    }
}
export const getDocSelect=(payload)=>{
    return {
        type : GET_DOC_SELECT,
        payload,
    }
}
export const saveIds=(payload)=>{
    return{
        type: SAVE_IDS,
        payload
    }
}
export const cleanIdsDoc=(payload)=>{
    return {
        type: CLEAN_IDS_DOC,
        payload
    }
}
export const documentacionDelEmpleado=(payload)=>{
    return{
        type: DOCU_DEL_EMPLEADO,
        payload
    }
}
export const deleteDocuEmpleado=(payload)=>{
    return{
        type : DELETE_DOC_EMPLEADO,
        payload
    }
}
export const getArAdjuntos=(payload)=>{
    return{
        type: GET_AR_AD,
        payload
    }
}
export const actualizaCreateDocu=(payload)=>{
    return{
        type : ACTUALIZA_CREATE_DOCU,
        payload
    }
}
export const actualizaUpdateDocu=(payload)=>{
    return{
        type : ACTUALIZA_UPDATE_DOCU,
        payload
    }
}
export const actualizaDeleteDocu=(payload)=>{
    return{
        type : ACTUALIZA_DELETE_DOCU,
        payload
    }
}