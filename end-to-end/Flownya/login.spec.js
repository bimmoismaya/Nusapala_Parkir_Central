import {test} from '@playwright/test';

import{
    LoginLocal
} from '../Locator/loginLocal'

test.describe(' Login aja dulu ', {tag: '@Login'}, () =>{
    let HalamanParkir;

    test.beforeEach(async({ page }) =>{
        HalamanParkir = new LoginLocal(page);
        await HalamanParkir.gotoWebsite();
    })

    test(' flownya ', async () => {
        await HalamanParkir.inputUserInfo('Bimo1234567','12345678');
        await HalamanParkir.expectDashboard();
    })
} );

/////////////////////////////////////////




function kirimKePusat(e) {
  if (!e) return;
  const range = e.range;
  const sheet = range.getSheet();
  const namaSheetInput = "Bug List"; 
  
  if (sheet.getName() !== namaSheetInput) return;

  const row = range.getRow();
  const colStatus = 10; // Kolom J (Status) sebagai pemicu
  const colLog = 12;    // Kolom L untuk log status

  if (range.getColumn() == colStatus && range.getValue() !== "") {
    try {
      sheet.getRange(row, colLog).setValue("Sedang sinkron...").setFontColor("orange");

      // 1. Ambil Nama Project dari Judul File
      const namaProject = SpreadsheetApp.getActiveSpreadsheet().getName();

      // 2. Ambil semua data di baris tersebut & Header
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];

      // 3. Buat Object Map agar pengambilan data lebih deskriptif
      // Ini membuat kita bisa memanggil data berdasarkan nama headernya
      const dataMap = {};
      headers.forEach((header, index) => {
        dataMap[header] = rowData[index];
      });

      const idProjectLokal = dataMap["ID"];
      if (!idProjectLokal) throw new Error("ID Project Kosong");

      // 4. Susun data sesuai urutan Kolom B sampai M di Dokumen Sentral
      const dataUntukSentral = [
        namaProject,               // Kolom B
        idProjectLokal,            // Kolom C
        dataMap["Prioritas"],      // Kolom D
        dataMap["Severity"],       // Kolom E
        dataMap["Reporter"],       // Kolom F
        dataMap["Assign To"],      // Kolom G
        dataMap["Issue"],          // Kolom H
        dataMap["Step to Reproduce"], // Kolom I
        dataMap["Actual Result"],  // Kolom J
        dataMap["Expected Result"],// Kolom K
        dataMap["Status"],         // Kolom L
        dataMap["Report Date"]     // Kolom M
      ];

      // 5. Koneksi ke Dokumen Sentral
      const idPusat = "ID_SPREADSHEET_SENTRAL_KAMU"; 
      const ssPusat = SpreadsheetApp.openById(idPusat);
      const sheetPusat = ssPusat.getSheets()[0]; 
      const lastRowPusat = sheetPusat.getLastRow();

      // 6. Cari apakah ID sudah ada di Kolom C (Kolom 3) Sentral
      let targetRow = 0;
      if (lastRowPusat > 0) {
        const daftarIDPusat = sheetPusat.getRange(1, 3, lastRowPusat, 1).getValues();
        for (let i = 0; i < daftarIDPusat.length; i++) {
          if (daftarIDPusat[i][0] == idProjectLokal) {
            targetRow = i + 1;
            break;
          }
        }
      }

      // 7. Eksekusi Kirim/Update (Tulis mulai Kolom B/Kolom 2)
      if (targetRow > 0) {
        sheetPusat.getRange(targetRow, 2, 1, dataUntukSentral.length).setValues([dataUntukSentral]);
        var statusLog = "Berhasil diperbarui";
      } else {
        sheetPusat.appendRow(["", ...dataUntukSentral]); // Tambah baris baru (Kosongkan A, isi B-M)
        var statusLog = "Berhasil dikirim";
      }

      sheet.getRange(row, colLog).setValue(statusLog).setFontColor("green").setFontWeight("bold");
      range.setBackground("#d9ead3");

    } catch (err) {
      sheet.getRange(row, colLog).setValue("Gagal: " + err.message).setFontColor("red");
    }
  }
}