import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaterialityMatrix = ({ 
  topics = [], 
  onTopicSelect, 
  selectedTopic = null,
  onTopicMove,
  isReadOnly = false,
  showGrid = true,
  className = ""
}) => {
  const [draggedTopic, setDraggedTopic] = useState(null);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [matrixSize, setMatrixSize] = useState({ width: 600, height: 400 });
  const matrixRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (matrixRef?.current) {
        const rect = matrixRef?.current?.getBoundingClientRect();
        setMatrixSize({ width: rect?.width, height: rect?.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getTopicPosition = (topic) => {
    // Convert impact (0-10) and importance (0-10) to pixel coordinates
    const x = (topic?.importance / 10) * (matrixSize?.width - 40) + 20;
    const y = matrixSize?.height - ((topic?.impact / 10) * (matrixSize?.height - 40) + 20);
    return { x, y };
  };

  const getTopicFromPosition = (x, y) => {
    // Convert pixel coordinates back to impact/importance values
    const importance = Math.max(0, Math.min(10, ((x - 20) / (matrixSize?.width - 40)) * 10));
    const impact = Math.max(0, Math.min(10, ((matrixSize?.height - y - 20) / (matrixSize?.height - 40)) * 10));
    return { importance: Math.round(importance * 10) / 10, impact: Math.round(impact * 10) / 10 };
  };

  const handleTopicClick = (topic, event) => {
    event.stopPropagation();
    onTopicSelect(topic);
  };

  const handleDragStart = (topic, event) => {
    if (isReadOnly) return;
    setDraggedTopic(topic);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event) => {
    if (isReadOnly) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event) => {
    if (isReadOnly || !draggedTopic) return;
    event.preventDefault();
    
    const rect = matrixRef?.current?.getBoundingClientRect();
    const x = event.clientX - rect?.left;
    const y = event.clientY - rect?.top;
    
    const newPosition = getTopicFromPosition(x, y);
    onTopicMove(draggedTopic?.id, newPosition);
    setDraggedTopic(null);
  };

  const handleKeyDown = (event) => {
    if (!selectedTopic || isReadOnly) return;
    
    const step = 0.1;
    let newImpact = selectedTopic?.impact;
    let newImportance = selectedTopic?.importance;
    
    switch (event.key) {
      case 'ArrowUp':
        newImpact = Math.min(10, selectedTopic?.impact + step);
        break;
      case 'ArrowDown':
        newImpact = Math.max(0, selectedTopic?.impact - step);
        break;
      case 'ArrowRight':
        newImportance = Math.min(10, selectedTopic?.importance + step);
        break;
      case 'ArrowLeft':
        newImportance = Math.max(0, selectedTopic?.importance - step);
        break;
      default:
        return;
    }
    
    event.preventDefault();
    onTopicMove(selectedTopic?.id, { impact: newImpact, importance: newImportance });
  };

  const getQuadrantLabel = (quadrant) => {
    const labels = {
      1: 'High Impact\nHigh Importance',
      2: 'High Impact\nLow Importance', 
      3: 'Low Impact\nLow Importance',
      4: 'Low Impact\nHigh Importance'
    };
    return labels?.[quadrant] || '';
  };

  const getQuadrantColor = (quadrant) => {
    const colors = {
      1: 'bg-error/10 text-error',
      2: 'bg-warning/10 text-warning',
      3: 'bg-muted/50 text-muted-foreground',
      4: 'bg-primary/10 text-primary'
    };
    return colors?.[quadrant] || 'bg-muted/50 text-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Grid3X3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Materiality Matrix</h3>
            <p className="text-sm text-muted-foreground">
              {topics?.length} ESG topics plotted
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isReadOnly && (
            <Button variant="ghost" size="sm">
              <Icon name="RotateCcw" size={16} />
              Reset
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
            Export
          </Button>
        </div>
      </div>
      {/* Matrix Container */}
      <div className="p-6">
        <div 
          ref={matrixRef}
          className="relative w-full h-96 bg-background border-2 border-border rounded-lg overflow-hidden"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Grid Lines */}
          {showGrid && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Vertical grid lines */}
              {[2, 4, 6, 8]?.map(i => (
                <line
                  key={`v-${i}`}
                  x1={`${i * 10}%`}
                  y1="0%"
                  x2={`${i * 10}%`}
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border opacity-30"
                />
              ))}
              {/* Horizontal grid lines */}
              {[2, 4, 6, 8]?.map(i => (
                <line
                  key={`h-${i}`}
                  x1="0%"
                  y1={`${i * 10}%`}
                  x2="100%"
                  y2={`${i * 10}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border opacity-30"
                />
              ))}
              {/* Center lines */}
              <line
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border opacity-50"
              />
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border opacity-50"
              />
            </svg>
          )}

          {/* Quadrant Labels */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-error/10 text-error text-xs font-medium rounded">
            High Priority
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded">
            Monitor
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-muted/50 text-muted-foreground text-xs font-medium rounded">
            Low Priority
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
            Manage
          </div>

          {/* Topics */}
          {topics?.map((topic) => {
            const position = getTopicPosition(topic);
            const isSelected = selectedTopic?.id === topic?.id;
            const isHovered = hoveredTopic?.id === topic?.id;
            const isDragging = draggedTopic?.id === topic?.id;
            
            return (
              <div
                key={topic?.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                  isDragging ? 'opacity-50 scale-110' : ''
                } ${
                  isSelected ? 'z-20' : isHovered ? 'z-10' : 'z-0'
                }`}
                style={{
                  left: `${position?.x}px`,
                  top: `${position?.y}px`
                }}
                draggable={!isReadOnly}
                onDragStart={(e) => handleDragStart(topic, e)}
                onClick={(e) => handleTopicClick(topic, e)}
                onMouseEnter={() => setHoveredTopic(topic)}
                onMouseLeave={() => setHoveredTopic(null)}
              >
                {/* Topic Dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary bg-primary scale-150 shadow-lg' 
                      : isHovered
                      ? 'border-primary bg-primary/20 scale-125' :'border-foreground bg-card hover:bg-primary/10'
                  }`}
                  style={{ 
                    backgroundColor: isSelected || isHovered ? undefined : topic?.category?.color,
                    borderColor: isSelected || isHovered ? undefined : topic?.category?.color
                  }}
                />
                {/* Topic Label */}
                {(isSelected || isHovered) && (
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-2 py-1 shadow-modal min-w-max max-w-48">
                    <div className="text-xs font-medium text-popover-foreground">
                      {topic?.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Impact: {topic?.impact?.toFixed(1)} | Importance: {topic?.importance?.toFixed(1)}
                    </div>
                    {topic?.category && (
                      <div className="text-xs text-muted-foreground">
                        {topic?.category?.name}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Axis Labels */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-sm font-medium text-foreground">
            Business Importance →
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 -rotate-90 text-sm font-medium text-foreground">
            Stakeholder Impact →
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Use {isReadOnly ? 'click' : 'drag & drop or arrow keys'} to {isReadOnly ? 'select' : 'position'} topics
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Scale: 0-10</span>
            <div className="w-px h-4 bg-border" />
            <span>{topics?.length} topics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialityMatrix;