import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

interface SheetTabsProps {
  sheets: string[];
  currentSheet: string;
  onSheetChange: (sheet: string) => void;
}

export default function SheetTabs({ sheets, currentSheet, onSheetChange }: SheetTabsProps) {
  return (
    <div className="flex space-x-1 mb-4 overflow-x-auto">
      {sheets.map((sheet) => (
        <button
          key={sheet}
          onClick={() => onSheetChange(sheet)}
          className={`flex items-center px-4 py-2 rounded-t-lg transition-colors ${
            currentSheet === sheet
              ? 'bg-white text-emerald-600 border-t-2 border-emerald-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          {sheet}
        </button>
      ))}
    </div>
  );
}