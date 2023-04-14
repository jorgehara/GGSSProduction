import React from 'react'
import './Checkbox.css'
import { useState } from 'react'

const Checkbox = ({
    nameCheckbox,
    messageError,
    placeHolder,
    inputId,
    value,
    onChange
}) => {

    const [checked, setChecked] = useState(value ? value : false)


    return (
        <div className="inputModalContainer">

            <input type="checkbox"
                className='inputModal'
                id={inputId}
                placeholder={placeHolder}
                value={value}
                name={inputId}
                checked={checked}
                onChange={(e) => { setChecked(!checked); onChange(e.target.checked, inputId) }} // NO ANDA
            >
            </input>

            <label style={{ marginLeft: "15px" }} className='labelModal' htmlFor={inputId}>{nameCheckbox}: </label>

            <br />
            <br />

        </div>
    )
}

export default Checkbox