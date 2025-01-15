import { read, utils, WorkBook } from 'xlsx';
import { SheetData } from '../components/ExcelViewer';

export const getSheetData = (workbook: WorkBook, sheetName: string): SheetData => {
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert sheet to JSON with raw: false to get formatted values
  const jsonData = utils.sheet_to_json(worksheet, { 
    header: 1,
    raw: false,
    defval: '' // Use empty string for empty cells
  });

  if (!jsonData.length) {
    return { headers: [], rows: [] };
  }

  // Ensure all rows have the same length as headers
  const headers = jsonData[0] as string[];
  const rows = jsonData.slice(1).map(row => {
    const typedRow = row as any[];
    // Pad shorter rows with empty strings
    while (typedRow.length < headers.length) {
      typedRow.push('');
    }
    return typedRow;
  });

  return { headers, rows };
};

export const readExcelFile = async (file: File): Promise<{ workbook: WorkBook; sheetData: SheetData }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = read(data, { type: 'binary' });
        const firstSheet = workbook.SheetNames[0];
        const sheetData = getSheetData(workbook, firstSheet);
        resolve({ workbook, sheetData });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};