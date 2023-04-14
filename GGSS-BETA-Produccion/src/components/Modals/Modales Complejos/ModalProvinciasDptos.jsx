import axios from "axios";
import { reject } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { actualizaCreaBarrios, actualizaCreaDptos, actualizaCreaLocalidades, actualizaCreaProvincias, actualizaDeleteBarrios, actualizaDeleteDptos, actualizaDeleteLocalidades, actualizaDeleteProvincias, actualizaModificarBarrios, actualizaModificarDptos, actualizaModificarLocalidades, actualizaModificarProvincias } from "../../../redux/actions/fetchActions";

import InputModal from "../../Inputs/InputModal/InputModal";
import TextArea from "../../Inputs/TextArea/TextArea";
import ChildBarrios from "./ChildsModalPDLB/ChildBarrios";
import ChildDepartamentos from "./ChildsModalPDLB/ChildDepartamentos";
import ChildLocalidades from "./ChildsModalPDLB/ChildLocalidades";
import ChildProvincias from "./ChildsModalPDLB/ChildProvincias";
// import { Link } from 'react-router-dom';
// import ButtonCallModal from '../../ButtonCallModal/ButtonCallModal';
// import InputModal from '../../Inputs/InputModal/InputModal';
// import TextArea from '../../Inputs/TextArea/TextArea';

export const ModalProvinciasDptos = ({
  nameModal,
  setNameModal,
  nameModalProp,
  setTransition,
  nameButton,
  children,
  modalValues,
  onChangeValues,
  valueItemModal,
  setValueItemModal,
  handleClickClose,
  array,
  propsModal,
  optionsInputs,
  transition,
  functionAdd,
  urlApi,
  bodyPetition,
  bodyUpdate,
  idAModificar,
  actualizaCreaFormasdePago,
  actualizaModificarFormasdePago,
  functionDelete,
  actionActualizaDelete,
  usaEstados,
  idInputTextArea,
  setDisableModalButtons,
  disableModalButtons,
  setDisableMOdal,
  setModify,
  actualizaCreate,
  actualizaUpdate,
  modify,
  reload,
  arrayList, 
  setArrayList
}) => {
  const [index, setIndex] = useState(0);
  const [ refetch, setRefetch ] = useState(false);
  const provinciaSelected = useSelector((state)=> state.modalState.provSelect);
  const departamentoSelected = useSelector((state)=> state.modalState.dptoSelect);
  const localidadSelected = useSelector((state)=> state.modalState.localSelect);
  const barrioSelected = useSelector((state)=> state.modalState.barrioSelect);
  const generalStateData = useSelector((state)=> state.generalState)
  const provinciasValue = useSelector((state) => state.generalState.provincias);
  const urlProvinciaCreate = `http://54.243.192.82/api/Provincias?IdProvincia=0&Provincia=${modalValues?.provincia}&Obs=${modalValues?.obsProvincia}`

 

  const dispatch = useDispatch();
  



  async function sendDataProvincias(id, actualizaCreate, actualizaUpdate){
    if(modify){
        try{
            await axios.post(`http://54.243.192.82/api/Provincias?IdProvincia=${id}&Provincia=${modalValues?.provincia}&Obs=${modalValues?.obsProvincia}`).then((res=>{
              if(res.status === 200){
                dispatch(actualizaUpdate({
                  "idProvincia": id,
                  "provincia": modalValues?.provincia,
                  "obs": modalValues?.obsProvincia
                }))
                setModify(false);
                setDisableMOdal(true)
                setRefetch(!refetch)
                
                return swal({
                  title : "Ok",
                  text : "Provincia actualizada con éxito",
                  icon : "success"
                });
              }
            }))
        }catch(err){
          setModify(false);
          setDisableMOdal(true);
            return swal({
              title : "Error",
              text : "Error al actualizar la Provincia" + err,
              icon : "error"
            });
        }
    }else{
      try{
        await axios.post(`http://54.243.192.82/api/Provincias?IdProvincia=0&Provincia=${modalValues?.provincia}&Obs=${modalValues?.obsProvincia}`).then((res=>{
          if(res.status === 200){
            setDisableMOdal(true);
            dispatch(actualizaCreate({
              "idProvincia": (provinciasValue &&
                provinciasValue[provinciasValue.length - 1] !== undefined &&
                provinciasValue[provinciasValue.length - 1].idProvincia) + 1,
              "provincia": modalValues?.provincia,
              "obs": modalValues?.obsProvincia
            }));
            setRefetch(!refetch)
            console.log("actualiza")
            return swal({
              title : "Ok",
              text : "Provincia creada con éxito",
              icon : "success"
            });
          }
        }))
      }catch(err){
        setDisableMOdal(true);
        return swal({
          title : "Error",
          text : "Error al crear la Provincia" + err,
          icon : "error"
        });
      }
    }
    
  }

  


  return (
    <div>
      <section
        className={transition ? "transitionClassUp" : " transitionClassneDone "}
      >
        <div className="cortina"></div>
        <div className="modalBodyClass">
          <div className="row p-2 titleBg">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <p className="h3">
                <ins>{propsModal[0].nameModal}</ins>
              </p>
              <button
                className="btn btn-outline-danger text-white fs-6 btn-md buttonModal border border-ligth"
                onClick={() => {
                  handleClickClose(nameModalProp);
                  setTransition(false);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={index === 0 ? "nav-link-color" : "nav-link-sinColor"}
                aria-current="page"
                href="#"
                onClick={() => setIndex(0)}
              >
                Provincias
              </a>
            </li>
            <li class="nav-item">
              <a
                className={index === 1 ? "nav-link-color" : "nav-link-sinColor"}
                aria-current="page"
                href="#"
                onClick={() => setIndex(1)}
              >
                Departamentos
              </a>
            </li>
            <li className="nav-item">
              <a
                className={index === 2 ? "nav-link-color" : "nav-link-sinColor"}
                aria-current="page"
                href="#"
                onClick={() => setIndex(2)}
              >
                Localidades
              </a>
            </li>
            <li className="nav-item">
              <a
                className={index === 3 ? "nav-link-color" : "nav-link-sinColor"}
                aria-current="page"
                href="#"
                onClick={() => setIndex(3)}
              >
                Barrios
              </a>
            </li>
          </ul>
          <div className="row p-2 selectModal">
            {index === 0 && (
              <ChildProvincias
                array={generalStateData.provincias !== undefined && generalStateData.provincias !== ""  ? generalStateData.provincias : []}
                disableModalButtons={disableModalButtons} 
                propsModal={propsModal}
                setValueItemModal={setValueItemModal}
                setDisableMOdal={setDisableMOdal}
                setDisableModalButtons={setDisableModalButtons}
                setModify={setModify}
                functionDelete={functionDelete}
                urlApi={urlApi}
                idAModificar={provinciaSelected?.idProvincia}
                optionsInputs={optionsInputs}
                usaEstados={usaEstados}
                idInputTextArea="obsProvincia"
                onChangeValues={onChangeValues}
                modalValues={modalValues}
                actionActualizaDelete={actualizaDeleteProvincias}
                actualizaCreate={actualizaCreaProvincias}
                actualizaUpdate={actualizaModificarProvincias}
                sendDataProvincias={sendDataProvincias}
              />
            )}
            {index === 1 && (
              <ChildDepartamentos
                array={ index === 1 ? arrayList?.departamentos : []}
                disableModalButtons={disableModalButtons}
                propsModal={propsModal}
                setValueItemModal={setValueItemModal}
                setDisableMOdal={setDisableMOdal}
                setDisableModalButtons={setDisableModalButtons}
                setModify={setModify}
                functionDelete={functionDelete}
                urlApi="http://54.243.192.82/api/Departamentos"
                idAModificar={departamentoSelected?.idDepartamento}
                optionsInputs={optionsInputs}
                usaEstados={usaEstados}
                idInputTextArea="obsDepartamentos"
                onChangeValues={onChangeValues}
                modalValues={modalValues}
                index={index}
                actionActualizaDelete={actualizaDeleteDptos}
                actualizaCreate={actualizaCreaDptos}
                actualizaUpdate={actualizaModificarDptos}
                functionAdd={functionAdd}
                reload={reload}
              />
            )}
            {index === 2 && (
              <ChildLocalidades
                array={index === 2 && arrayList?.departamentos?.length > 0 ? arrayList?.localidades : []}
                disableModalButtons={disableModalButtons}
                propsModal={propsModal}
                setValueItemModal={setValueItemModal}
                setDisableMOdal={setDisableMOdal}
                setDisableModalButtons={setDisableModalButtons}
                setModify={setModify}
                functionDelete={functionDelete}
                urlApi="http://54.243.192.82/api/Localidades"
                idAModificar={localidadSelected?.idLocalidad}
                optionsInputs={optionsInputs}
                usaEstados={usaEstados}
                idInputTextArea="obsLocalidad"
                onChangeValues={onChangeValues}
                modalValues={modalValues}
                provinciaSelected={provinciaSelected}
                index={index}
                actionActualizaDelete={actualizaDeleteLocalidades}
                actualizaCreate={actualizaCreaLocalidades}
                actualizaUpdate={actualizaModificarLocalidades}
                functionAdd={functionAdd}
                reload={reload}
              />
            )}
            {index === 3 && (
              <ChildBarrios
                disableModalButtons={disableModalButtons}
                propsModal={propsModal}
                setValueItemModal={setValueItemModal}
                setDisableMOdal={setDisableMOdal}
                setDisableModalButtons={setDisableModalButtons}
                setModify={setModify}
                functionDelete={functionDelete}
                urlApi="http://54.243.192.82/api/Barrios"
                idAModificar={barrioSelected?.idBarrio}
                optionsInputs={optionsInputs}
                usaEstados={usaEstados}
                idInputTextArea="obsBarrio"
                onChangeValues={onChangeValues}
                modalValues={modalValues}
                array={ index === 3 && arrayList?.departamentos?.length > 0 ? arrayList?.barrios : []}
                provinciaSelected={provinciaSelected}
                index={index}
                actionActualizaDelete={actualizaDeleteBarrios}
                actualizaCreate={actualizaCreaBarrios}
                actualizaUpdate={actualizaModificarBarrios}
                functionAdd={functionAdd}
                reload={reload}
                modify={modify}
              />
            )}
           
          </div>
        </div>
      </section>
    </div>
  );
};
