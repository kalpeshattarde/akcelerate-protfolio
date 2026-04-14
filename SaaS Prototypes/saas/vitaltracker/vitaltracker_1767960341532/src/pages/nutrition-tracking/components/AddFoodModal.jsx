import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddFoodModal = ({ isOpen, onClose, onAddFood, mealType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('serving');

  // Mock food database
  const foodDatabase = [
    { id: 1, name: "Banana", calories: 105, unit: "medium", protein: 1.3, carbs: 27, fat: 0.4 },
    { id: 2, name: "Apple", calories: 95, unit: "medium", protein: 0.5, carbs: 25, fat: 0.3 },
    { id: 3, name: "Chicken Breast", calories: 165, unit: "100g", protein: 31, carbs: 0, fat: 3.6 },
    { id: 4, name: "Brown Rice", calories: 216, unit: "cup", protein: 5, carbs: 45, fat: 1.8 },
    { id: 5, name: "Greek Yogurt", calories: 100, unit: "cup", protein: 17, carbs: 6, fat: 0.7 },
    { id: 6, name: "Almonds", calories: 164, unit: "28g", protein: 6, carbs: 6, fat: 14 },
    { id: 7, name: "Salmon", calories: 208, unit: "100g", protein: 22, carbs: 0, fat: 12 },
    { id: 8, name: "Avocado", calories: 234, unit: "medium", protein: 3, carbs: 12, fat: 21 }
  ];

  const recentFoods = [
    { id: 1, name: "Oatmeal", calories: 150, unit: "bowl" },
    { id: 2, name: "Green Salad", calories: 85, unit: "bowl" },
    { id: 3, name: "Protein Shake", calories: 120, unit: "serving" }
  ];

  const filteredFoods = foodDatabase?.filter(food =>
    food?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setUnit(food?.unit);
  };

  const handleAddFood = () => {
    if (!selectedFood) return;

    const totalCalories = Math.round((selectedFood?.calories * parseFloat(quantity)));
    
    onAddFood({
      name: selectedFood?.name,
      calories: totalCalories,
      quantity: parseFloat(quantity),
      unit: unit,
      protein: selectedFood?.protein * parseFloat(quantity),
      carbs: selectedFood?.carbs * parseFloat(quantity),
      fat: selectedFood?.fat * parseFloat(quantity)
    });

    // Reset form
    setSearchQuery('');
    setSelectedFood(null);
    setQuantity('1');
    setUnit('serving');
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-card rounded-xl shadow-wellness-lg animate-scale-in elevation-3 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Add Food</h2>
            <p className="text-sm text-muted-foreground capitalize">Adding to {mealType}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search */}
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search for foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="mb-4"
            />
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Camera">
                Scan Barcode
              </Button>
              <Button variant="outline" size="sm" iconName="Clock">
                Recent
              </Button>
            </div>
          </div>

          {/* Recent Foods (when no search) */}
          {!searchQuery && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Recent Foods</h3>
              <div className="grid gap-2">
                {recentFoods?.map((food) => (
                  <button
                    key={food?.id}
                    onClick={() => handleFoodSelect(food)}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="font-medium text-foreground">{food?.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{food?.calories} cal</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Search Results</h3>
              <div className="grid gap-2">
                {filteredFoods?.map((food) => (
                  <button
                    key={food?.id}
                    onClick={() => handleFoodSelect(food)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                      selectedFood?.id === food?.id 
                        ? 'bg-primary/10 border border-primary/20' :'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Apple" size={16} className="text-secondary" />
                      <div>
                        <p className="font-medium text-foreground">{food?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {food?.calories} cal per {food?.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{food?.calories}</p>
                      <p className="text-xs text-muted-foreground">calories</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Food Details */}
          {selectedFood && (
            <div className="bg-primary/5 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-3">{selectedFood?.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e?.target?.value)}
                  min="0.1"
                  step="0.1"
                />
                <Input
                  label="Unit"
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e?.target?.value)}
                />
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Calories</p>
                  <p className="font-semibold text-foreground">
                    {Math.round(selectedFood?.calories * parseFloat(quantity || 1))}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Protein</p>
                  <p className="font-semibold text-foreground">
                    {Math.round(selectedFood?.protein * parseFloat(quantity || 1))}g
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                  <p className="font-semibold text-foreground">
                    {Math.round(selectedFood?.carbs * parseFloat(quantity || 1))}g
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fat</p>
                  <p className="font-semibold text-foreground">
                    {Math.round(selectedFood?.fat * parseFloat(quantity || 1))}g
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              fullWidth
              onClick={handleAddFood}
              disabled={!selectedFood}
            >
              Add Food
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddFoodModal;