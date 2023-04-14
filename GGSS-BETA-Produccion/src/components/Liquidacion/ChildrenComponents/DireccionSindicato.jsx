import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { inputButtonClasessDireccion } from '../../../classes/classes';
import { GET_INPUTS_VALUE } from '../../../redux/types/liquidacionTypes';
import InputButton from '../../Inputs/InputButton/InputButton';
import InputButtonLiquidacion from '../../Inputs/InputButton/InputButtonLiquidacion';
import SindicatoLiquidacion from '../../SindicatoLiquidacion/SindicatoLiquidacion';
import '../../SindicatoLiquidacion/SindicatoLiquidacion.css';

const DireccionSindicato = ({direcciones, sindicatos, onChange, formLiquidacion, disabled}) => {

 

  
return (
      <div className='col'>
        <InputButtonLiquidacion
            clasess={inputButtonClasessDireccion}
            nameButton="..."
            nameLabel="Dirección"
            placeholder="Dirección"
            value={formLiquidacion?.inputDireccionLiquidacion && formLiquidacion?.inputDireccionLiquidacion}
            array={direcciones && direcciones}
            propArrayOp="direccion"
            propIdOption="idDireccion"
            idInput="inputDireccionLiquidacion"
            onChange={onChange}
            action={GET_INPUTS_VALUE}
            disabled={disabled}
        />
    <SindicatoLiquidacion  nameLabel="Sindicato:" nameButton="..."
    array={sindicatos && sindicatos} onChange={onChange} formLiquidacion={formLiquidacion} porpArrayOp="nombreSindicato" propArrayId="idSindicato" idInput="sindicatosLiquidacion" action={GET_INPUTS_VALUE} disabled={disabled} />
    </div>  
  )
}

export default DireccionSindicato;