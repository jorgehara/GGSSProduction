import React from 'react'
import InputModal from '../../Inputs/InputModal/InputModal';

export const ModalPaises = ({
    nameModalProp,
    disabled,
    array,
    propsModal,
    optionsInputs,
    transition,
    setTransition,
    handleClickClose,
    functionAdd,
    functionDelete,
    setValueItemModal,
    onChangeValues,
    modalValues,
    urlApi,
    bodyPetition,
    bodyUpdate,
    setModify,
    idAModificar,
    setDisableMOdal,
    actionActualizaDelete,
    actualizaCreaFormasdePago,
    actualizaModificarFormasdePago,
    actualizaDeletePaises,
    actualizaCreaPaises,
    actualizaModificarPaises,
    disableModalButtons,
    setDisableModalButtons,
    actualizaCreate,
    actualizaUpdate
}) => {
  return (
        <section
      className={transition ? "transitionClassUp" : " transitionClassneDone "}
    >
      <div className="cortina"></div>
      <div className="modalBodyClass">
        <div className="row p-2 titleBg">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <p className="h3">
              <ins>{propsModal.nameModal}</ins>
            </p>
            <button
              className="btn btn-outline-danger text-white fs-6 btn-md buttonModal border border-dark"
              onClick={() => {
                handleClickClose(nameModalProp);
                setTransition(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="row p-2 selectModal">
          <div className="col-xl-6 border border-2 p-2 ">
            <select
              className="form-select selectMenus p-0 m-0"
              multiple
              aria-label="multiple select example"
              disabled={disableModalButtons}
            >
              {array &&
                array.map((op, i) => {
                  return (
                    <option
                      key={i}
                      value={op && op[propsModal.propArrayId]}
                      onClick={() => setValueItemModal(op)}
                      // si se rompe el abm comentar esta linea y descomentar la de abajo
                      //onClick={() => dispatch(dispatchGetID(op[propArrayId]))}
                    >
                      {op && op[propsModal.propArrayOp]}
                    </option>
                  );
                })}
            </select>
            <div className="d-flex flex-row justify-content-evenly align-items-center mt-1 ">
              <button
                className="btn btn-dark text-light"
                disabled={disableModalButtons}
                onClick={() => {
                  setDisableMOdal(false);
                  setDisableModalButtons(true);
                }}
              >
                Agregar
              </button>
              <button
                className="btn btn-dark text-light"
                disabled={disableModalButtons}
                onClick={() => {
                  setModify(true);
                  setDisableMOdal(false);
                  setDisableModalButtons(true);
                }}
              >
                Modificar
              </button>
              <button
                className="btn btn-dark"
                disabled={disableModalButtons}
                onClick={() => {
                  functionDelete(urlApi, idAModificar, 
                    actionActualizaDelete,
                    actualizaDeletePaises,
                    );
                  setDisableModalButtons(true);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="bodyInputs">
              {optionsInputs.map((option, index) => {
                return (
                  <InputModal
                    disableModal={!disableModalButtons}
                    key={index}
                    placeholder={option.placeholder}
                    nameLabel={option.label}
                    idInput={option.idInput}
                    onChangeValues={onChangeValues}
                    value={
                      option.idInput === "masculino"
                        ? modalValues?.masculino
                        : modalValues?.femenino
                    }
                  />
                );
              })}
            </div>
            <div className="d-flex flex-row-reverse w-100 ">
              <button
                className="btn btn-dark m-1"
                disabled={!disableModalButtons}
                onClick={() => {
                  functionAdd(
                    urlApi,
                    bodyPetition,
                    bodyUpdate,
                    idAModificar,
                    actualizaCreate,
                    actualizaUpdate
                  );
                  setDisableModalButtons(false);
                }}
              >
                Aceptar
              </button>
              <button
                className="btn btn-dark m-1"
                disabled={!disableModalButtons}
                onClick={() => {
                  setDisableModalButtons(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section> 
  )
}
