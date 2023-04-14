import React from 'react'
import InputForm from '../../Inputs/InputForm/InputForm';
import CheckLabel from '../../Inputs/CheckLabel/CheckLabel'
import { GET_INPUTS_VALUE } from '../../../redux/types/liquidacionTypes';


const DatosCertificado = ({nameLabel, onChange, formLiquidacion, disabled}) => {
  
  
  return (
   <>
   <div className="row border border-3 p-2 mt-1">
            <label htmlFor="">{nameLabel}</label> 
          <div className='col  d-flex flex-row justify-content-start align-items-center'>
            <InputForm 
              nameLabel="Total Remuneración: " idInput="inputTotalRemu" nameInput="inputTotalRemu" onChange={onChange} value={formLiquidacion?.inputTotalRemu && formLiquidacion?.inputTotalRemu} action={GET_INPUTS_VALUE} disabled={disabled}/>
            <InputForm 
              nameLabel="Total Neto: " idInput="inputTotalNeto" nameInput="inputTotalNeto" onChange={onChange} value={formLiquidacion?.inputTotalNeto && formLiquidacion?.inputTotalNeto} action={GET_INPUTS_VALUE} disabled={disabled}/>     
          </div>
          <div className='col'>
            <CheckLabel nameLabel="Tiene Embargos" idInput="inputCheckEmbargo" onChange={onChange} action={GET_INPUTS_VALUE} value={formLiquidacion?.inputCheckEmbargo && formLiquidacion?.inputCheckEmbargo} disabled={disabled}/>

            <CheckLabel nameLabel="Tiene Sumario Administrativos" idInput="inputCheckSumAdministrativo" onChange={onChange} action={GET_INPUTS_VALUE}value={formLiquidacion?.inputCheckSumAdministrativo && formLiquidacion?.inputCheckSumAdministrativo}disabled={disabled}  />
            
            <CheckLabel nameLabel="Tiene Licencia Sin Goce de Haberes" idInput="inputCheckLicSinGoce" onChange={onChange} action={GET_INPUTS_VALUE} value={formLiquidacion?.inputCheckLicSinGoce && formLiquidacion?.inputCheckLicSinGoce}disabled={disabled} />
        
          </div>
    </div>
</>
)
}

export default DatosCertificado;