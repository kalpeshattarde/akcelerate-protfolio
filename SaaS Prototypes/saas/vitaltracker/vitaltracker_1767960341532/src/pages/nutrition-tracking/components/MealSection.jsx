import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AddFoodModal from './AddFoodModal';

const MealSection = ({ mealType, foods, totalCalories, onAddFood }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMealIcon = () => {
    switch (mealType?.toLowerCase()) {
      case 'breakfast': return 'Coffee';
      case 'lunch': return 'Utensils';
      case 'dinner': return 'ChefHat';
      case 'snacks': return 'Cookie';
      default: return 'Utensils';
    }
  };

  const handleAddFood = (foodData) => {
    onAddFood(mealType, foodData);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-card rounded-xl p-6 elevation-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name={getMealIcon()} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground capitalize">{mealType}</h3>
              <p className="text-sm text-muted-foreground">{totalCalories} calories</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsModalOpen(true)}
          >
            Add Food
          </Button>
        </div>

        {foods?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Utensils" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No foods logged yet</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setIsModalOpen(true)}
            >
              Add your first food
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {foods?.map((food, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Apple" size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{food?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {food?.quantity} {food?.unit} • {food?.calories} cal
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{food?.calories}</p>
                  <p className="text-xs text-muted-foreground">calories</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFood={handleAddFood}
        mealType={mealType}
      />
    </>
  );
};

export default MealSection;