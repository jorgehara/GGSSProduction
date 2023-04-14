import React, { forwardRef, useImperativeHandle } from 'react'
import BasicModal from '../Modals/BasicModal'

const ButtonCallModal = forwardRef(({setNameModal, nameModal, closeModal, nameButton, children, setTransition, nameModalProp, parameterRef, esBoton, disable, modalOpen, setModalOpen}, ref) => {
    
    
    const handleClick=(nameModal)=>{
        const newState = {...nameModal};
        newState[nameModalProp] = true;
        setNameModal(newState);
        setTransition(true);
    }
    useImperativeHandle(ref, ()=>{
        handleClick(nameModal)
    })
    
  return (
    <div>
        <button ref={parameterRef} disabled={disable} onClick={()=>{handleClick(nameModal)}} className={esBoton ? "btn btn-outline-danger btn-sm" : "dropdown-item colorFont"}>
            {nameButton}
        </button>
        <BasicModal title="Modal Prueba" isOpen={nameModal[nameModalProp]}  setTransition={setTransition} modalOpen={modalOpen} setModalOpen={setModalOpen}>
            {children}
        </BasicModal>
    </div>
  )
});

export default ButtonCallModal