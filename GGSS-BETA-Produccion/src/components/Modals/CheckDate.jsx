import React from 'react'
import { useState } from 'react'

export const CheckDate = ({
    nameInput,
    display,
    checked,
    value,
    disabled,
    idInputCheck,
    onChange,
    disableModal,
    }) => 
{
  console.log(checked)
  const [disable, setDisable ] = useState(false)
  return (
    <div className="formulario__grupo__inputs mt-2">
        <div class="form-check p-0">
        <label class="form-check-label" for="flexCheckDefault">
          {nameInput}
        </label>
        </div>
      <div className="d-flex flex-row justify-content-start align-items-center ">
        <input
          className="form-check-input "
          type="checkbox"
          id="flexCheckChecked"
          checked={checked}
          onChange={(e) => onChange(e.target.checked, "flexCheckChecked" )}
          disabled={disableModal}
          onClick={()=> setDisable(!checked)}
        />
        <input

          id={idInputCheck}
          className=" "
          name={idInputCheck}
          type="date"
          value={value}
          disabled={!checked}
          onChange={(e) => onChange(e.target.value, idInputCheck )}
        />
      </div>













    </div>
  )
}
