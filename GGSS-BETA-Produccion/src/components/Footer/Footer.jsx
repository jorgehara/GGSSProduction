import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AXIOS_ERROR, SET_LOADING } from '../../redux/types/fetchTypes'
import ButtonLarge from '../Buttons/ButtonLarge'
import "./Footer.css"

const Footer = ({setTokenDef, tokenDef}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const empleadoUno = useSelector((state)=> state.employeStates.employe);
    const urlReporteAsignacionesFamiliares = `http://54.243.192.82/api/ReporteAsignacionesFamiliares/${empleadoUno.iDempleado},%201`;
    const urlReporteResumenLegajo = `http://54.243.192.82/api/ResumenDeLegajo/Get?IDempleado=${empleadoUno.iDempleado}&idParametro=1`
    const urlReporteServicio = `http://54.243.192.82/api/ReporteServicio/${empleadoUno.iDempleado},%201`;
    const urlFichaEmpleado = `http://54.243.192.82/api/FichaEmpleado/Get?IDempleado=${empleadoUno.iDempleado}&idParametro=1`;

    const handleFetch=(url, action )=>{
    dispatch({type: SET_LOADING});
        axios.get(url)
        .then((res)=>{
        dispatch( action(res.data.result));
        })
        .catch((err)=>{
        dispatch({type:AXIOS_ERROR});
        })
    }

    useEffect(()=>{
        handleFetch( urlReporteAsignacionesFamiliares);
      },[])

  return (
<>
<div className="row container-fluid-sm p-2 contFooter">
    <div className="row">
        <div className="col-7">
            <div className="d-flex col-md-11 ">
                {/* <ButtonLarge color="danger" url={urlReporteAsignacionesFamiliares} empleadoUno={empleadoUno} tamaño="md" justyfy="center m-1" align="start" nameButton="Imprimir Constancia de Asignaciones Familiares" />
                <ButtonLarge color="danger" url={urlReporteResumenLegajo} empleadoUno={empleadoUno} tamaño="md" justyfy="center m-1" align="start" nameButton="Imprimir Resumen Legajo Empleado" />
                <ButtonLarge color="danger" url={urlReporteServicio} empleadoUno={empleadoUno} tamaño="md" justyfy="center m-1" align="start" nameButton="Imprimir Certificado de Servicio/Oficio" /> */}
                <ButtonLarge disabled={empleadoUno ? false : true } color="danger" url={urlFichaEmpleado} empleadoUno={empleadoUno} tamaño="md" justyfy="center m-1" align="start" nameButton="Imprimir Ficha Empleado" />
                {/* <ButtonLarge color="danger" url="" tamaño="md" justyfy="center m-1" align="start" nameButton="Licencias Franquicias" /> */}
            </div>
        </div>
        <div className="col-4 salirExit ">
            <div className="row justify-content-end">
                <div className="col-md-1">
                    <Link className="btn btn-danger btn-lg contFooter"  to="/" onClick={()=>{navigate(`/?token=${tokenDef}`)}}>Salir</Link>
                </div>
            </div>
        </div>
    </div>
</div>
</>
)
}
export default Footer