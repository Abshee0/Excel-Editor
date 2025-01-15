import React from 'react';
import { Edit2, Save, X, RefreshCw } from 'lucide-react';

interface TableToolbarProps {
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRefresh: () => void;
}

export default function TableToolbar({ 
  editMode, 
  onEdit, 
  onSave, 
  onCancel, 
  onRefresh 
}: TableToolbarProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex space-x-2">
        {!editMode ? (
          <>
            <button
              onClick={onEdit}
              className="flex items-center px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Sheet
            </button>
            <button
              onClick={onRefresh}
              className="flex items-center px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onSave}
              className="flex items-center px-3 py-1.5 text-sm bg-emerald-600 text-white hover:bg-emerald-700 rounded"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}