import React from 'react'
import { Link } from 'react-router-dom'
import ButtonLarge from '../Buttons/ButtonLarge'

const Acciones = () => {
  return (
            <div className="d-flex border row">
                <div className='col-2'>
                    <ButtonLarge color="danger" tamaño="sm" justyfy="cemter m-1" nameButton="Imprimir Constancia de Asignaciones Familiares" />
                </div>
                <div className='col-2'>
                        <ButtonLarge color="danger" tamaño="sm" justyfy="center m-1" nameButton="Imprimir Certificado de Convenio/Oficio" />
                </div>
                <div className='col-2'>
                    <ButtonLarge color="danger" tamaño="sm" justyfy="center m-1" nameButton="Imprimir Resumen Legajo Empleado" />
                </div>
                <div className='col-2'>
                    <ButtonLarge color="danger" tamaño="" justyfy="center m-1" nameButton="Imprimir Ficha Empleado" />
                </div>
                <div className='col-2'>
                    <ButtonLarge color="danger" tamaño="" justyfy="center mt-1" nameButton="Licencias Franquicias" />
                </div>
                <div className='col-2'>
                    {/* <Link className="btn btn-danger d-flex justify-content-center" to="/">Salir</Link> */}
                </div>
            </div>
  )
}

export default Acciones;