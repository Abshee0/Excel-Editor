import React, { useState, useEffect } from 'react';
import { WorkBook, utils, writeFile } from 'xlsx';
import { SheetData } from './ExcelViewer';
import TableToolbar from './TableToolbar';
import { applyExcelStyles, applyWorkbookStyles } from '../utils/excelStyles';
import { PlusCircle } from 'lucide-react';

interface DataTableProps {
  data: SheetData;
  workbook: WorkBook;
  currentSheet: string;
  fileName: string;
  onRefresh: () => void;
}

export default function DataTable({ 
  data, 
  workbook, 
  currentSheet, 
  fileName,
  onRefresh 
}: DataTableProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<SheetData>(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleCellEdit = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...editedData.rows];
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = value;
    setEditedData({ ...editedData, rows: newRows });
  };

  const handleAddRow = () => {
    const newRow = Array(editedData.headers.length).fill('');
    setEditedData({
      ...editedData,
      rows: [...editedData.rows, newRow]
    });
  };

  const handleSave = () => {
    const ws = utils.aoa_to_sheet([editedData.headers, ...editedData.rows]);
    workbook.Sheets[currentSheet] = ws;
    applyWorkbookStyles(workbook);
    writeFile(workbook, fileName);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedData(data);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-200">
      <TableToolbar
        editMode={editMode}
        onEdit={() => setEditMode(true)}
        onSave={handleSave}
        onCancel={handleCancel}
        onRefresh={onRefresh}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {editedData.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {editedData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                  >
                    {editMode ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          handleCellEdit(rowIndex, cellIndex, e.target.value)
                        }
                        className="w-full px-2 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {editMode && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleAddRow}
              className="flex items-center px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 rounded-md transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Row
            </button>
          </div>
        )}
      </div>
    </div>
  );
}