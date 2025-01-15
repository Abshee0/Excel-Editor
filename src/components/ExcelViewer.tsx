import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Moon, Sun } from 'lucide-react';
import { WorkBook } from 'xlsx';
import { readExcelFile, getSheetData } from '../utils/excelUtils';
import SheetTabs from './SheetTabs';
import DataTable from './DataTable';
import UploadPlaceholder from './UploadPlaceholder';
import { useTheme } from './ThemeProvider';

export interface SheetData {
  headers: string[];
  rows: any[][];
}

export default function ExcelViewer() {
  const [workbook, setWorkbook] = useState<WorkBook | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [currentSheet, setCurrentSheet] = useState<string>('');
  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { workbook, sheetData } = await readExcelFile(file);
      setFileName(file.name);
      setWorkbook(workbook);
      setCurrentSheet(workbook.SheetNames[0]);
      setSheetData(sheetData);
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  };

  const handleSheetChange = (sheetName: string) => {
    if (!workbook) return;
    try {
      const newSheetData = getSheetData(workbook, sheetName);
      setCurrentSheet(sheetName);
      setSheetData(newSheetData);
    } catch (error) {
      console.error('Error switching sheets:', error);
    }
  };

  const handleRefresh = () => {
    if (!workbook || !currentSheet) return;
    try {
      const refreshedData = getSheetData(workbook, currentSheet);
      setSheetData(refreshedData);
    } catch (error) {
      console.error('Error refreshing sheet data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Excel Editor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <label className="flex items-center px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 mr-2" />
              Upload Excel File
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {fileName && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-gray-600 dark:text-gray-300">
              Current file: <span className="font-medium">{fileName}</span>
            </p>
          </div>
        )}

        {workbook && (
          <SheetTabs
            sheets={workbook.SheetNames}
            currentSheet={currentSheet}
            onSheetChange={handleSheetChange}
          />
        )}

        {!sheetData && <UploadPlaceholder />}

        {sheetData && (
          <DataTable
            data={sheetData}
            workbook={workbook!}
            currentSheet={currentSheet}
            fileName={fileName}
            onRefresh={handleRefresh}
          />
        )}
      </div>
    </div>
  );
}