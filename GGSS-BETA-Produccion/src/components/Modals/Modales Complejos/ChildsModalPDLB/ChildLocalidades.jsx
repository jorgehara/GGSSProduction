import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { classesTxtAreaModal } from '../../../../classes/classes';
import { selectedLoc } from '../../../../redux/actions/modalesActions';
import InputModal from '../../../Inputs/InputModal/InputModal';
import TextArea from '../../../Inputs/TextArea/TextArea';

const ChildLocalidades = ({
  disableModalButtons,array,propsModal,setValueItemModal, setDisableMOdal,setDisableModalButtons ,setModify,functionDelete, urlApi, idAModificar, actionActualizaDelete, optionsInputs,onChangeValues,modalValues,usaEstados,idInputTextArea,index,provinciaSelected,functionAdd,  actualizaCreate,
  actualizaUpdate
}) => {
  const dispatch = useDispatch();
  const [ arrayList, setArrayList ] = useState([]);
  const localidadSelected = useSelector((state)=> state.modalState.localSelect);
  const departamentoSelected = useSelector((state)=> state.modalState.dptoSelect);
  function updateList(array){
    if(index === 2){
      return setArrayList(array)
    }else{
      setArrayList([])
    }
  }
  useEffect(()=>{
    updateList(array);
  },[index])

  

  const bodyPetition = {
    "idLocalidad": 0,
    "localidad": modalValues?.localidad,
    "obs": modalValues?.obsLocalidad,
    "idDepartamento": departamentoSelected?.idDepartamento
  }
  const bodyUpdate = {
    "idLocalidad": localidadSelected?.idLocalidad,
    "localidad": modalValues?.localidad,
    "obs": modalValues?.obsLocalidad,
    "idDepartamento": departamentoSelected?.idDepartamento
  }
 
  return (
        <>
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
                          value={op && op[propsModal[2].propArrayId]}
                          onClick={() => {setValueItemModal(op); dispatch(selectedLoc(op))}}
                        >
                          {op && op[propsModal[2].propArrayOp]}
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
                    } }
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
                    } }
                  >
                    Modificar
                  </button>
                  <button
                    className="btn btn-dark"
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
                          placeholder={optionsInputs[1].placeholder}
                          nameLabel={optionsInputs[1].label}
                          idInput={optionsInputs[1].idInput}
                          onChangeValues={onChangeValues}
                          value={optionsInputs[1].idInput === "masculino"
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
    </>
  )
}

export default ChildLocalidades