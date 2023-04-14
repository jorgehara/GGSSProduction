import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { classesTxtAreaModal } from '../../../../classes/classes';
import { selectBarrio } from '../../../../redux/actions/modalesActions';
import InputModal from '../../../Inputs/InputModal/InputModal';
import TextArea from '../../../Inputs/TextArea/TextArea';

const ChildBarrios = ({
  disableModalButtons,array,propsModal,setValueItemModal, setDisableMOdal,setDisableModalButtons ,setModify,functionDelete, urlApi, idAModificar, actionActualizaDelete, optionsInputs,onChangeValues,modalValues,usaEstados,idInputTextArea ,index, functionAdd, actualizaCreate, actualizaUpdate,modify
}) => {
  const dispatch = useDispatch();
  const [ arrayList, setArrayList ] = useState([]);
  const [ refetch, setRefetch ] = useState(false);
  const barrioSelected = useSelector((state)=> state.modalState.barrioSelect);
  const localidadSelected = useSelector((state)=> state.modalState.localSelect);
  function updateList(array){
    if(index === 3){
      return setArrayList(array)
    }else{
      setArrayList([])
    }
  }
  useEffect(()=>{
    updateList(array);
  },[index])

  const bodyPetition ={
    "idBarrio": 0,
    "barrio": modalValues?.barrio,
    "obs": modalValues?.obsBarrio,
    "cp": Number(modalValues?.codigoPostal),
    "idLocalidad": localidadSelected?.idLocalidad
  }
  const bodyUpdate = {
    "idBarrio": barrioSelected?.idBarrio,
    "barrio": modalValues?.barrio,
    "obs": modalValues?.obsBarrio,
    "cp":Number(modalValues?.codigoPostal),
    "idLocalidad": localidadSelected?.idLocalidad
  }

    console.log(modify)
    console.log(barrioSelected)

  async function sendDataBarrios(actualizaCreate, actualizaUpdate){
    
    if(modify){
      try{
        await axios.post("http://54.243.192.82/api/Barrios", bodyUpdate)
        .then((res)=>{
          if(res.status === 200){
            console.log(res)
            setModify(false);
            setDisableMOdal(true);
            dispatch(actualizaUpdate(bodyUpdate))
            setRefetch(!refetch)
            return(
              swal({
                title : "Ok",
                text : "Barrio Actualizado con éxito",
                icon : "success"
              })
            )
          }
        })
      }catch(err){
        setModify(false);
        setDisableMOdal(true);
        return(
          swal({
            title : "Error",
            text : "Error al actualizar el Barrio " + err,
            icon : "error"
          })
        )
      }
    }else{
      try{
        await axios.post("http://54.243.192.82/api/Barrios", bodyPetition)
        .then((res)=>{
          if(res.status === 200){
            setDisableMOdal(true)
            dispatch(actualizaCreate(bodyPetition))
            setRefetch(!refetch)
            return(
              swal({
                title : "Ok",
                text : "Barrio creado con éxito",
                icon : "success"
              })
            )
          }
        })
      }catch(err){
        setDisableMOdal(true);
        return(
          swal({
            title : "Error",
            text : "Error al crear el Barrio " + err,
            icon : "error"
          })
        )
      }
    }
  }
  
  return (
    <>
     <div className="col-xl-6 border border-2 p-2 bodyBarrios">
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
                          value={op && op[propsModal[3].propArrayId]}
                          onClick={() => {setValueItemModal(op); dispatch(selectBarrio(op))}}
                        >
                          {op && op[propsModal[3].propArrayOp]}
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
              </div><div className="col-xl-6 bodyBarrios">
                  <div className="d-flex flex-column justify-content-start align-items-center">
                  <InputModal
                          disableModal={!disableModalButtons}
                          placeholder={optionsInputs[3].placeholder}
                          nameLabel={optionsInputs[3].label}
                          idInput={optionsInputs[3].idInput}
                          onChangeValues={onChangeValues}
                          value={optionsInputs[3].idInput === "masculino"
                            ? modalValues?.masculino
                            : modalValues?.femenino} />
                  <InputModal
                      disableModal={!disableModalButtons}
                      placeholder={optionsInputs[4].placeholder}
                      nameLabel={optionsInputs[4].label}
                      idInput={optionsInputs[4].idInput}
                      onChangeValues={onChangeValues}
                      value={optionsInputs[4].idInput === "masculino"
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
                  sendDataBarrios(
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

export default ChildBarrios