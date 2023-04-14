import { CANCEL_MODALS, ADD_SELECTED_EC, GET_ESTADOSCIVILES, ADD_SELECTED_ESTUDIO, GET_ESTUDIOS, ADD_SELECTED_TIPODOC, GET_TIPOSDOC, ADD_SELECTED_PARENTESCO, GET_PARENTESCOS, ADD_SELECTED_ESTADO, GET_ESTADOS, ADD_SELECTED_FORMAPAGO, GET_FORMASPAGO, ADD_SELECTED_CARGO, GET_CARGO, GET_CARGOS, ADD_SELECTED_TAREA, GET_TAREAS, SET_REFETCH, ACTUALIZA_DELETE, SELECTED_PROV, SELECTED_LOC, SELECTED_DPTO, SELECTED_BARRIO } from "../types/modalesTypes"

export const addSelectedEstadoCivil = (payload) => {
    return {
        type: ADD_SELECTED_EC,
        payload
    }
}
export const getEstadosCiviles = (payload) => {
    return {
        type: GET_ESTADOSCIVILES,
        payload
    }
}

export const addSelectedEstudio = (payload) => {
    return {
        type: ADD_SELECTED_ESTUDIO,
        payload
    }
}

export const getEstudios = (payload) => {
    return {
        type: GET_ESTUDIOS,
        payload
    }
}


export const addSelectedTipoDocu = (payload) => {
    return {
        type: ADD_SELECTED_TIPODOC,
        payload
    }
}
export const getTiposDoc = (payload) => {
    return {
        type: GET_TIPOSDOC,
        payload
    }
}

export const addSelectedParentesco = (payload) => {
    return {
        type: ADD_SELECTED_PARENTESCO,
        payload
    }
}
export const getParentescos = (payload) => {
    return {
        type: GET_PARENTESCOS,
        payload
    }
}

export const addSelectedEstado = (payload) => {
    return {
        type: ADD_SELECTED_ESTADO,
        payload
    }
}
export const getEstados = (payload) => {
    return {
        type: GET_ESTADOS,
        payload
    }
}

export const addSelectedFormaPago = (payload) => {
    return {
        type: ADD_SELECTED_FORMAPAGO,
        payload
    }
}
export const getFormasPago = (payload) => {
    return {
        type: GET_FORMASPAGO,
        payload
    }
}

export const addSelectedCargo = (payload) => {
    return {
        type: ADD_SELECTED_CARGO,
        payload
    }
}
export const getCargos = (payload) => {
    return {
        type: GET_CARGOS,
        payload
    }
}

export const addSelectedTarea = (payload) => {
    return {
        type: ADD_SELECTED_TAREA,
        payload
    }
}
export const getTareas = (payload) => {
    return {
        type: GET_TAREAS,
        payload
    }
}



export const setRefetch=(payload)=>{
    return{
        type : SET_REFETCH,
        payload
    }
}








export const cancelModals = (payload) => {
    return {
        type: CANCEL_MODALS,
        payload
    };
}

export const selectedPro = (payload) => {
    return {
        type: SELECTED_PROV,
        payload
    };
}
export const selectedLoc = (payload) => {
    return {
        type: SELECTED_LOC,
        payload
    };
}
export const selectedDep = (payload) => {
    return {
        type: SELECTED_DPTO,
        payload
    };
}
export const selectBarrio = (payload) => {
    return {
        type: SELECTED_BARRIO,
        payload
    };
}





