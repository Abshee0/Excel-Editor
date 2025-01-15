import React from 'react';
import { Table as TableIcon } from 'lucide-react';

export default function UploadPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200">
      <TableIcon className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-500 text-lg">
        Upload an Excel file to view its contents
      </p>
    </div>
  );
}