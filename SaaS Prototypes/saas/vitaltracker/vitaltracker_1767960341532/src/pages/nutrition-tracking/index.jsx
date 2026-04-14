import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import CalorieProgressRing from './components/CalorieProgressRing';
import MealSection from './components/MealSection';
import WaterIntakeTracker from './components/WaterIntakeTracker';
import NutritionChart from './components/NutritionChart';
import QuickStats from './components/QuickStats';

const NutritionTracking = () => {
  const [nutritionData, setNutritionData] = useState({
    dailyCalorieGoal: 2000,
    caloriesConsumed: 1650,
    caloriesBurned: 450,
    waterIntake: 1750,
    waterGoal: 2500,
    meals: {
      breakfast: [
        { name: "Oatmeal with Berries", calories: 320, quantity: 1, unit: "bowl" },
        { name: "Greek Yogurt", calories: 150, quantity: 1, unit: "cup" }
      ],
      lunch: [
        { name: "Grilled Chicken Salad", calories: 450, quantity: 1, unit: "serving" },
        { name: "Whole Grain Roll", calories: 120, quantity: 1, unit: "piece" }
      ],
      dinner: [
        { name: "Salmon with Quinoa", calories: 380, quantity: 1, unit: "serving" },
        { name: "Steamed Broccoli", calories: 55, quantity: 1, unit: "cup" }
      ],
      snacks: [
        { name: "Mixed Nuts", calories: 175, quantity: 28, unit: "g" }
      ]
    }
  });

  const [quickStats] = useState({
    mealsLogged: 12,
    avgCalories: 1850,
    streakDays: 7,
    goalAchievement: 85
  });

  useEffect(() => {
    document.title = 'Nutrition Tracking - VitalTracker';
  }, []);

  const calculateMealCalories = (foods) => {
    return foods?.reduce((total, food) => total + food?.calories, 0);
  };

  const handleAddFood = (mealType, foodData) => {
    setNutritionData(prev => ({
      ...prev,
      meals: {
        ...prev?.meals,
        [mealType?.toLowerCase()]: [...prev?.meals?.[mealType?.toLowerCase()], foodData]
      },
      caloriesConsumed: prev?.caloriesConsumed + foodData?.calories
    }));
  };

  const handleAddWater = (amount) => {
    setNutritionData(prev => ({
      ...prev,
      waterIntake: Math.min(prev?.waterIntake + amount, prev?.waterGoal + 1000)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nutrition Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your daily nutrition and stay on track with your health goals
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={quickStats} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Calorie Progress & Water */}
          <div className="space-y-6">
            <CalorieProgressRing
              consumed={nutritionData?.caloriesConsumed}
              burned={nutritionData?.caloriesBurned}
              goal={nutritionData?.dailyCalorieGoal}
            />
            
            <WaterIntakeTracker
              currentIntake={nutritionData?.waterIntake}
              dailyGoal={nutritionData?.waterGoal}
              onAddWater={handleAddWater}
            />
          </div>

          {/* Middle Column - Meals */}
          <div className="space-y-6">
            <MealSection
              mealType="Breakfast"
              foods={nutritionData?.meals?.breakfast}
              totalCalories={calculateMealCalories(nutritionData?.meals?.breakfast)}
              onAddFood={handleAddFood}
            />
            
            <MealSection
              mealType="Lunch"
              foods={nutritionData?.meals?.lunch}
              totalCalories={calculateMealCalories(nutritionData?.meals?.lunch)}
              onAddFood={handleAddFood}
            />
          </div>

          {/* Right Column - More Meals */}
          <div className="space-y-6">
            <MealSection
              mealType="Dinner"
              foods={nutritionData?.meals?.dinner}
              totalCalories={calculateMealCalories(nutritionData?.meals?.dinner)}
              onAddFood={handleAddFood}
            />
            
            <MealSection
              mealType="Snacks"
              foods={nutritionData?.meals?.snacks}
              totalCalories={calculateMealCalories(nutritionData?.meals?.snacks)}
              onAddFood={handleAddFood}
            />
          </div>
        </div>

        {/* Nutrition Analytics */}
        <div className="mt-8">
          <NutritionChart />
        </div>

        {/* Daily Summary */}
        <div className="bg-card rounded-xl p-6 elevation-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">Today's Summary</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl font-bold text-primary">{nutritionData?.caloriesConsumed}</p>
              <p className="text-sm text-muted-foreground">Calories Consumed</p>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <p className="text-2xl font-bold text-success">{nutritionData?.caloriesBurned}</p>
              <p className="text-sm text-muted-foreground">Calories Burned</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <p className="text-2xl font-bold text-accent">{nutritionData?.waterIntake}ml</p>
              <p className="text-sm text-muted-foreground">Water Intake</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <p className="text-2xl font-bold text-secondary">
                {Object.values(nutritionData?.meals)?.flat()?.length}
              </p>
              <p className="text-sm text-muted-foreground">Foods Logged</p>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default NutritionTracking;