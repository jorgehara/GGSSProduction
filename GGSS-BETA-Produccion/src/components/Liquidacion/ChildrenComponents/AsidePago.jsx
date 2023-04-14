import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classesRadioLiquidacion, inputButtonClasessAsidePagos } from '../../../classes/classes'
import { GET_INPUTS_VALUE } from '../../../redux/types/liquidacionTypes'
import InputButton from '../../Inputs/InputButton/InputButton'
import InputButtonLiquidacion from '../../Inputs/InputButton/InputButtonLiquidacion'
import InputRadio from '../../Inputs/InputRadio/InputRadio'


const AsidePago = ({formasPAgo, lugaresDePago, bancos, onChange, formLiquidacion, disabled, mostrarComponente, modify}) => {

  const dispatch = useDispatch();
  const empleadoUno = useSelector((state)=> state.employeStates.employe);
  
  return (
  <>
      <div className="border border-3 p-2 col mt-2">
        <div>
                <InputButtonLiquidacion
                  clasess={inputButtonClasessAsidePagos}
                  nameButton="..."
                  nameLabel="Forma de Pago"
                  placeholder="Forma de Pago"
                  value = {formLiquidacion?.inputFormaDePago && formLiquidacion?.inputFormaDePago}
                  array={formasPAgo && formasPAgo}
                  propArrayOp="nombreFormadePago"
                  propIdOption="iDformadePago"
                  idInput="inputFormaDePago"
                  onChange={onChange}
                  action={GET_INPUTS_VALUE}
                  disabled={modify ? false : true}
                  idSelected={empleadoUno?.iDformadePago}
                />
              </div>
              <div>
                <InputButtonLiquidacion
                clasess={inputButtonClasessAsidePagos}
                  nameButton="..."
                  nameLabel="Lugar de Pago"
                  placeholder="Lugar de Pago"
                  value = {formLiquidacion?.inputLugaresDePago && formLiquidacion?.inputLugaresDePago}
                  array={lugaresDePago && lugaresDePago}
                  propArrayOp="lugardePago"
                  propIdOption="idLugardePago"
                  idInput="inputLugaresDePago"
                  onChange={onChange}
                  action={GET_INPUTS_VALUE}
                  disabled={modify ? false : true}
                  idSelected={empleadoUno?.iDlugardePago}
                />
              </div>
              <div>
                <InputButtonLiquidacion
                clasess={inputButtonClasessAsidePagos}
                  nameButton="..."
                  nameLabel="Banco"
                  placeholder=""
                  display={true}
                  value = {formLiquidacion?.inputBanco && formLiquidacion?.inputBanco}
                  array={bancos && bancos}
                  propArrayOp="nombreBanco"
                  propIdOption="idBanco"
                  idInput="inputBanco"
                  onChange={onChange}
                  action={GET_INPUTS_VALUE}
                  disabled={modify ? false : true}
                  idSelected={empleadoUno?.idbanco}
                />
              </div>
                <div>
                <InputButton
                clasess={inputButtonClasessAsidePagos}
                // mostrarAsidePagos={false}
                // nameButton={false}
                nameLabel="N° Cuenta"
                placeholder="N° Cuenta"
                value = {formLiquidacion?.inputNumCta && formLiquidacion?.inputNumCta}
                onChange={onChange}
                action={GET_INPUTS_VALUE}
                id="inputNumCta"
                disabled={modify ? false : true}
                />
              </div>
              <div >
              <InputRadio
                classes={classesRadioLiquidacion}
                nameFirst="Caja de Ahorro"
                nameSecond="Cta Corriente"
                nameLabel="Tipo"
                onChange={onChange}
                idInput="inputRadioAsidePagos"
                asidePagos={true}
                disabled={modify ? false : true}
                value={formLiquidacion?.inputRadioAsidePagos && formLiquidacion?.inputRadioAsidePagos}
              />
              </div>
              <div>
              <InputButton
                clasess={inputButtonClasessAsidePagos}
                // nameButton={false}
                nameLabel="C.B.U."
                placeholder="C.B.U"
                value = {formLiquidacion?.inputCBU && formLiquidacion?.inputCBU}
                onChange={onChange}
                action={GET_INPUTS_VALUE}
                id="inputCBU"
                disabled={modify ? false : true}
              />
              </div>

              {/* <div className='mt-2'>
              <button type="button" class="btn btn-danger btn-sm" >Actualización masiva de datos</button>
              </div> */}

              </div>
    </>

  )
}

export default AsidePago