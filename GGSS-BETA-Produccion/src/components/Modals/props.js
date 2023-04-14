export const propsModal = {
    propArrayId : "idEstadoCivil",
    propArrayOp : "masculino",
    nameModal : "Estados Civiles"
};
export const propsModalEstudios = {
    propArrayId : "iDestudios",
    propArrayOp : "estudiosNivel",
    nameModal : "Estudios"
};
export const propsModalEstado = {
    propArrayId : "idEstado",
    propArrayOp : "nombreEstado",
    nameModal : "Estado"
};
export const propsModalFormasdePagos = {
    propArrayId : "iDformadePago",
    propArrayOp : "nombreFormadePago",
    nameModal : "Formas de Pago"
};
export const propsModalCargos = {
    propArrayId : "iDcargo",
    propArrayOp : "nombreCargo",
    nameModal : "Cargos"
}
export const propsModalTareas = {
    propArrayId : "idTareaDesempeñada",
    propArrayOp : "tareaDesempeñada",
    nameModal : "Tareas"
}
export const propsModalModosLiquidacion = {
    propArrayId : "iDmodoLiquidacion",
    propArrayOp : "modoLiquidacion",
    nameModal : "Modos de Liquidación"
}
export const propsModalTiposDocumento = {
    propArrayId : "iDtipoDocumento",
    propArrayOp : "tipoDocumento",
    nameModal : "Tipos Documento"
}
export const propsModalModosContratacion = {
    prosArrayId : "iDmodoContratacion",
    propArrayOp : "modoContratacion",
    nameModal : "Modos de Contratación"
}

export const propsModalCalles = {
    propArrayId : "idCalle",
    propArrayOp : "calle",
    nameModal : "Calle"
};
export const propsModalParentesco = {
    propArrayId : "iDparentesco",
    propArrayOp : "nombreParentesco",
    nameModal : "Parentescos"
};
export const propsModalPaises = {
    propArrayId : "idPais",
    propArrayOp : "nombrePais",
    nameModal : "Paises"
};
export const propsModalProvincias = [
    {
        propArrayId : "idProvincia",
        propArrayOp : "provincia",
        nameModal : "Provincias - Localidades - Departamentos - Barrios "
    },
    {
        propArrayId : "idDepartamento",
        propArrayOp : "departamento",
        nameModal : "Provincias - Localidades - Departamentos - Barrios "
    },
    {
        propArrayId : "idLocalidad",
        propArrayOp : "localidad",
        nameModal : "Provincias - Localidades - Departamentos - Barrios "
    },
    {
        propArrayId : "idBarrio",
        propArrayOp : "barrio",
        nameModal : "Provincias - Localidades - Departamentos - Barrios "
    }
];
export const propsModalEmpleadores = {
    propArrayId : "iDempleador",
    propArrayOp : "razonSocial",
    nameModal : "Empleadores"
}

export const propsModalDocumentacion = {
    propArrayId : "idDocumentacion",
    propArrayOp : "documentacion1",
    nameModal : "Documentación"
}
//FALTA EP
// export const propsModalAlicuotas = {
//     propArrayId : "idAlicuota",
//     propArrayOp : "alicuota",
//     nameModal : "Alicuotas"
// }
//FALTA EP
// export const propsModalMotivosdeEgresos = {
//     propArrayId : "idFormaPago",
//     propArrayOp : "nombreFormaPago",
//     nameModal : "Formas de Pago"
// };

export const objectEstadosCiviles = [
	{
		"label": "Masculino",
		"placeholder": "Casado",
        "idInput" : "masculino",
        "nameInput" : "masculino",
        "sexo" : "M"
	},
	{
		"label": "Femenino",
		"placeholder": "Casada",
        "idInput" : "femenino",
        "nameInput" : "femenino",
        "sexo" : "F"
	}
]
export const objectEstudios = [
	{
	"label": "Nivel de Estudios",
	"placeholder": "Universitario",
    "idInput": "estudiosNivel",
    "nameInput": "estudiosNivel"
	}
]
export const objectTipoDocumento = [
    {
      "label": "Tipo de Documento",
      "placeholder": "DNI",
      "idInput": "tipoDocumento",
      "nameInput": "tipoDocumento"
    }
  ]