import { ADD_EMPLOYE, REMOVE_EMPLOYE, SELECTED_EMPLOYE, UPDATE_EMPLOYE,ADD_ONE_EMPLOYE, GET_INPUT_VALU_BROWSER, GET_EMPLOYES, DISABLE_FUNCTIONS, CLEAN_EMPLOYE } from "../types/employeTypes";

const initialState = {
    //Este estado inicial lo llamamos en el Browser a partir de nuestro estado General (que era employeStates).
    empleados : "",
    employes : [],
    employe : {},
    formulario : {
        inpurLegajoBrowser : "",
        inputApellidoNombreBrowser : ""
    },
    disable : false
};

const employeReducer = (state = initialState, action) =>{

    const { type, payload }  = action;
    
    switch(type) {
        case ADD_EMPLOYE : {
           
            const newListEmployes = [...state.employes];
            let indexEmploye = newListEmployes.findIndex((i)=> i["iDempleado"] === payload["iDempleado"]);
            if(indexEmploye === -1){
                newListEmployes.push(payload);
                indexEmploye = newListEmployes.length -1;
            }
            return {
                ...state,
                employes: [...newListEmployes],
            };
        }
        case ADD_ONE_EMPLOYE: {
            
            return {
                ...state,
                employe : payload,
            }
        }
        case UPDATE_EMPLOYE :
            console.log(state.empleados)
            const index = state.empleados.findIndex((employe)=> employe.iDempleado === action.payload.iDempleado)
            const updateList = [...state.empleados]
            updateList[index] = action.payload
            console.log(updateList)
            return {
                ...state,
                empleados:updateList
            } 
        case REMOVE_EMPLOYE:
            return {
                ...state,
                employes: state.employes[0].filter((employe)=> employe.iDempleado !== payload.iDempleado),
            };
        case SELECTED_EMPLOYE:
            return {
                ...state.employe,
                employe: state.employes[0].filter((employe)=> employe.iDempleado === payload),
            };
        case GET_INPUT_VALU_BROWSER :
            return {
                ...state,
                formulario : {...state.formulario, [payload.name]:payload.value}
            }
        case GET_EMPLOYES : {
            return {
                ...state,
                empleados : payload
            }
        }
        case DISABLE_FUNCTIONS : {
            return {
                ...state,
                disable: payload
            }
        }
        case CLEAN_EMPLOYE : {
            return{
                ...state,
                employe : state.employe = {}
            }
        }
        default :
        return state;
    }
}


export default employeReducer;