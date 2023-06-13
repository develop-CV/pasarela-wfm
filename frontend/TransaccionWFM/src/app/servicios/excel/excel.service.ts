import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from "xlsx";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  // Convertir JSON a EXCEL
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }


  // Convertir EXCEL a JSON
  public exportAsJSON2(pathExcelFile: any) {
    const excel = XLSX.readFile(pathExcelFile);
    var hojas = excel.SheetNames;
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[hojas[0]]);

    // Si el Excel viene con un dato de FECHA se debe recorrer convirtiendo de la siguiente manera
    /*
    const datosReturn = [];
    for (let i = 0; i < datos.length; i++) {
      const dato = datos[i];
      datosReturn.push({
        ...dato,
        Fecha: new Date((dato.Fecha - (25567 + 2)) * 86400 * 1000)
      });
    }
    */

    return datos;
  }

  public exportAsJSON(evt: any) {
    return new Promise((resolve, reject) => {
      type AOA = any[][];
      var data: AOA = [[1, 2], [3, 4]];
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) reject('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = ((e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = (XLSX.utils.sheet_to_json(ws));
        resolve(data);
      });
      reader.readAsBinaryString(target.files[0]);
    })
  }
}
