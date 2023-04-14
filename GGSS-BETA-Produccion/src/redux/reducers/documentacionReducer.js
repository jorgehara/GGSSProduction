import { ACTUALIZA_CREATE_DOCU, ACTUALIZA_DELETE_DOCU, ACTUALIZA_UPDATE_DOCU, ADD_NEW_DOC, CLEAN_IDS_DOC, DELETE_DOC_EMPLEADO, DOCU_DEL_EMPLEADO, GET_AR_AD, GET_DOC_EMPL, GET_DOC_SELECT, GET_INPUT_VALUE, SAVE_IDS } from "../types/documentacionTypes";

export const initialState = {
    domiciliosDelEmpleado : "",
    formulario : {
        inputDatePresentacion : "",
        inputDateVencimiento : "",
        inputSelectDocumentacion : "",
        textAreaDocumentacion : "",
        inputCheckLiquidacion : "",
        inputIncluirCuotaAlim : ""
    },
    documentacionSeleccionada : "",
    ids : [],
    documentacionDelEmpleado : "",
    archivosAdjuntosEmpleado : ""
}

export const documentacionReducer=(state = initialState, action)=>{
 const {type , payload} = action;

 switch(type){
    case GET_INPUT_VALUE : {
        return{
            ...state,
            formulario : {...state.formulario, [payload.name]:payload.value}
        }
    }
    case GET_DOC_EMPL : {
        return {
            ...state,
            domiciliosDelEmpleado : payload
        }
    }
    case GET_DOC_SELECT : {
        return {
            ...state,
            documentacionSeleccionada : payload
        }
    }
    case  ACTUALIZA_CREATE_DOCU :{
          return{
            ...state,
            domiciliosDelEmpleado : [...state.domiciliosDelEmpleado, payload]
          }
    }
    case ACTUALIZA_DELETE_DOCU : {
        return {
            ...state,
            domiciliosDelEmpleado : state.domiciliosDelEmpleado && state.domiciliosDelEmpleado.filter((doc)=> doc.idDocumentacion !== action.payload)
        }
    }
    case ACTUALIZA_UPDATE_DOCU : {
      const newDomicilio = { ...action.payload };
      return{
        ...state.domiciliosDelEmpleado,
        domiciliosDelEmpleado : state.domiciliosDelEmpleado.filter(
          (doc) =>
          doc.idDocumentacion === newDomicilio.idDocumentacion
        )
      }
    }
    case SAVE_IDS : {
        return {
            ...state,
            ids : [...state.ids.push(payload)]
        }
    }
    case CLEAN_IDS_DOC : {
        return{
            ...state,
            ids : state.ids = []
        }
    }
    case DOCU_DEL_EMPLEADO : {
        return {
            ...state,
            documentacionDelEmpleado : payload
        }
    }
    case DELETE_DOC_EMPLEADO : {
        return{
            ...state,
            documentacionDelEmpleado : state.documentacionDelEmpleado.filter((doc)=> doc.idEmpleadoDocumentacion !== payload)
        }
    }
    case GET_AR_AD : {
        return{
            ...state,
            archivosAdjuntosEmpleado : payload
        }
    }
    default : return state
 }
}