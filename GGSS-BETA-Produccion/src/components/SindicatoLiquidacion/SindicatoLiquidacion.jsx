import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import "./SindicatoLiquidacion.css";

const SindicatoLiquidacion = ({idInput,nameLabel, array, nameButton, porpArrayOp, propArrayId, action, onChange, value, disabled}) => {


    const [ checked, setChecked] = useState(new Array(array && array.length).fill(false));
    const dispatch= useDispatch();

    function onChangeInput(e, action, position){
        const updateChecked = checked.map((item, index)=> index === position ? !item : item);

        setChecked(updateChecked);
        dispatch(
            {
              type: action,
              payload : {name : e.target.name, value : e.target.value}
            });  
    }
   
return (
    <div className='row d-flex flex-row justify-context-center align-items-center mt-2'>
        <div className='col-xl-3'>
            <label htmlFor={idInput}>{nameLabel}</label>
        </div>
        <div className='col-xl-6'>
            <div className='selectMenuSindicatos border border-1' >
                {
                    array && array.map((op, i)=>{
                        return(
                            <>    
                                
                                <div class="d-flex flex-row justify-context-center align-items-center" key={i} >
                                    <input disabled={disabled} type="checkbox" name={idInput} id={`${idInput}${i}`} checked={checked[i]} onChange={(e)=> {onChange(e.target.value, idInput);const updateChecked = checked.map((item, index)=> index === i ? !item : item);
                                    setChecked(updateChecked); }} value={op[propArrayId]} className='form-check-input checkList'/>
                                    <label class="form-check-label " htmlFor="checkOption">{op[porpArrayOp]}</label>
                                </div>
                            </>                          
                        )
                    })
                }
            </div>
        </div>
        <div className='col-xl-2'>
            {/* <button className='btn btn-outline-danger btn-sm buttonSpace'>{nameButton}</button> */}
        </div>
    </div>
)
}

export default SindicatoLiquidacion