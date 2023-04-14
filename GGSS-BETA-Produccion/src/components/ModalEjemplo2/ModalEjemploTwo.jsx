import React, { useState } from "react";

const ModalEjemploTwo = () => {
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

export default ModalEjemploTwo;