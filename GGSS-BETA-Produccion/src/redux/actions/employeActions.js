import { ADD_EMPLOYE, REMOVE_EMPLOYE, SELECTED_EMPLOYE,UPDATE_EMPLOYE,ADD_ONE_EMPLOYE, GET_INPUT_VALU_BROWSER, GET_EMPLOYES, DISABLE_FUNCTIONS, CLEAN_EMPLOYE } from "../types/employeTypes";

export const addEmploye = (payload) =>{
    return {
        type : ADD_EMPLOYE,
        payload,
    };
}
export const addOneEmploye = (payload) =>{
    return {
        type : ADD_ONE_EMPLOYE,
        payload,
    };
}
export const updateEmploye = (payload) =>{
    return {
        type : UPDATE_EMPLOYE,
        payload,
    };
}
export const removeEmploye = (payload) =>{
    return {
        type : REMOVE_EMPLOYE,
        payload,
    };
}
export const selectedEmploye = (payload) =>{
    return {
        type : SELECTED_EMPLOYE,
        payload,
    };
}
export const getInputValueBrowser=(payload)=>{
    return {
        type : GET_INPUT_VALU_BROWSER,
        payload,
    };
}
export const getEmployes=(payload)=>{
    return{
        type: GET_EMPLOYES,
        payload
    }
}
export const disableFunctions=(payload)=>{
    return {
        type :  DISABLE_FUNCTIONS,
        payload
    }
}
export const cleanEmploye=(payload)=>{
    return{
        type: CLEAN_EMPLOYE,
        payload
    }
}