import { ADD_DATOS_PERSONALES, REMOVE_DATOS_PERSONALES, UPDATE_DATOS_PERSONALES } from "../types/datosPersonalesTypes";

export const initialState = {
    //Este estado inicial lo llamamos en el Browser a partir de nuestro estado General (que era employeStates).
        formulario : {
            numLegajo : "",
            apellidoInput : "",
            nombresInput : "",
            documentoInput : "",
            inputCuil : "",
            telefonoInput : "",
            estadoCivilInput : "",
            nacionalidadesInput : "",
            dniSelected : "",
            inputSexo : "",
            inputDateNac : "",
            movil : "",
            email : "",
            estadosEmpleados : "",
            estudiosInput : "",
            observacionesEstudios : "",
            inputImage : "",
            paisOrigenInput : ""
        }
    
};

const datosPersonalesReducer = (state = initialState, action) =>{

    const { type, payload }  = action;
    switch(type) {
        case ADD_DATOS_PERSONALES : {
            return {
                ...state,
                formulario : {...state.formulario, [payload.name]:payload.value}
                
            };
        }
        default :
        return state;
    }
}


export default datosPersonalesReducer;