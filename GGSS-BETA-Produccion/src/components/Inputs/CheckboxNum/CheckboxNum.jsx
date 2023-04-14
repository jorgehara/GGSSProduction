import React from 'react'
import './CheckboxNum.css'
import { useState } from 'react';

const CheckboxNum = ({
    nameCheckbox,
    nameInputNum,
    messageError,
    placeHolder,
    inputId,
    inputNumId,
    onChange,
    valueCheck,
    valueNum,
}) => {

    const [checked, setChecked] = useState(false);

    return (

        <div className='checkboxNumContainer'>
            <div className="inputModalContainer">

                <input type="checkbox"
                    className='inputModal'
                    id={inputId}
                    placeholder={placeHolder}
                    checked={checked}
                    value={valueCheck}
                    onChange={(e) => { setChecked(!checked); onChange(e.target.checked, inputId) }} // NO ANDA
                >
                </input>

                <label style={{ marginLeft: "15px" }} className='labelModal' htmlFor={inputId}>{nameCheckbox} </label>

                <br />
                <br />

            </div>

            <div className="inputModalContainer">

                <label style={{ marginRight: "6px", marginBottom: "8px" }} className='labelModal' htmlFor={inputNumId}>{nameInputNum}: </label>

                <input style={{ width: "50px", marginRight: "7px", textAlign: "center" }} type="number" min={"0"} max={"100"}
                    className='inputModal'
                    id={inputNumId}
                    placeholder={placeHolder}
                    disabled={!checked}
                    value={valueNum}
                    onChange={(e) => onChange(e.target.value, inputNumId )} // NO ANDA --> No deja modificar el input
                    > 
                </input>

                <br />
                <br />

            </div>
        </div>
    )
}

export default CheckboxNum