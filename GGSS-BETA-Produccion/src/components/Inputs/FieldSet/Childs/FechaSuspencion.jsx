import React, { useState } from 'react'
import { useEffect } from 'react';
import InputDate from '../../InputDate/InputDate'
import "./Childs.css";


const FechaSuspencion = ({valueForm, onChange, setCheckeds, setFormLicencias, formLicencias}) => {
  const [checked, setChecked] = useState(true);
  const [disable, setDisable] = useState(true);

  useEffect(()=>{
    setCheckeds(false)
  },[])

  return (
    <div className='row'>
        <div className='col-xl-12'>
            <InputDate disabled={disable} nameInput="Fecha Suspención:" onChange={onChange} valueCheck={true} idInput="inputDateSuspLic" value={checked ? "" : valueForm?.inputDateSuspLic && valueForm?.inputDateSuspLic} />
            <div className='d-flex flex-row justify-content-start align-items-center'>
                <div className='space'/>
                <input type="checkbox" checked={checked} defaultValue={false} className='mt-1' name="inputQuitaSusp" id="inputQuitaSusp" onChange={(e)=>{ setDisable(!disable); setChecked(!checked); onChange(e.target.checked, "inputQuitaSusp"); setFormLicencias({...formLicencias, inputDateSuspLic : null, inputQuitaSusp : !checked })}} />
                <label htmlFor="inputQuitaSusp">Quitar Fecha de Suspensión</label>
            </div>
        </div>
    </div>
  )
}

export default FechaSuspencion