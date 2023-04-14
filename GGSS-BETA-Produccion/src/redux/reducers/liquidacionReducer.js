import { GET_ADIC_LIQ, GET_INPUTS_VALUE } from "../types/liquidacionTypes";


export const initialState = {
    formulario : {
        inputEmpleadorLiquidacion : "",
        inputConvenio : "",
        inputCategoria : "",
        inputAgrupamiento : "",
        inputCargo : "",
        inputTareaDesempeñada : "",
        inputModoCOntratacion : "",
        inputModoLiquidacion : "",
        inputCentroCosto : "",
        inputSectorDepto : "",
        inputObraSocial : "",
        inputFormaDePago : "",
        inputLugaresDePago : "",
        inputBanco : "",
        inputNumCta : "",
        inputCBU : "",
        inputRadioAsidePagos : "",
        inputDireccionLiquidacion : "",
        sindicatosLiquidacion : [],
        ingresoInput : "",
        ingresoDateInput : "",
        selectOptionsId : "",
        inputCheckEfectivo : "",
        inputDateEfectivo : "",
        inputCheckAsigna : "",
        inputTotalRemu : "",
        inputTotalNeto : "",
        inputCheckEmbargo : "",
        inputCheckSumAdministrativo : "",
        inputCheckLicSinGoce : ""
    },
    adicionalLiquidacion : ""
}

export const liquidacionReducer =(state = initialState, action)=>{
    const { type, payload } = action;

    switch(type){
        case GET_INPUTS_VALUE : {
            return{
                ...state,
                formulario : {...state.formulario, [payload.name]:payload.value}
            }
        }
        case GET_ADIC_LIQ : {
            return {
                ...state,
                adicionalLiquidacion : payload
            }
        }
        default : return  state;
    }
}