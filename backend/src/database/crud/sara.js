let fs = require('fs');
const statement = require('../statementOracle.js');

class operacion{
    constructor(){
    }

    consultaPlanta(){
        return new Promise((resolve, reason) => {
            var sql = " SELECT DISTINCT";
            sql += "        a.MEML_HOJAVIDA \"codigo\"";
            sql += "        ,b.CHOV_NOMBRES \"nombres\"";
            sql += "        ,B.CHOV_PRIMERAPELLID \"primerApellido\"";
            sql += "        ,B.CHOV_SEGUNDOAPELLI \"segundoApellido\"";
            sql += "        ,TO_CHAR(A.DEML_INGRESO, 'YYYYMMDD') \"fechaInicioVigencia\"";
            sql += "        , '' \"email\"";
            sql += "        ,'' \"codigoEstablecimiento\"";
            sql += "        ,'' \"nombreEstablecimiento\"";
            sql += "        , a.CEML_CARGO \"codigoUnidadTrabajo\"";
            sql += "        , C.CCAR_DESCRIPCION \"nombreUnidadTrabajo\"";
            sql += "        , '' \"nivelExperto\"";
            sql += "        , '' \"tipoTrabajador\"";
            sql += "        , A.NEML_TURNO \"contrato\"";
            sql += "        , E.CTUR_DESCRIPCION \"descripcionContrato\"";
            sql += "        , A.CEML_ESTADOLABORAL \"contratado\"";
            sql += "        , '' \"realizaMarcaciones\"";
            sql += "        , '' \"borrarInformacionFutura\"";
            sql += "        ,TO_CHAR(A.DEML_RETIRO, 'YYYYMMDD')  \"fechaRetiro\"";
            sql += "        ,A.CEML_CENTROCOSTO \"centroCostos\"";
            sql += "        ,F.CCEC_DESCRIPCION \"descripcionCentroCostos\"";
            sql += "        ,TO_NUMBER(substr(A.CEML_CENTROCOSTO,5,6)) \"descripcionCentroCostosCorto\"";
            sql += " FROM   USARA.EMPLEADO_EML A,";
            sql += "        USARA.HOJAVIDA_HOV B,";
            sql += "        USARA.CARGO_CAR C,";
            sql += "        USARA.UNIDAD_UNI D,";
            sql += "        USARA.TURNO_TUR E,";
            sql += "        USARA.CENTROCOSTO_CEC F";
            sql += " WHERE  A.MEML_HOJAVIDA = B.MHOV_IDENTIFICA";
            sql += "        AND A.CEML_CARGO = C.CCAR_CARGO";
            sql += "        AND A.CEML_UNIDAD = D.CUNI_UNIDAD ";
            sql += "        AND A.NEML_TURNO = E.NTUR_TURNO";
            sql += "        AND A.CEML_CENTROCOSTO = F.CCEC_CENTROCOSTO";
            sql += "        AND (A.CEML_CENTROCOSTO LIKE('1140%')OR (A.CEML_CENTROCOSTO LIKE('1150%')))";
            sql += "        AND A.CEML_ESTADOLABORAL = 'A'";
            sql += " UNION ";
            sql += "SELECT DISTINCT";
            sql += "        a.MEML_HOJAVIDA";
            sql += "        ,b.CHOV_NOMBRES";
            sql += "        ,B.CHOV_PRIMERAPELLID";
            sql += "        ,B.CHOV_SEGUNDOAPELLI";
            sql += "        ,TO_CHAR(A.DEML_INGRESO, 'YYYYMMDD')";
            sql += "        , ''";
            sql += "        ,''";
            sql += "        ,''";
            sql += "        , a.CEML_CARGO";
            sql += "        , C.CCAR_DESCRIPCION";
            sql += "        , ''";
            sql += "        , ''";
            sql += "        , A.NEML_TURNO";
            sql += "        , E.CTUR_DESCRIPCION";
            sql += "        , A.CEML_ESTADOLABORAL";
            sql += "        , ''";
            sql += "        , ''";
            sql += "        ,TO_CHAR(A.DEML_RETIRO, 'YYYYMMDD')";
            sql += "        ,A.CEML_CENTROCOSTO";
            sql += "        ,F.CCEC_DESCRIPCION";
            sql += "        ,TO_NUMBER(substr(A.CEML_CENTROCOSTO,5,6))";
            sql += " FROM   USARA.EMPLEADO_EML A,";
            sql += "        USARA.HOJAVIDA_HOV B,";
            sql += "        USARA.CARGO_CAR C,";
            sql += "        USARA.UNIDAD_UNI D,";
            sql += "        USARA.TURNO_TUR E,";
            sql += "        USARA.CENTROCOSTO_CEC F";
            sql += " WHERE  A.MEML_HOJAVIDA = B.MHOV_IDENTIFICA";
            sql += "        AND A.CEML_CARGO = C.CCAR_CARGO";
            sql += "        AND A.CEML_UNIDAD = D.CUNI_UNIDAD ";
            sql += "        AND A.NEML_TURNO = E.NTUR_TURNO";
            sql += "        AND A.CEML_CENTROCOSTO = F.CCEC_CENTROCOSTO";
            sql += "        AND (A.CEML_CENTROCOSTO LIKE('1140%')OR (A.CEML_CENTROCOSTO LIKE('1150%')))";
            sql += "        AND A.CEML_ESTADOLABORAL = 'R'";
            sql += "        AND A.DEML_RETIRO >= TO_DATE('01/01/2021 00:00:00', 'DD/MM/YYYY HH24:MI:SS')";
            
            let consumo = new statement('SARA');
            consumo.execSelect(sql, (ok, data, error) => {
                if (ok == true){
                    resolve(data);
                }else{
                    var errorDataBase = ''
                    if (error){
                        errorDataBase = JSON.stringify(error);
                    }else{
                        errorDataBase = 'Error de Base de Datos no reconocido.';
                    };
                    reason(errorDataBase);
                };
            });
            
        });
    };
};

module.exports = operacion;