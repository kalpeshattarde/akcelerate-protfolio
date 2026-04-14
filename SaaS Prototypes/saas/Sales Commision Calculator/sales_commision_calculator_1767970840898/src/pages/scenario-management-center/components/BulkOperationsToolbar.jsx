import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkOperationsToolbar = ({ 
  selectedCount, 
  onSelectAll, 
  onDelete, 
  onArchive, 
  onExport 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleArchive = () => {
    onArchive();
    setShowArchiveConfirm(false);
  };

  return (
    <>
      <div className="glass-morphism-dark rounded-xl p-4 mb-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-neon-indigo" />
              <span className="font-medium text-white">
                {selectedCount} scenario{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <button
              onClick={onSelectAll}
              className="text-sm text-neon-aqua hover:text-white transition-smooth"
            >
              Select All
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-3 py-2 glass-morphism text-white border border-white/20 rounded-lg hover:border-white/30 hover:bg-white/10 transition-smooth"
            >
              <Icon name="Download" size={16} />
              <span>Export</span>
            </button>

            <button
              onClick={() => setShowArchiveConfirm(true)}
              className="flex items-center space-x-2 px-3 py-2 glass-morphism text-white border border-white/20 rounded-lg hover:border-white/30 hover:bg-white/10 transition-smooth"
            >
              <Icon name="Archive" size={16} />
              <span>Archive</span>
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-300 border border-red-400/30 rounded-lg hover:bg-red-500/30 hover:border-red-400/50 transition-smooth"
            >
              <Icon name="Trash2" size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-white font-medium">Quick Actions:</span>
            <button className="text-neon-aqua hover:text-white transition-smooth">
              Duplicate Selected
            </button>
            <button className="text-neon-aqua hover:text-white transition-smooth">
              Bulk Edit Tags
            </button>
            <button className="text-neon-aqua hover:text-white transition-smooth">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 modal-overlay-dark flex items-center justify-center z-200">
          <div className="modal-glass p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-red-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Scenarios</h3>
                <p className="text-sm text-white/70">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-6">
              Are you sure you want to delete {selectedCount} scenario{selectedCount !== 1 ? 's' : ''}? 
              This will permanently remove all associated data and cannot be recovered.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-white/70 hover:text-white transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-400/30 rounded-lg hover:bg-red-500/30 hover:border-red-400/50 transition-smooth"
              >
                Delete {selectedCount} Scenario{selectedCount !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {showArchiveConfirm && (
        <div className="fixed inset-0 modal-overlay-dark flex items-center justify-center z-200">
          <div className="modal-glass p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Icon name="Archive" size={20} className="text-amber-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Archive Scenarios</h3>
                <p className="text-sm text-white/70">Move scenarios to archive</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-6">
              Are you sure you want to archive {selectedCount} scenario{selectedCount !== 1 ? 's' : ''}? 
              Archived scenarios can be restored later but will not appear in active lists.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowArchiveConfirm(false)}
                className="px-4 py-2 text-white/70 hover:text-white transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleArchive}
                className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-lg hover:bg-amber-500/30 hover:border-amber-400/50 transition-smooth"
              >
                Archive {selectedCount} Scenario{selectedCount !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkOperationsToolbar;