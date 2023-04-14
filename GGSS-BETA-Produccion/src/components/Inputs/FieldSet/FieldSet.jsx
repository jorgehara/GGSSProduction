import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  addNewLicencia,
  updateLicencia,
  deleteLicencia,
} from "../../../redux/actions/fetchActions";
import {
  deleteLicEmpleado,
  licenciaSelected,
  saveIdsLic,
} from "../../../redux/actions/licenciasActions";
import TableLicencias from "../../Tables/TableLicencias";
import TableSuspenLicencia from "../../Tables/TableSuspenLicencia";
import FechaSuspencion from "./Childs/FechaSuspencion";
import NuevaLicencia from "./Childs/NuevaLicencia";
import PorPeriodo from "./Childs/PorPeriodo";
import Prorroga from "./Childs/Prorroga";
import "./FieldSet.css";

const FieldSet = ({
  array,
  valueId,
  propArrayOpFem,
  opciones,
  selectedOption,
  onChange,
  valueForm,
  detalleLicencia,
  sendData,
  formLicencias,
  setLicenciaEmpladoDatos,
  setRefectch,
  refetch,
  disabled,
  setFormLicencias,
  type,
  cancelar,
  aceptar,
}) => {
  const columns1 = [
    "Seleccionar",
    "Año",
    "Días Totales",
    "Tomados",
    "Restan",
    "Vto",
    "Prórroga",
    "Resolución",
    "Disponibles",
  ];
  const columns2 = ["Seleccionar", "Desde", "Hasta", "Fecha Suspensión"];

  const empleadoUno = useSelector((state) => state.employeStates.employe);

  const licenciuaSelected = useSelector(
    (state) => state.licenciasState.licenciaSelected
  );

  const detalleSelected = useSelector(
    (state) => state.licenciasState.detalleSelect
  );
  const licenciaDelEmpleado = useSelector(
    (state) => state.licenciasState.licenciasEmpleado
  );

  const iconAdd = "./icons/add.svg";
  const iconDelete = "./icons/delete.svg";
  const iconAddWhite = "./icons/add-white.svg";
  const iconDeleteWhite = "./icons/delete-white.svg";

  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isHoveringDeleteTwo, setIsHoveringDeleteTwo] = useState(false);
  const [isHoveringAdd, setIsHoveringAdd] = useState(false);

  const handleMouseEnterDelete = () => {
    setIsHoveringDelete(true);
  };
  const handleMouseEnterDeleteTwo = () => {
    setIsHoveringDeleteTwo(true);
  };

  const handleMouseLeaveDelete = () => {
    setIsHoveringDelete(false);
  };

  const handleMouseLeaveDeleteTwo = () => {
    setIsHoveringDeleteTwo(false);
  };

  const handleMouseEnterAdd = () => {
    setIsHoveringAdd(true);
  };

  const handleMouseLeaveAdd = () => {
    setIsHoveringAdd(false);
  };

  const url = `http://54.243.192.82/api/ActualizaDisponibles/0?idEmpleado=${empleadoUno.iDempleado}&anio=${formLicencias?.inputCboAñosLicencia}&diasDisponiblesTotales=${formLicencias?.inputCantDiasDispLicencia}&fechaVencimiento=${formLicencias?.inputVencimientoLicencias}&newId=0`;

  const urlCreateLicencia = "http://54.243.192.82/api/InsertarNuevaLicencia";
  const urlCreateLicencias = `http://54.243.192.82/api/ActualizaDisponibles/0?idEmpleado=${empleadoUno.iDempleado}&anio=${formLicencias?.inputCboAñosLicencia}&diasDisponiblesTotales=${formLicencias?.inputCantDiasDispLicencia}&fechaVencimiento=${formLicencias?.inputVencimientoLicencias}&newId=0`;

  const urlLicencias = "http://54.243.192.82/api/ModificarDatos";
  const detalleSeleccionado = useSelector(
    (state) => state.licenciasState.detalleSelect
  );
  const idSelected = useSelector((state) => state.licenciasState.idSelected);

  const urlCreateDetalleLicencia = `http://54.243.192.82/api/DetalleLicenciasEmpleados`;
  const urlDetalleLicenciaEmpleados =
    "http://54.243.192.82/api/DetalleLicenciasEmpleados";
  const urlDeleteLicencia = "http://54.243.192.82/api/";
  const dispatch = useDispatch();
  const urlLicenciaEmpleados = "http://54.243.192.82/api/MostrarDatosLicencias";
  const licenciasDelEmpleado = useSelector(
    (state) => state.licenciasState.licenciasEmpleado
  );

  const urlUpdateDetalle = `http://54.243.192.82/api/DetalleLicenciasEmpleados?IdDetalleLicenciaEmpleado=${detalleSeleccionado.idDetalleLicenciaEmpleado}&FechaSuspension=${formLicencias?.inputDateSuspLic}`;

  const [checked, setChecked] = useState(false);

  let urlNueva =
    "http://54.243.192.82/api/DetalleLicenciasEmpleados?IdDetalleLicenciaEmpleado=0&IdLicenciaEmpleado=${}&Desde=2017-07-21T17%3A32%3A28Z&Hasta=2017-07-21T17%3A32%3A28Z&NewId=0";

  let bodyLicencias = {
    idEmpleado: empleadoUno.iDempleado,
    año: Number(
      formLicencias?.inputCboAñosLicencia && formLicencias?.inputCboAñosLicencia
    ),
    diasDisponiblesTotales: formLicencias?.inputCantDiasDispLicencia,
    fechaVencimiento: formLicencias?.inputVencimientoLicencias,
    desde: null,
    hasta: null,
    fechaProrroga: null,
    nroResolucion: null,
  };

  let bodyLicenciasUpdateSolicita = {
    idLicenciaEmpleado: licenciuaSelected?.idLicenciaEmpleado,
    idEmpleado: licenciuaSelected?.idEmpleado,
    año: Number(
      formLicencias?.inputCboAñosLicencia && formLicencias?.inputCboAñosLicencia
    ),
    diasDisponiblesTotales: formLicencias?.inputCantDiasDispLicencia,
    fechaVencimiento: formLicencias?.inputVencimientoLicencias,
    desde: formLicencias?.inputDesdeSolicitaLic,
    hasta: formLicencias?.inputHastaSolicitaLic,
    fechaProrroga: null,
    nroResolucion: null,
  };

  let bodyLicenciasUpdateProrroga = {
    idLicenciaEmpleado: licenciuaSelected?.idLicenciaEmpleado,
    idEmpleado: empleadoUno?.iDempleado,
    año: licenciuaSelected?.año,
    diasDisponiblesTotales: licenciuaSelected?.diasDisponiblesTotales,
    fechaVencimiento: licenciuaSelected?.fechaVencimiento,
    diasDisponibles: licenciuaSelected?.diasDisponibles,
    diasTomados: licenciuaSelected?.diasTomados,
    fechaProrroga: formLicencias?.inputNuevaFechaLic,
    nroResolucion: formLicencias?.inputNuevaResolucionLic,
  };

  const arrayIds = useSelector((state) => state.licenciasState.idsLic);

  const bodyDetalleLicencia = {
    IdDetalleLicenciaEmpleado: 0,
    IdLicenciaEmpleado:
      licenciuaSelected && licenciuaSelected.idLicenciaEmpleado,
    Desde: formLicencias && formLicencias.inputDesdeSolicitaLic,
    Hasta: formLicencias && formLicencias.inputHastaSolicitaLic,
  };

  let dateOne = new Date(formLicencias?.inputDesdeSolicitaLic).setHours(
    0,
    0,
    0,
    0
  );

  let dateTwo = new Date(
    licenciuaSelected?.fechaVencimiento &&
      licenciuaSelected?.fechaVencimiento.substring(
        0,
        licenciuaSelected?.fechaVencimiento.length - 9
      )
  ).setHours(0, 0, 0, 0);

  let dateProrroga = new Date(formLicencias?.inputNuevaFechaLic).setHours(
    0,
    0,
    0,
    0
  );

  let dateHasta = new Date();

  const bodyDeleteSusp = {
    idDetalleLicenciaEmpleado: detalleSeleccionado.idDetalleLicenciaEmpleado,
    fechaSuspension: null,
  };
  const bodyCreateSusp = {
    idDetalleLicenciaEmpleado: detalleSeleccionado.idDetalleLicenciaEmpleado,
    fechaSuspension: formLicencias?.inputDateSuspLic,
  };

  async function deleteSuspencion() {
    try {
      axios
        .put(
          `http://54.243.192.82/api/DetalleLicenciasEmpleados`,
          bodyDeleteSusp
        )
        .then((res) => {
          setRefectch(!refetch);
        });
    } catch (err) {
      return swal({
        title: "Error",
        text: `Error al eliminar la fecha de suspensión`,
        icon: "error",
      });
    }
  }
  let dateHastas = new Date(detalleSeleccionado.hasta).setHours(0, 0, 0, 0);
  let dateSusp = new Date(formLicencias?.inputDateSuspLic).setHours(0, 0, 0, 0);



  async function updateDetalle(url) {
    let dateDesde = new Date(detalleSeleccionado.desde).setHours(0, 0, 0, 0);
    let dateHasta = new Date(detalleSeleccionado.hasta).setHours(0, 0, 0, 0);
    let dateSusp = new Date(formLicencias?.inputDateSuspLic).setHours(
      0,
      0,
      0,
      0
    );

    if (detalleSeleccionado) {
      if (
        dateSusp.valueOf() < dateHasta.valueOf() &&
        !formLicencias?.inputQuitaSusp
      ) {
        try {
          await axios
            .put(
              `http://54.243.192.82/api/DetalleLicenciasEmpleados`,
              bodyCreateSusp
            )
            .then((res) => {
            });
        } catch (err) {
          return swal({
            title: "Error",
            text: `Error al insertar la fecha de suspensión`,
            icon: "error",
          });
        }
      } else if (formLicencias?.inputQuitaSusp) {
        try {
          axios
            .put(
              `http://54.243.192.82/api/DetalleLicenciasEmpleados`,
              bodyDeleteSusp
            )
            .then((res) => {
              setRefectch(!refetch);
            });
        } catch (err) {
          return swal({
            title: "Error",
            text: `Error al eliminar la fecha de suspensión`,
            icon: "error",
          });
        }
      } else {
        return swal({
          title: "Error",
          text: `Error la fecha de Suspensión debe ser menor a la Fecha de finalización`,
          icon: "error",
        });
      }
      return;
    }
    return swal({
      title: "Error",
      text: `Debe seleccionar un Detalle de Licencia`,
      icon: "error",
    });
  }
  async function updateData(url, bodyPetition, id) {
    if (dateTwo.valueOf() > dateProrroga) {
      return swal({
        title: "Error",
        text: `La fecha de Prorroga debe ser mayor a la Fecha de Vencimiento`,
        icon: "error",
      });
    }
    if (id) {
      try {
        await axios.put(url, bodyPetition).then((res) => {
          setRefectch(!refetch);
        });
      } catch (err) {
        return swal({
          title: "Error",
          text: `Error al actualizar la Licencia/Detalle de Licencia, error: ${err}`,
          icon: "error",
        });
      }
    } else
      return swal({
        title: "Error",
        text: `Debe seleccionar una Licencia/Detalle de Licencia`,
        icon: "error",
      });
  }
  function deleteLicenciaAxios(id) {
    dispatch(deleteLicEmpleado(id));
    dispatch(saveIdsLic(id));
  }
  function deleteDetalleLicencia(urlDetalleLicenciaEmpleados, id) {
    swal({
      title: "¿Desea eliminar el Detalle de Licencia?",
      text: "Si acepta, el detalle se eliminará de la Base de Datos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`${urlDetalleLicenciaEmpleados}/${id}`).then((res) => {
          setRefectch(!refetch);
          return swal("Detalle eliminado con éxito", {
            icon: "success",
          });
        });
      } else {
        return swal("Cancelado, puede seguir operando");
      }
    });
  }

  const bodyPetitionCreate = {
    idEmpleado: empleadoUno?.iDempleado,
    año: formLicencias?.inputCboAñosLicencia,
    diasDisponiblesTotales: formLicencias?.inputCantDiasDispLicencia,
    fechaVencimiento: formLicencias?.inputVencimientoLicencias,
    desde: null,
    hasta: null,
    fechaProrroga: null,
    nroResolucion: null,
  };
  function deleteWithOptions() {
    switch (selectedOption) {
      case "1 - Disponibles por Periodo" ||
        "3 - Prorroga Vencimiento" ||
        "2 - Solicita Nueva Licencia":
        deleteLicenciaAxios(idSelected);
        break;
      case "4 - Suspende Licencia":
        updateData(
          urlDeleteLicencia,
          bodyLicenciasUpdateSolicita,
          updateLicencia,
          licenciuaSelected.idEmpleado
        );
        break;

      default:
        return swal({
          title: "Error",
          text: `Debe seleccionar "1 - Disponibles por Periodo" para eliminar Licencia`,
          icon: "error",
        });
    }
  }
  function fetchApiWithOptions() {
    switch (selectedOption) {
      case "1 - Disponibles por Periodo":
        sendData(urlCreateLicencia, addNewLicencia, bodyPetitionCreate);
        break;
      case "2 - Solicita Nueva Licencia":
        solicitanuevaLic(bodyDetalleLicencia, bodyPetitionCreate);
        break;
      case "3 - Prorroga Vencimiento":
        updateData(urlLicencias, bodyLicenciasUpdateProrroga, idSelected);
        break;
      case "4 - Suspende Licencia":
        updateDetalle(urlUpdateDetalle);
        break;
      default:
        return null;
    }
  }

  async function solicitanuevaLic(bodyDetalleLicencia) {
    debugger;
    if (licenciuaSelected.fechaProrroga && licenciuaSelected.fechaProrroga) {
      let dateProrroga = new Date(licenciuaSelected.fechaProrroga).setHours(
        0,
        0,
        0,
        0
      );

      if (dateOne.valueOf() < dateProrroga.valueOf()) {
        await axios
          .post(urlCreateDetalleLicencia, bodyDetalleLicencia)
          .then((res) => {
            setRefectch(!refetch);
          });
      } else {
        return swal({
          title: "Error",
          text: `La fecha de nueva Licencia no puede ser superior a la Fecha de Prórroga`,
          icon: "error",
        });
      }
      return;
    }
    if (dateOne.valueOf() < dateTwo.valueOf()) {
      await axios
        .post(urlCreateDetalleLicencia, bodyDetalleLicencia)
        .then((res) => {
          setRefectch(!refetch);
        });
    } else
      return swal({
        title: "Error",
        text: `La fecha de nueva Licencia no puede ser superior a la Fecha de Vencimiento`,
        icon: "error",
      });
  }
  return (
    <>
      <div className="contenedorFieldSet">
        <fieldset className="border p-2">
          <legend className="float-none w-auto p-2 contenedorFieldSet">
            {selectedOption &&
              selectedOption === "1 - Disponibles por Periodo" &&
              "Cargar disponibles por periodo"}
            {selectedOption &&
              selectedOption === "2 - Solicita Nueva Licencia" &&
              "Solicita Nueva Licencia"}
            {selectedOption &&
              selectedOption === "3 - Prorroga Vencimiento" &&
              "Prorroga Vencimiento"}
            {selectedOption &&
              selectedOption === "4 - Suspende Licencia" &&
              "Suspende Licencia"}
          </legend>
          <div className="row">
            <div className="col-xl-4"></div>
            {selectedOption &&
              selectedOption === "1 - Disponibles por Periodo" && (
                <PorPeriodo
                  setChecked={setChecked}
                  checked={checked}
                  sendData={sendData}
                  valueForm={valueForm}
                  onChange={onChange}
                  valueId={valueId}
                  array={array}
                  propArrayOpFem={propArrayOpFem}
                />
              )}
            {selectedOption &&
              selectedOption === "2 - Solicita Nueva Licencia" && (
                <NuevaLicencia
                  setChecked={setChecked}
                  checked={checked}
                  valueForm={valueForm}
                  onChange={onChange}
                  valueId={valueId}
                  array={array}
                  propArrayOpFem={propArrayOpFem}
                />
              )}
            {selectedOption &&
              selectedOption === "3 - Prorroga Vencimiento" && (
                <Prorroga
                  setChecked={setChecked}
                  checked={checked}
                  valueForm={valueForm}
                  onChange={onChange}
                />
              )}
            {selectedOption && selectedOption === "4 - Suspende Licencia" && (
              <FechaSuspencion
                setFormLicencias={setFormLicencias}
                setCheckeds={setChecked}
                checked={checked}
                valueForm={valueForm}
                onChange={onChange}
                formLicencias={formLicencias}
              />
            )}
          </div>
        </fieldset>
        <div className="col-xl-12 d-flex flex-row-reverse mt-2 w-100 gap-1">
          <button
            className="btn border border-danger btn-outline-danger btnAgregar buttonWidth"
            onClick={deleteWithOptions}
            onMouseEnter={handleMouseEnterDelete}
            onMouseLeave={handleMouseLeaveDelete}
            disabled={disabled}
          >
            {cancelar ? (
              <img
                src={isHoveringDelete ? iconDeleteWhite : iconDelete}
                alt={type}
              />
            ) : (
              aceptar
            )}
          </button>
          <button
            className="btn border border-success btn-outline-success btnAgregar buttonWidth "
            onClick={fetchApiWithOptions}
            onMouseEnter={handleMouseEnterAdd}
            onMouseLeave={handleMouseLeaveAdd}
            disabled={disabled}
          >
              {aceptar ? (
              <img
                src={isHoveringAdd ? iconAddWhite : iconAdd}
                alt={type}
              />
            ) : (
              cancelar
            )}
          </button>
        </div>
        <TableLicencias
          refetch={refetch}
          setRefectch={setRefectch}
          setChecked={setChecked}
          checked={checked}
          licenciaDelEmpleado={licenciasDelEmpleado}
          columns={columns1}
          value={[]}
          disabled={disabled}
        />
        <div className="col-xl-12 d-flex flex-row-reverse mt-2">
          <button
            className="btn border border-danger btn-outline-danger btnAgregar buttonWidth"
            disabled={disabled}
            onClick={() =>
              deleteDetalleLicencia(
                urlDetalleLicenciaEmpleados,
                detalleSeleccionado.idDetalleLicenciaEmpleado
              )
            }
            onMouseEnter={handleMouseEnterDeleteTwo}
            onMouseLeave={handleMouseLeaveDeleteTwo}
          >
            {cancelar ? (
              <img
                src={isHoveringDeleteTwo ? iconDeleteWhite : iconDelete}
                alt={type}
              />
            ) : (
              aceptar
            )}
          </button>
        </div>
        <TableSuspenLicencia
          detalleSeleccionado={detalleSeleccionado}
          licenciaDelEmpleado={licenciaDelEmpleado}
          detalleLicencia={detalleLicencia}
          columns={columns2}
          value={[]}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default FieldSet;
