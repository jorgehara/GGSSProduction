import "./InputForm.css";

const InputForm = ({
  messageError,
  placeHolder,
  inputId,
  value,
  disabled,
  onChange,
  nameLabel,
  validateNumbers,
  validateLetters,
  numbers,
  idInput,
  cancelar,
  obligatorio
}) => {
  return (
    <div className="formulario__grupo__inputs">
      <div className="formulario__grupo">
        <label className="formulario__label " htmlFor={inputId}>
          {nameLabel}
        </label>
      </div>
      <div className="form__grupo-input ">
        {
          obligatorio ? 
          <input
          type="text"
          className="legajo__limpia formulario-input-Legajo-Form-Button obligatorio"
          id={idInput}
          data-bs-toggle="tooltip" 
          autocomplete="off"
          data-bs-placement="top"
          data-bs-title="Campo obligario"
          placeholder={placeHolder}
          value={ cancelar ? null : value  }
          onChange={(e)=>onChange(e.target.value, idInput)}
          disabled={disabled}
          name={idInput}
          onKeyPress={(e)=>{
            if(e.key !== 'Enter'){
              if(numbers){
                validateNumbers(e);
              }else{
                validateLetters(e);
              }
            }
          }
        }
        /> :
        <input
          type="text"
          className="formulario-input-Legajo-Form-Button"
          id={idInput}
          autocomplete="off"
          placeholder={placeHolder}
          value={ cancelar ? null : value  }
          onChange={(e)=>onChange(e.target.value, idInput)}
          disabled={disabled}
          name={idInput}
          onKeyPress={(e)=>{
            if(e.key !== 'Enter'){
              if(numbers){
                validateNumbers(e);
              }else{
                validateLetters(e);
              }
            }
          }
        }
        />
        }
      </div>
      <div className="form__grupo__icons">
        <i className="fas fa-times-circle form__grupo__icon"></i>
      </div>
      <div className="form__grupo__errors">
        <p className="form__grupo__error">{messageError}</p>
      </div>
    </div>
  );
};
export default InputForm;
