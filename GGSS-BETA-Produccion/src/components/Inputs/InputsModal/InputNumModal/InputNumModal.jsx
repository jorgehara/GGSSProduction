import React from 'react'
import '../InputModal.css'

const InputNumModal = ({
    nameInput,
    messageError,
    placeHolder,
    onChange,
    inputId,
    value
}) => {
    return (
        <div className="inputModalContainer">

            <div className="row mb-3 inputLabelContainer">
                <label className="col-form-label-modal">{nameInput}:</label>
                <div className="col colModal">
                    <input style={{ width: "50px", textAlign: "center", marginRight: "30px"}} type="number" min={"0"} max={"1000"}
                        className='inputModal'
                        id={inputId}
                        placeholder={placeHolder}
                        value={value}
                        onChange={(e) => onChange(e)}>
                    </input>                
                </div>
            </div>

        </div>
    )
}

export default InputNumModal