import { ADD_DOMICILIOS,ADD_ONEDOMICILIO,SELECT_BARRIO,SELECT_DEPARTAMENTO,SELECT_ID_DOMICILIO,SELECT_PROVINCIA, ADD_NEW_DOMICILIO, DELETE_ONE_DOMICILIO, SET_PREDETERMINADO, ADD_DOM_TABLE, SAVE_IDS_DOM, RECHARGE, CLEAR_ID_DOM, DOMICILIO_SELECTED } from "../types/domiciliosTypes";


export const initialState = {
    //Este estado inicial lo llamamos en el Browser a partir de nuestro estado General (que era employeStates).
    inputPredeterminado : false,
    inputCalleDomicilios : "",
    inputNumCalle : "",
    inputPisoCalle : "",
    inputProvinciaDomicilios : "",
    inputDepartamentosDomicilios : "",
    inputLocalidadesDomicilios : "",
    inputBarriosDomicilios : "",
    domicilioEmpleado : [],
    provinciaSelected : {},
    departamentoSelected : {},
    localidadSelected : {},
    idDomicilioSelected : 0,
    domTable : [],
    idsDom : [],
    recharge : false,
    domicilioSelected : ""
};

const domicilioReducer = (state = initialState, action) =>{

    const { type, payload }  = action;

    switch(type) {
        case DOMICILIO_SELECTED : {
            return{
                ...state,
                domicilioSelected : payload
            }
        }
        case ADD_DOMICILIOS : {
            
            return {
                ...state,
                [payload.name]:payload.value
                
            };
        }
        case ADD_ONEDOMICILIO : {
            return{
                ...state,
                domicilioEmpleado : payload
            }
        }
        case ADD_NEW_DOMICILIO : {
            return{
                ...state.domicilioEmpleado,
                domicilioEmpleado : [...state.domicilioEmpleado, payload]
            }
        }
        case SET_PREDETERMINADO : {
            return {
                ...state,
                inputPredeterminado : payload
            }
        }
        case DELETE_ONE_DOMICILIO : {
            return{
                ...state,
                domicilioEmpleado : state.domicilioEmpleado.filter((dom)=> dom.idDomicilio !== payload)
            }
        }
        case SELECT_PROVINCIA :{

            return{
                ...state,
                provinciaSelected : {payload}
            }
        }
        case SELECT_DEPARTAMENTO :{

            return{
                ...state,
                departamentoSelected : {payload}
            }
        }
        case SELECT_BARRIO :{

            return{
                ...state,
                localidadSelected : {payload}
            }
        }
        case SELECT_ID_DOMICILIO :{
            return{
                ...state,
                idDomicilioSelected : payload
            }
        }
        case ADD_DOM_TABLE : {
            return{
                ...state,
                domTable : [...state.domTable, state.domTable.push(payload)]
            }
        }
        case SAVE_IDS_DOM : {
            return{
                ...state,
                idsDom : [...state.idsDom.push(payload)]
            }
        }
        case RECHARGE : {
            return{
                ...state,
                recharge : !payload
            }
        }
        case CLEAR_ID_DOM : {
            return{
                ...state,
                idsDom : state.idsDom = []
            }
        }
        default :
        return state;
    }
}


export default domicilioReducer;