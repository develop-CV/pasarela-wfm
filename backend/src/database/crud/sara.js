let fs = require('fs');
const statement = require('../statementOracle.js');

class operacion {
    constructor() {
    }

    consultaPlanta() {
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
                if (ok == true) {
                    resolve(data);
                } else {
                    var errorDataBase = ''
                    if (error) {
                        errorDataBase = JSON.stringify(error);
                    } else {
                        errorDataBase = 'Error de Base de Datos no reconocido.';
                    };
                    reject(errorDataBase);
                };
            });

        });
    };

    consultaTransaccional(parametros) {
        return new Promise((resolve, reject) => {
            var fechaInicial =  ("00" + parametros.fechaInicial.getDate()).slice(-2) + "/" +
                                ("00" + (parametros.fechaInicial.getMonth() + 1)).slice(-2) + "/" +
                                parametros.fechaInicial.getFullYear() + " " +
                                ("00" + parametros.fechaInicial.getHours()).slice(-2) + ":" +
                                ("00" + parametros.fechaInicial.getMinutes()).slice(-2) + ":" +
                                ("00" + parametros.fechaInicial.getSeconds()).slice(-2);
            var fechaFinal =    ("00" + parametros.fechaFinal.getDate()).slice(-2) + "/" +
                                ("00" + (parametros.fechaFinal.getMonth() + 1)).slice(-2) + "/" +
                                parametros.fechaFinal.getFullYear() + " " +
                                ("00" + parametros.fechaFinal.getHours()).slice(-2) + ":" +
                                ("00" + parametros.fechaFinal.getMinutes()).slice(-2) + ":" +
                                ("00" + parametros.fechaFinal.getSeconds()).slice(-2);

            var sql = "SELECT   CODIGO, TIENDA, UNIDAD_COMERCIAL, CANAL, DRIVER_COMERCIAL, FECHA,";
            sql += "            NVL (H_00_00, '0') H_00_00,";
            sql += "            NVL (H_00_15, '0') H_00_15,";
            sql += "            NVL (H_00_30, '0') H_00_30,";
            sql += "            NVL (H_00_45, '0') H_00_45,";
            sql += "            NVL (H_01_00, '0') H_01_00,";
            sql += "            NVL (H_01_15, '0') H_01_15,";
            sql += "            NVL (H_01_30, '0') H_01_30,";
            sql += "            NVL (H_01_45, '0') H_01_45,";
            sql += "            NVL (H_02_00, '0') H_02_00,";
            sql += "            NVL (H_02_15, '0') H_02_15,";
            sql += "            NVL (H_02_30, '0') H_02_30,";
            sql += "            NVL (H_02_45, '0') H_02_45,";
            sql += "            NVL (H_03_00, '0') H_03_00,";
            sql += "            NVL (H_03_15, '0') H_03_15,";
            sql += "            NVL (H_03_30, '0') H_03_30,";
            sql += "            NVL (H_03_45, '0') H_03_45,";
            sql += "            NVL (H_04_00, '0') H_04_00,";
            sql += "            NVL (H_04_15, '0') H_04_15,";
            sql += "            NVL (H_04_30, '0') H_04_30,";
            sql += "            NVL (H_04_45, '0') H_04_45,";
            sql += "            NVL (H_05_00, '0') H_05_00,";
            sql += "            NVL (H_05_15, '0') H_05_15,";
            sql += "            NVL (H_05_30, '0') H_05_30,";
            sql += "            NVL (H_05_45, '0') H_05_45,";
            sql += "            NVL (H_06_00, '0') H_06_00,";
            sql += "            NVL (H_06_15, '0') H_06_15,";
            sql += "            NVL (H_06_30, '0') H_06_30,";
            sql += "            NVL (H_06_45, '0') H_06_45,";
            sql += "            NVL (H_07_00, '0') H_07_00,";
            sql += "            NVL (H_07_15, '0') H_07_15,";
            sql += "            NVL (H_07_30, '0') H_07_30,";
            sql += "            NVL (H_07_45, '0') H_07_45,";
            sql += "            NVL (H_08_00, '0') H_08_00,";
            sql += "            NVL (H_08_15, '0') H_08_15,";
            sql += "            NVL (H_08_30, '0') H_08_30,";
            sql += "            NVL (H_08_45, '0') H_08_45,";
            sql += "            NVL (H_09_00, '0') H_09_00,";
            sql += "            NVL (H_09_15, '0') H_09_15,";
            sql += "            NVL (H_09_30, '0') H_09_30,";
            sql += "            NVL (H_09_45, '0') H_09_45,";
            sql += "            NVL (H_10_00, '0') H_10_00,";
            sql += "            NVL (H_10_15, '0') H_10_15,";
            sql += "            NVL (H_10_30, '0') H_10_30,";
            sql += "            NVL (H_10_45, '0') H_10_45,";
            sql += "            NVL (H_11_00, '0') H_11_00,";
            sql += "            NVL (H_11_15, '0') H_11_15,";
            sql += "            NVL (H_11_30, '0') H_11_30,";
            sql += "            NVL (H_11_45, '0') H_11_45,";
            sql += "            NVL (H_12_00, '0') H_12_00,";
            sql += "            NVL (H_12_15, '0') H_12_15,";
            sql += "            NVL (H_12_30, '0') H_12_30,";
            sql += "            NVL (H_12_45, '0') H_12_45,";
            sql += "            NVL (H_13_00, '0') H_13_00,";
            sql += "            NVL (H_13_15, '0') H_13_15,";
            sql += "            NVL (H_13_30, '0') H_13_30,";
            sql += "            NVL (H_13_45, '0') H_13_45,";
            sql += "            NVL (H_14_00, '0') H_14_00,";
            sql += "            NVL (H_14_15, '0') H_14_15,";
            sql += "            NVL (H_14_30, '0') H_14_30,";
            sql += "            NVL (H_14_45, '0') H_14_45,";
            sql += "            NVL (H_15_00, '0') H_15_00,";
            sql += "            NVL (H_15_15, '0') H_15_15,";
            sql += "            NVL (H_15_30, '0') H_15_30,";
            sql += "            NVL (H_15_45, '0') H_15_45,";
            sql += "            NVL (H_16_00, '0') H_16_00,";
            sql += "            NVL (H_16_15, '0') H_16_15,";
            sql += "            NVL (H_16_30, '0') H_16_30,";
            sql += "            NVL (H_16_45, '0') H_16_45,";
            sql += "            NVL (H_17_00, '0') H_17_00,";
            sql += "            NVL (H_17_15, '0') H_17_15,";
            sql += "            NVL (H_17_30, '0') H_17_30,";
            sql += "            NVL (H_17_45, '0') H_17_45,";
            sql += "            NVL (H_18_00, '0') H_18_00,";
            sql += "            NVL (H_18_15, '0') H_18_15,";
            sql += "            NVL (H_18_30, '0') H_18_30,";
            sql += "            NVL (H_18_45, '0') H_18_45,";
            sql += "            NVL (H_19_00, '0') H_19_00,";
            sql += "            NVL (H_19_15, '0') H_19_15,";
            sql += "            NVL (H_19_30, '0') H_19_30,";
            sql += "            NVL (H_19_45, '0') H_19_45,";
            sql += "            NVL (H_20_00, '0') H_20_00,";
            sql += "            NVL (H_20_15, '0') H_20_15,";
            sql += "            NVL (H_20_30, '0') H_20_30,";
            sql += "            NVL (H_20_45, '0') H_20_45,";
            sql += "            NVL (H_21_00, '0') H_21_00,";
            sql += "            NVL (H_21_15, '0') H_21_15,";
            sql += "            NVL (H_21_30, '0') H_21_30,";
            sql += "            NVL (H_21_45, '0') H_21_45,";
            sql += "            NVL (H_22_00, '0') H_22_00,";
            sql += "            NVL (H_22_15, '0') H_22_15,";
            sql += "            NVL (H_22_30, '0') H_22_30,";
            sql += "            NVL (H_22_45, '0') H_22_45,";
            sql += "            NVL (H_23_00, '0') H_23_00,";
            sql += "            NVL (H_23_15, '0') H_23_15,";
            sql += "            NVL (H_23_30, '0') H_23_30,";
            sql += "            NVL (H_23_45, '0') H_23_45";
            sql += " FROM   XXOSIBI.TMP_COMERCIAL_WFM_SHIFT_V2";
            sql += " WHERE  FECHA BETWEEN TO_DATE ('" + fechaInicial + "', 'DD/MM/YYYY HH24:MI:SS')";
            sql += "        AND TO_DATE ('" + fechaFinal + "', 'DD/MM/YYYY HH24:MI:SS')";

            let consumo = new statement('BI');
            consumo.execSelect(sql, (ok, data, error) => {
                if (ok == true) {
                    resolve(data);
                } else {
                    var errorDataBase = ''
                    if (error) {
                        errorDataBase = JSON.stringify(error);
                    } else {
                        errorDataBase = 'Error de Base de Datos no reconocido.';
                    };
                    reject(errorDataBase);
                };
            });
        });
    };

    transaccionalParametrosConsulta() {
        return new Promise((resolve, reject) => {
            resolve({
                fechaInicial: new Date(2023, 4, 29, -5, 0, 0),
                fechaFinal: new Date(2023, 5, 4, 18, 59, 59) /* '04/06/2023 23:59:59' */
            });
        });
    };
};

module.exports = operacion;