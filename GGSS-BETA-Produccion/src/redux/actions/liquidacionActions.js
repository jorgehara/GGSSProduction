import { GET_ADIC_LIQ, GET_INPUTS_VALUE } from "../types/liquidacionTypes"

export const getInputValues =(payload)=>{
    return{
        type: GET_INPUTS_VALUE,
        payload
    }
}
export const getAdicLiq=(payload)=>{
    return{
        type : GET_ADIC_LIQ,
        payload
    }
}