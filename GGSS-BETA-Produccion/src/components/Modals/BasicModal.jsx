import React from 'react'
import ReactDOM from 'react-dom';
import "./BasicModal.css";
const BasicModal = ({title, children, isOpen, onClose, modalOpen, setModalOpen}) => {
    const modalContainer = document.querySelector("#modalContainer");

  return (
    isOpen ? ReactDOM.createPortal(
        <div className={modalOpen ? 'container-flex d-flex flex-column justify-content-start align-items-center modalClassAbsolute ' : 'container-flex d-flex flex-column justify-content-start align-items-center modalClass '}>
            <div className='row p-0 m-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center'>                    
                <div className='d-flex flex-column justify-content-center align-items-center '>
                    {children}
                </div>
            </div>
        </div>,
        modalContainer
    ) : null
    )
   
  
}

export default BasicModal