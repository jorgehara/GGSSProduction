import React from 'react'
import { useDispatch } from 'react-redux';
import { classesTxtAreaModal } from '../../../../classes/classes';
import { actualizaCreaProvincias, actualizaModificarProvincias } from '../../../../redux/actions/fetchActions';
import { selectedPro } from '../../../../redux/actions/modalesActions';
import InputModal from '../../../Inputs/InputModal/InputModal';
import TextArea from '../../../Inputs/TextArea/TextArea';

const ChildProvincias = ({disableModalButtons,array,propsModal,setValueItemModal, setDisableMOdal,setDisableModalButtons ,setModify,functionDelete, urlApi, idAModificar, actionActualizaDelete, optionsInputs,onChangeValues,modalValues,usaEstados,idInputTextArea, functionAdd,bodyPetition, bodyUpdate, sendDataProvincias }) => {
  
  const dispatch = useDispatch();
  
  
  
  return (
    <>
        <div className="col-xl-6 border border-2 p-2 ">
                <select
                  className="form-select selectMenus p-0 m-0"
                  multiple
                  id='provinciaSelect'
                  aria-label="multiple select example"
                  disabled={disableModalButtons}
                  onChange={(e)=> onChangeValues(e.target.value, "")}
                >
                  {array &&
                    array.map((op, i) => {
                      return (
                        <option
                          key={i}
                          value={op && op[propsModal[0].propArrayId]}
                          onClick={() => {setValueItemModal(op); dispatch(selectedPro(op))}}
                        >
                          {op && op[propsModal[0].propArrayOp]}
                        </option>
                      );
                    })}
                </select>
                <div className="d-flex flex-row justify-content-evenly align-items-center mt-1 ">
                  <button
                    className="btn btn-dark   text-light"
                    disabled={disableModalButtons}
                    onClick={() => {
                      setDisableMOdal(false);
                      setDisableModalButtons(true);
                    } }
                  >
                    Agregar
                  </button>
                  <button
                    className="btn btn-dark   text-light"
                    disabled={disableModalButtons}
                    onClick={() => {
                      setModify(true);
                      setDisableMOdal(false);
                      setDisableModalButtons(true);
                    } }
                  >
                    Modificar
                  </button>
                  <button
                    className="btn btn-dark  "
                    disabled={disableModalButtons}
                    onClick={() => {
                      functionDelete(urlApi, idAModificar, actionActualizaDelete);
                      setDisableModalButtons(true);
                    } }
                  >
                    Eliminar
                  </button>
                </div>
              </div><div className="col-xl-6">
                  <div className="d-flex flex-column justify-content-start align-items-center">
                    
                        <InputModal
                          disableModal={!disableModalButtons}
                          placeholder={optionsInputs[0].placeholder}
                          nameLabel={optionsInputs[0].label}
                          idInput={optionsInputs[0].idInput}
                          onChangeValues={onChangeValues}
                          value={optionsInputs[0].idInput === "masculino"
                            ? modalValues?.masculino
                            : modalValues?.femenino} />
                      
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
                  sendDataProvincias(
                    idAModificar,
                    actualizaCreaProvincias,
                    actualizaModificarProvincias
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
    </>
  )
}

export default ChildProvincias