import { combineReducers } from "redux"
import datosPersonalesReducer from "./datosPersonalesReducer";
import { documentacionReducer } from "./documentacionReducer";
import domicilioReducer from "./domicilioReducer";
import employeReducer from "./employeReducer";
import { extrasReducer } from "./extrasReducer";
import familiaReducer from "./familiaReducer";
import { fetchReducer } from "./fetchReducer";
import { licenciasReducer } from "./LicenciasReducer";
import { liquidacionReducer } from "./liquidacionReducer";
import modalesReducer from "./modalesReducer";
import trabajosAnterioresReducer from "./trabajosAnterioresReducer";


const rootReducer = combineReducers({
    //Este es nuestro estado general de Empleados (Lo llamamos en el Browser con useSelector.)
    employeStates: employeReducer,
    datosPersonalesStates : datosPersonalesReducer,
    domiciliosStates : domicilioReducer,
    familiaStates : familiaReducer,
    generalState : fetchReducer,
    trabajosAnteriores : trabajosAnterioresReducer,
    liquidacionState : liquidacionReducer,
    modalState : modalesReducer,
    documentacionState : documentacionReducer,
    licenciasState : licenciasReducer,
    extrasState : extrasReducer
});

export default rootReducer;