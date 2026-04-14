import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkflowCanvas = ({ 
  workflow, 
  onNodeSelect, 
  selectedNode, 
  onNodeMove, 
  onNodeConnect,
  onCanvasClick,
  zoom,
  onZoomChange 
}) => {
  const canvasRef = useRef(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e, node) => {
    if (e?.button !== 0) return;
    
    const rect = canvasRef?.current?.getBoundingClientRect();
    const x = (e?.clientX - rect?.left) / zoom - canvasOffset?.x;
    const y = (e?.clientY - rect?.top) / zoom - canvasOffset?.y;
    
    setDraggedNode(node);
    setDragOffset({
      x: x - node?.position?.x,
      y: y - node?.position?.y
    });
    
    onNodeSelect(node);
    e?.preventDefault();
  }, [zoom, canvasOffset, onNodeSelect]);

  const handleMouseMove = useCallback((e) => {
    if (draggedNode) {
      const rect = canvasRef?.current?.getBoundingClientRect();
      const x = (e?.clientX - rect?.left) / zoom - canvasOffset?.x - dragOffset?.x;
      const y = (e?.clientY - rect?.top) / zoom - canvasOffset?.y - dragOffset?.y;
      
      onNodeMove(draggedNode?.id, { x, y });
    } else if (isPanning) {
      const deltaX = e?.clientX - panStart?.x;
      const deltaY = e?.clientY - panStart?.y;
      
      setCanvasOffset(prev => ({
        x: prev?.x + deltaX / zoom,
        y: prev?.y + deltaY / zoom
      }));
      
      setPanStart({ x: e?.clientX, y: e?.clientY });
    }
  }, [draggedNode, dragOffset, onNodeMove, isPanning, panStart, zoom]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
    setIsPanning(false);
  }, []);

  const handleCanvasMouseDown = useCallback((e) => {
    if (e?.target === canvasRef?.current) {
      setIsPanning(true);
      setPanStart({ x: e?.clientX, y: e?.clientY });
      onCanvasClick();
    }
  }, [onCanvasClick]);

  const getNodeIcon = (type) => {
    switch (type) {
      case 'start': return 'Play';
      case 'approval': return 'CheckCircle';
      case 'decision': return 'GitBranch';
      case 'notification': return 'Bell';
      case 'end': return 'Square';
      case 'parallel': return 'Split';
      case 'merge': return 'Merge';
      default: return 'Circle';
    }
  };

  const getNodeColor = (type, status) => {
    if (status === 'active') return 'bg-accent text-accent-foreground';
    if (status === 'completed') return 'bg-success text-success-foreground';
    if (status === 'pending') return 'bg-warning text-warning-foreground';
    if (status === 'rejected') return 'bg-error text-error-foreground';
    
    switch (type) {
      case 'start': return 'bg-success text-success-foreground';
      case 'approval': return 'bg-primary text-primary-foreground';
      case 'decision': return 'bg-warning text-warning-foreground';
      case 'notification': return 'bg-accent text-accent-foreground';
      case 'end': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderConnection = (connection) => {
    const fromNode = workflow?.nodes?.find(n => n?.id === connection?.from);
    const toNode = workflow?.nodes?.find(n => n?.id === connection?.to);
    
    if (!fromNode || !toNode) return null;
    
    const x1 = fromNode?.position?.x + 60;
    const y1 = fromNode?.position?.y + 30;
    const x2 = toNode?.position?.x;
    const y2 = toNode?.position?.y + 30;
    
    const midX = (x1 + x2) / 2;
    
    return (
      <g key={`${connection?.from}-${connection?.to}`}>
        <path
          d={`M ${x1} ${y1} Q ${midX} ${y1} ${midX} ${(y1 + y2) / 2} Q ${midX} ${y2} ${x2} ${y2}`}
          stroke="var(--color-border)"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        {connection?.label && (
          <text
            x={midX}
            y={(y1 + y2) / 2 - 10}
            textAnchor="middle"
            className="text-xs fill-muted-foreground"
          >
            {connection?.label}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="relative w-full h-full bg-background border border-border rounded-lg overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <div className="bg-surface border border-border rounded-lg p-2 shadow-soft">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onZoomChange(Math.max(0.25, zoom - 0.25))}
              className="h-8 w-8"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="text-sm font-medium min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onZoomChange(Math.min(2, zoom + 0.25))}
              className="h-8 w-8"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onZoomChange(1);
            setCanvasOffset({ x: 0, y: 0 });
          }}
        >
          <Icon name="Home" size={16} className="mr-2" />
          Reset View
        </Button>
      </div>
      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${zoom}) translate(${canvasOffset?.x}px, ${canvasOffset?.y}px)`,
          transformOrigin: '0 0'
        }}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ minWidth: '2000px', minHeight: '1500px' }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="var(--color-border)"
              />
            </marker>
          </defs>
          
          {/* Grid Pattern */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Connections */}
          {workflow?.connections?.map(connection => renderConnection(connection))}
        </svg>

        {/* Workflow Nodes */}
        <div className="relative" style={{ minWidth: '2000px', minHeight: '1500px' }}>
          {workflow?.nodes?.map((node) => (
            <div
              key={node?.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                selectedNode?.id === node?.id ? 'ring-2 ring-accent ring-offset-2' : ''
              }`}
              style={{
                left: node?.position?.x,
                top: node?.position?.y,
                width: '120px',
                height: '60px'
              }}
              onMouseDown={(e) => handleMouseDown(e, node)}
            >
              <div className={`w-full h-full rounded-lg border-2 border-border shadow-soft flex items-center justify-center ${getNodeColor(node?.type, node?.status)}`}>
                <div className="flex flex-col items-center space-y-1">
                  <Icon name={getNodeIcon(node?.type)} size={20} />
                  <span className="text-xs font-medium text-center leading-tight">
                    {node?.label}
                  </span>
                </div>
              </div>
              
              {/* Node Status Indicator */}
              {node?.status && (
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-surface border border-border flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${
                    node?.status === 'active' ? 'bg-accent' :
                    node?.status === 'completed' ? 'bg-success' :
                    node?.status === 'pending'? 'bg-warning' : 'bg-error'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Canvas Info */}
      <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-lg p-3 shadow-soft">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Drag nodes to reposition</div>
          <div>Click empty space to pan</div>
          <div>Use zoom controls to scale</div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;