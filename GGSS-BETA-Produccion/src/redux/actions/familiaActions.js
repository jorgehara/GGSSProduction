import { ADD_FAMILIA, ADD_FAMILIAR, ADD_FAMILIAR_ID, CLEAN_ID_FAM, DATOS_FAMILIAR_X_EMPLEADO, DELETE_FAM, SAVE_ID_FAM } from "../types/familiaTypes";

export const addFamilia = (payload) =>{
    return {
        type : ADD_FAMILIA,
        payload,
    };
}
export const addNewFamiliar=(payload)=>{
    return {
        type : ADD_FAMILIAR_ID,
        payload
    }
}
export const addFamiliar=(payload)=>{
    return{
        type : ADD_FAMILIAR,
        payload,
    };
}
export const getDAtosFamiliaresEmpleado=(payload)=>{
    return{
        type: DATOS_FAMILIAR_X_EMPLEADO,
        payload
    }
}
export const saveIdFam=(payload)=>{
    return {
        type: SAVE_ID_FAM,
        payload
    }
}
export const cleanIdFam=(payload)=>{
    return{
        type : CLEAN_ID_FAM,
        payload
    }
}
export const deleteFam=(payload)=>{
    return{
        type : DELETE_FAM,
        payload
    }
}