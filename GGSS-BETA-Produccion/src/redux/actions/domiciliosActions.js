import { Action } from "@remix-run/router";
import { ADD_DOMICILIOS, ADD_DOM_TABLE, ADD_NEW_DOMICILIO, ADD_ONEDOMICILIO, CLEAR_ID_DOM, DELETE_ONE_DOMICILIO, DOMICILIO_SELECTED, RECHARGE, SAVE_IDS_DOM, SELECT_BARRIO, SELECT_DEPARTAMENTO, SELECT_ID_DOMICILIO, SELECT_PROVINCIA, SET_PREDETERMINADO } from "../types/domiciliosTypes";

export const addDomiciliosForm = (payload) =>{
    return {
        type : ADD_DOMICILIOS,
        payload,
    };
}
export const addOneDomicilio=(payload)=>{
     
    return{
        type : ADD_ONEDOMICILIO,
        payload,
    };
}
export const selectedOption=(payload)=>{
    return{
        type : SELECT_PROVINCIA,
        payload,
    };
}
export const selectedOptionDpto=(payload)=>{
    return{
        type : SELECT_DEPARTAMENTO,
        payload,
    };
}
export const selectedOptionBarrio=(payload)=>{
    return{
        type : SELECT_BARRIO,
        payload,
    };
}
export const selectedIdDomicilio=(payload)=>{
    return{
        type : SELECT_ID_DOMICILIO,
        payload
    };
}
export const addNewDomicilio=(payload)=>{
    return{
        type : ADD_NEW_DOMICILIO,
        payload,
    };
}
export const deleteOneDomicilioSelect=(payload)=>{
    return{
        type : DELETE_ONE_DOMICILIO,
        payload,
    };
}
export const setPredeterminado=(payload)=>{
    return {
        type : SET_PREDETERMINADO,
        payload,
    }
}
export const addDomTable=(payload)=>{
    return{
        type : ADD_DOM_TABLE,
        payload
    }
}
export const domicilioSelected=(payload)=>{
    return{
        type : DOMICILIO_SELECTED,
        payload
    }
}
export const saveIdsDom=(payload)=>{
    return{
        type : SAVE_IDS_DOM,
        payload
    }
}
export const recharge=(payload)=>{
    return{
        type : RECHARGE,
        payload
    }
}
export const cleanIdsDom=(payload)=>{
    return{
        type : CLEAR_ID_DOM,
        payload
    }
}