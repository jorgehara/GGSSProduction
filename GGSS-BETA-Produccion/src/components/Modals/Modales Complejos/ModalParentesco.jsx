import React from "react";
import { classesTxtAreaModal } from "../../../classes/classes";
import InputModal from "../../Inputs/InputModal/InputModal";
import TextArea from "../../Inputs/TextArea/TextArea";

export const ModalParentesco = ({
  nameModalProp,
  disabled,
  array,
  propsModal,
  optionsInputs,
  transition,
  setTransition,
  handleClickClose,
  functionAdd,
  functionUpdate,
  functionDelete,
  valueItemModal,
  setValueItemModal,
  onChangeValues,
  modalValues,
  urlApi,
  bodyPetition,
  bodyUpdate,
  setModify,
  modify,
  idAModificar,
  disableModal,
  setDisableMOdal,
  actionActualizaDelete,
  actualizaCreaFormasdePago,
  actualizaModificarFormasdePago,
  idInputTextArea,
  disableModalButtons,
  setDisableModalButtons,
  usaEstados,
  usaCheck,
  nameInputCheck,
  nameInputCheckTwo,
  checked,
  nameLabelValorDeduccion,
  actualizaDeleteParentesco,
  actualizaCreaParentesco,
  actualizaModificarParentesco,
  idCheckGenera,
  idCheckGanancias,
  idInputImporte,
  valueInputImporte,
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
                  functionDelete(
                    urlApi,
                    idAModificar,
                    actionActualizaDelete
                  );
                  setDisableModalButtons(true);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="d-flex flex-column justify-content-start align-items-center">
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
            <div className="d-flex flex-row justify-content-start align-items-center w-100 ">
              <div class="form-check p-0 d-flex flex-row justify-content-start align-items-center">
                <label class=" labelModalParentesco" for="flexCheckDefault">
                  {nameInputCheck}
                </label>
              </div>
              <input
                className="form-check-input "
                onChange={(e)=> onChangeValues(e.target.checked , idCheckGenera)}
                type="checkbox"
                id={idCheckGenera}
                checked={checked}
                disabled={disabled}
              />
            </div>
            
            <div className="d-flex flex-row justify-content-start align-items-center w-100 ">
            <div class="form-check p-0 d-flex flex-row justify-content-start align-items-center">
              <label class=" labelModalParentesco" for="flexCheckDefault">
                {nameInputCheckTwo}
              </label>
            </div>
              <input
                className="form-check-input "
                onChange={(e)=> onChangeValues(e.target.checked , idCheckGanancias)}
                type="checkbox"
                id={idCheckGanancias}
                checked={checked}
                disabled={disabled}
              />
            </div>
            <div className="">
              <label for="inputPassword3" className="col-sm-4 col-form-label">
                {nameLabelValorDeduccion}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="inputModal"
                  onChange={(e)=> onChangeValues(e.target.value , idInputImporte)}
                  id={idInputImporte}
                  value={valueInputImporte}
                  // name={idInput}
                  // placeholder={placeholder}
                  // value={value}
                  // onChange={(e) => onChange(e.target.value, inputId)} // ON CHANGE NUEVO PARA LA NUEVA FUNCION (NO ANDA)
                  // onChange={(e) => onChangeValues(e.target.value, idInput)}
                  // disabled={disableModal}
                />
              </div>
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              disabled={!disableModalButtons}
            >
              {usaEstados && (
                <TextArea
                  clasess={classesTxtAreaModal}
                  disableModal={!disableModalButtons}
                  idInput={idInputTextArea}
                  onChange={onChangeValues}
                  characterLimit={255}
                ></TextArea>
              )}
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
  );
};
