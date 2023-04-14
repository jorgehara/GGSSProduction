import React, { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>

      {isOpen && (
        <dialog open>
          <h2>Modal Title</h2>
          <p>Modal content goes here.</p>
          <button onClick={toggleModal}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default Modal;


// import React, { useState } from "react";

// const ModalEjemplo = () => {
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <button onClick={handleOpenModal}>Open Modal</button>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <p>Modal Content</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModalEjemplo;
