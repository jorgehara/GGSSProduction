import { ADD_DATOSE_EMP, CLEAN_ID_DE, DELETE_DE_EMP, GET_DE_SELECTED, GET_INPUT_VALUES_EXTRAS, SAVE_ID_DE } from "../types/extrasTypes";

export const initialState = {
    formulario : {
        inputDatosExtrasCbo : "",
        inputFechaExtras : "",
        inputTextExtras : "",
        inpútAdscriptoExtras : "",
        inputInstrumLegal : "",
        inputAfectacionesExtras : "",
        inputInstrumLegalAfectaciones : "",
        inputSectorExtras : "",
        inputDireccionesExtras : "",
        inputTextExtrasAdscripto : "",
        inputTextExtrasAfectaciones : ""
    },
    datoExtra : "",
    idsDe : [],
    datosExtrasEmp : ""
}

export const extrasReducer =(state = initialState, action)=>{
    const {type, payload} = action;

    switch(type){
        case GET_INPUT_VALUES_EXTRAS :{
            return {
                ...state,
                formulario : {...state.formulario, [payload.name]:payload.value}
            }
        }
        case GET_DE_SELECTED : {
            return {
                ...state,
                datoExtra : payload
            }
        }
        case ADD_DATOSE_EMP : {
            
            return{
                ...state,
                datosExtrasEmp : payload
            }
        }
        case SAVE_ID_DE : {
            return {
                ...state,
                idsDe : [...state.idsDe.push(payload)]
            }
        }
        case CLEAN_ID_DE : {
            return {
                ...state,
                idsDe : state.idsDe = []
            }
        }
        case DELETE_DE_EMP : {
            return {
                ...state,
                datosExtrasEmp : state.datosExtrasEmp.filter((de)=> de.idEmpleadoDatoExtra !== payload)
            }
        }
        
        default : return state;
    }
}