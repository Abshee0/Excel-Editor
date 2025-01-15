import { WorkBook, WorkSheet, utils } from 'xlsx';

// Apply styling to a single worksheet
export const applyWorksheetStyles = (ws: WorkSheet) => {
  const range = utils.decode_range(ws['!ref'] || 'A1:A1');
  
  const headerStyle = {
    fill: { fgColor: { rgb: "4B5563" } },
    font: { color: { rgb: "FFFFFF" }, bold: true },
    border: {
      top: { style: 'thin', color: { rgb: "000000" } },
      bottom: { style: 'thin', color: { rgb: "000000" } },
      left: { style: 'thin', color: { rgb: "000000" } },
      right: { style: 'thin', color: { rgb: "000000" } }
    },
    alignment: { horizontal: 'center', vertical: 'center' }
  };

  const cellStyle = {
    fill: { fgColor: { rgb: "FFFFFF" } },
    font: { color: { rgb: "000000" } },
    border: {
      top: { style: 'thin', color: { rgb: "E5E7EB" } },
      bottom: { style: 'thin', color: { rgb: "E5E7EB" } },
      left: { style: 'thin', color: { rgb: "E5E7EB" } },
      right: { style: 'thin', color: { rgb: "E5E7EB" } }
    },
    alignment: { vertical: 'center' }
  };

  // Apply column widths
  ws['!cols'] = Array(range.e.c - range.s.c + 1).fill({ wch: 15 });

  // Apply row heights
  ws['!rows'] = Array(range.e.r - range.s.r + 1).fill({ hpt: 25 });

  // Apply styles to all cells
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = utils.encode_cell({ r: R, c: C });
      if (!ws[cellRef]) {
        ws[cellRef] = { v: '', t: 's' }; // Create empty cell if it doesn't exist
      }
      ws[cellRef].s = R === 0 ? headerStyle : cellStyle;
    }
  }
};

// Apply styling to entire workbook
export const applyWorkbookStyles = (workbook: WorkBook) => {
  workbook.SheetNames.forEach(sheetName => {
    const ws = workbook.Sheets[sheetName];
    applyWorksheetStyles(ws);
  });
};