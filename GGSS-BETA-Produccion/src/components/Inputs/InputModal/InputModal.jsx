import './InputModal.css'

const InputModal = ({
    nameLabel,
    placeholder,
    idInput,
    value,
    action,
    onChangeValues,
    disableModal
}) => {

    
    return (

        <div className="container">

            <div className="row d-flex flex-row justify-content-center align-items-center">
                <div className="col colModal">
                    <label for="inputPassword3" className="col-form-label-modal">{nameLabel}:</label>
                    <input
                        type="text"
                        className="inputModal"
                        id={idInput}
                        name={idInput}
                        placeholder={placeholder}
                        value={value}
                        // onChange={(e) => onChange(e.target.value, inputId)} // ON CHANGE NUEVO PARA LA NUEVA FUNCION (NO ANDA)
                        onChange={(e) => onChangeValues(e.target.value, idInput)}
                        disabled={disableModal}
                    />
                </div>
            </div>

        </div>
    )
}

export default InputModal