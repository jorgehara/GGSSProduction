import { ADD_DATOS_PERSONALES, REMOVE_DATOS_PERSONALES, UPDATE_DATOS_PERSONALES } from "../types/datosPersonalesTypes";

export const addDatosPersonales = (payload) =>{
    return {
        type : ADD_DATOS_PERSONALES,
        payload,
    };
}
export const updateDatosPersonales = (payload) =>{
    return {
        type : UPDATE_DATOS_PERSONALES,
        payload,
    };
}
export const removeDatosPersonales = (payload) =>{
    return {
        type : REMOVE_DATOS_PERSONALES,
        payload,
    };
}
