import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentEditor = ({ 
  content, 
  onChange, 
  isReadOnly = false, 
  activeUsers = [], 
  comments = [], 
  onAddComment,
  trackChanges = true 
}) => {
  const [selectedText, setSelectedText] = useState('');
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });
  const [newComment, setNewComment] = useState('');
  const [isTrackChangesEnabled, setIsTrackChangesEnabled] = useState(trackChanges);
  const editorRef = useRef(null);

  const toolbarActions = [
    { id: 'bold', icon: 'Bold', label: 'Bold', shortcut: 'Ctrl+B' },
    { id: 'italic', icon: 'Italic', label: 'Italic', shortcut: 'Ctrl+I' },
    { id: 'underline', icon: 'Underline', label: 'Underline', shortcut: 'Ctrl+U' },
    { id: 'separator1', type: 'separator' },
    { id: 'align-left', icon: 'AlignLeft', label: 'Align Left' },
    { id: 'align-center', icon: 'AlignCenter', label: 'Align Center' },
    { id: 'align-right', icon: 'AlignRight', label: 'Align Right' },
    { id: 'separator2', type: 'separator' },
    { id: 'list-ordered', icon: 'ListOrdered', label: 'Numbered List' },
    { id: 'list-unordered', icon: 'List', label: 'Bullet List' },
    { id: 'separator3', type: 'separator' },
    { id: 'link', icon: 'Link', label: 'Insert Link' },
    { id: 'table', icon: 'Table', label: 'Insert Table' },
    { id: 'separator4', type: 'separator' },
    { id: 'comment', icon: 'MessageSquare', label: 'Add Comment', shortcut: 'Ctrl+Shift+C' },
    { id: 'track-changes', icon: 'GitBranch', label: 'Track Changes', active: isTrackChangesEnabled }
  ];

  const handleToolbarAction = (actionId) => {
    switch (actionId) {
      case 'bold':
        document.execCommand('bold');
        break;
      case 'italic':
        document.execCommand('italic');
        break;
      case 'underline':
        document.execCommand('underline');
        break;
      case 'align-left':
        document.execCommand('justifyLeft');
        break;
      case 'align-center':
        document.execCommand('justifyCenter');
        break;
      case 'align-right':
        document.execCommand('justifyRight');
        break;
      case 'list-ordered':
        document.execCommand('insertOrderedList');
        break;
      case 'list-unordered':
        document.execCommand('insertUnorderedList');
        break;
      case 'comment':
        handleAddComment();
        break;
      case 'track-changes':
        setIsTrackChangesEnabled(!isTrackChangesEnabled);
        break;
      default:
        console.log('Action not implemented:', actionId);
    }
  };

  const handleAddComment = () => {
    const selection = window.getSelection();
    if (selection?.toString()?.trim()) {
      setSelectedText(selection?.toString());
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      setCommentPosition({ x: rect?.right + 10, y: rect?.top });
      setShowCommentDialog(true);
    }
  };

  const handleSaveComment = () => {
    if (newComment?.trim() && selectedText) {
      const comment = {
        id: Date.now(),
        text: newComment,
        selectedText,
        author: 'John Doe',
        timestamp: new Date(),
        position: commentPosition
      };
      onAddComment(comment);
      setNewComment('');
      setShowCommentDialog(false);
      setSelectedText('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey && e?.shiftKey && e?.key === 'C') {
        e?.preventDefault();
        handleAddComment();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-lg">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-1">
          {toolbarActions?.map((action) => {
            if (action?.type === 'separator') {
              return <div key={action?.id} className="w-px h-6 bg-border mx-1" />;
            }
            
            return (
              <Button
                key={action?.id}
                variant={action?.active ? "default" : "ghost"}
                size="sm"
                onClick={() => handleToolbarAction(action?.id)}
                disabled={isReadOnly}
                title={`${action?.label}${action?.shortcut ? ` (${action?.shortcut})` : ''}`}
                className="h-8 w-8 p-0"
              >
                <Icon name={action?.icon} size={16} />
              </Button>
            );
          })}
        </div>

        {/* Active Users */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Active:</span>
          <div className="flex -space-x-2">
            {activeUsers?.map((user, index) => (
              <div
                key={user?.id}
                className="w-6 h-6 rounded-full border-2 border-surface flex items-center justify-center text-xs font-medium"
                style={{ backgroundColor: user?.color }}
                title={user?.name}
              >
                {user?.initials}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Editor Content */}
      <div className="flex-1 relative">
        <div
          ref={editorRef}
          contentEditable={!isReadOnly}
          className="h-full p-6 focus:outline-none overflow-y-auto"
          style={{ minHeight: '500px' }}
          onInput={(e) => onChange(e?.target?.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
          suppressContentEditableWarning={true}
        />

        {/* Comments Overlay */}
        {comments?.map((comment) => (
          <div
            key={comment?.id}
            className="absolute bg-warning/10 border border-warning rounded p-2 text-xs max-w-64 z-10"
            style={{ left: comment?.position?.x, top: comment?.position?.y }}
          >
            <div className="font-medium text-warning-foreground">{comment?.author}</div>
            <div className="text-text-secondary mt-1">{comment?.text}</div>
            <div className="text-muted-foreground mt-1">
              {comment?.timestamp?.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {/* Comment Dialog */}
        {showCommentDialog && (
          <div
            className="absolute bg-popover border border-border rounded-lg p-4 shadow-elevated z-20 w-80"
            style={{ left: commentPosition?.x, top: commentPosition?.y }}
          >
            <div className="mb-3">
              <div className="text-sm font-medium text-text-primary mb-1">Add Comment</div>
              <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                "{selectedText}"
              </div>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Enter your comment..."
              className="w-full h-20 p-2 text-sm border border-border rounded resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
            <div className="flex justify-end space-x-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCommentDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveComment}
                disabled={!newComment?.trim()}
              >
                Add Comment
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Words: 1,247</span>
          <span>Characters: 6,891</span>
          <span>Pages: 3</span>
        </div>
        <div className="flex items-center space-x-4">
          {isTrackChangesEnabled && (
            <div className="flex items-center space-x-1 text-accent">
              <Icon name="GitBranch" size={12} />
              <span>Track Changes ON</span>
            </div>
          )}
          <span>Auto-saved at {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;