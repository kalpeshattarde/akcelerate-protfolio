'use client';

import React from 'react';
import VirtualTourSection from './VirtualTourSection';
import EquipmentAvailability from './EquipmentAvailability';
import ClassSchedule from './ClassSchedule';
import AmenitiesShowcase from './AmenitiesShowcase';
import FloorPlanNavigation from './FloorPlanNavigation';

interface TourHotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  icon: string;
}

interface TourArea {
  id: string;
  name: string;
  image: string;
  alt: string;
  hotspots: TourHotspot[];
  description: string;
}

interface Equipment {
  id: string;
  name: string;
  category: string;
  available: number;
  total: number;
  status: 'available' | 'busy' | 'maintenance';
  nextAvailable?: string;
  icon: string;
}

interface ClassSession {
  id: string;
  name: string;
  instructor: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  type: string;
  room: string;
  description: string;
}

interface DaySchedule {
  date: string;
  dayName: string;
  classes: ClassSession[];
}

interface Amenity {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  icon: string;
  category: string;
}

interface FloorArea {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
  capacity?: number;
  currentOccupancy?: number;
}

const FacilityInteractive = () => {
  // Mock data for virtual tour
  const tourAreas: TourArea[] = [
  {
    id: 'main-gym',
    name: 'Main Training Floor',
    image: "https://images.unsplash.com/photo-1656879135742-47e69a8d368c",
    alt: 'Spacious modern gym with rows of premium cardio and strength training equipment under bright LED lighting',
    description: 'Our flagship training area with premium equipment',
    hotspots: [
    {
      id: 'cardio-zone',
      x: 25,
      y: 30,
      title: 'Cardio Zone',
      description: 'State-of-the-art treadmills, ellipticals, and bikes with entertainment systems',
      icon: 'HeartIcon'
    },
    {
      id: 'free-weights',
      x: 70,
      y: 45,
      title: 'Free Weight Area',
      description: 'Complete selection of dumbbells, barbells, and Olympic plates',
      icon: 'CubeIcon'
    }]

  },
  {
    id: 'strength-zone',
    name: 'Strength Training Zone',
    image: "https://images.unsplash.com/photo-1685263102097-7c34904b7543",
    alt: 'Professional strength training area with Olympic barbells, power racks, and heavy-duty weight plates',
    description: 'Dedicated area for serious strength training',
    hotspots: [
    {
      id: 'power-racks',
      x: 40,
      y: 35,
      title: 'Power Racks',
      description: 'Professional-grade power racks with safety bars and pull-up stations',
      icon: 'Squares2X2Icon'
    }]

  },
  {
    id: 'group-fitness',
    name: 'Group Fitness Studio',
    image: "https://images.unsplash.com/photo-1717500250423-098ada6fb7c0",
    alt: 'Bright group fitness studio with mirrored walls, wooden floors, and yoga mats arranged for class',
    description: 'Versatile studio for classes and group training',
    hotspots: [
    {
      id: 'sound-system',
      x: 80,
      y: 20,
      title: 'Premium Sound System',
      description: 'High-quality audio system for immersive class experiences',
      icon: 'SpeakerWaveIcon'
    }]

  }];


  // Mock data for equipment availability
  const equipment: Equipment[] = [
  {
    id: 'treadmills',
    name: 'Treadmills',
    category: 'Cardio',
    available: 8,
    total: 12,
    status: 'available',
    icon: 'ForwardIcon'
  },
  {
    id: 'ellipticals',
    name: 'Elliptical Machines',
    category: 'Cardio',
    available: 5,
    total: 8,
    status: 'available',
    icon: 'ArrowPathIcon'
  },
  {
    id: 'power-racks',
    name: 'Power Racks',
    category: 'Strength',
    available: 2,
    total: 6,
    status: 'busy',
    nextAvailable: '2:30 PM',
    icon: 'Squares2X2Icon'
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'Strength',
    available: 1,
    total: 4,
    status: 'busy',
    nextAvailable: '3:15 PM',
    icon: 'MinusIcon'
  },
  {
    id: 'cable-machines',
    name: 'Cable Machines',
    category: 'Functional',
    available: 6,
    total: 8,
    status: 'available',
    icon: 'LinkIcon'
  },
  {
    id: 'rowing-machines',
    name: 'Rowing Machines',
    category: 'Cardio',
    available: 0,
    total: 6,
    status: 'maintenance',
    nextAvailable: 'Tomorrow 6:00 AM',
    icon: 'ArrowsRightLeftIcon'
  }];


  // Mock data for class schedule
  const schedule: DaySchedule[] = [
  {
    date: 'Nov 19, 2024',
    dayName: 'Today',
    classes: [
    {
      id: 'morning-hiit',
      name: 'Elite HIIT Blast',
      instructor: 'Sarah Chen',
      time: '6:00 AM',
      duration: 45,
      capacity: 20,
      enrolled: 18,
      level: 'Advanced',
      type: 'High Intensity',
      room: 'Studio A',
      description: 'High-intensity interval training designed to maximize calorie burn and improve cardiovascular fitness through explosive movements and short recovery periods.'
    },
    {
      id: 'strength-basics',
      name: 'Strength Foundations',
      instructor: 'Mike Rodriguez',
      time: '9:00 AM',
      duration: 60,
      capacity: 15,
      enrolled: 12,
      level: 'Beginner',
      type: 'Strength Training',
      room: 'Main Floor',
      description: 'Learn proper form and technique for fundamental strength exercises including squats, deadlifts, and presses in a supportive environment.'
    },
    {
      id: 'yoga-flow',
      name: 'Power Yoga Flow',
      instructor: 'Emma Thompson',
      time: '12:00 PM',
      duration: 75,
      capacity: 25,
      enrolled: 22,
      level: 'Intermediate',
      type: 'Yoga',
      room: 'Studio B',
      description: 'Dynamic yoga practice combining strength, flexibility, and mindfulness through flowing sequences that challenge both body and mind.'
    },
    {
      id: 'elite-conditioning',
      name: 'Elite Conditioning',
      instructor: 'David Park',
      time: '6:30 PM',
      duration: 50,
      capacity: 12,
      enrolled: 12,
      level: 'Elite',
      type: 'Conditioning',
      room: 'Performance Lab',
      description: 'Advanced conditioning program for elite athletes focusing on sport-specific movements, agility, and peak performance optimization.'
    }]

  },
  {
    date: 'Nov 20, 2024',
    dayName: 'Tomorrow',
    classes: [
    {
      id: 'morning-spin',
      name: 'Spin & Burn',
      instructor: 'Lisa Wang',
      time: '6:30 AM',
      duration: 45,
      capacity: 30,
      enrolled: 25,
      level: 'Intermediate',
      type: 'Cycling',
      room: 'Cycle Studio',
      description: 'High-energy cycling class with motivating music and challenging intervals to build endurance and burn calories.'
    },
    {
      id: 'functional-training',
      name: 'Functional Movement',
      instructor: 'Alex Johnson',
      time: '10:00 AM',
      duration: 55,
      capacity: 18,
      enrolled: 14,
      level: 'Intermediate',
      type: 'Functional',
      room: 'Studio A',
      description: 'Improve everyday movement patterns through exercises that enhance stability, mobility, and functional strength for daily activities.'
    }]

  }];


  // Mock data for amenities
  const amenities: Amenity[] = [
  {
    id: 'locker-rooms',
    name: 'Premium Locker Rooms',
    description: 'Spacious, climate-controlled locker rooms with premium amenities and 24/7 access for ultimate convenience.',
    image: "https://images.unsplash.com/photo-1701250421566-a6ef7ce9bc40",
    alt: 'Luxurious locker room with wooden lockers, marble countertops, and modern lighting fixtures',
    features: [
    'Individual climate control',
    'Premium toiletries provided',
    'Secure digital locks',
    'Towel service included',
    'Private changing areas'],

    icon: 'LockClosedIcon',
    category: 'Changing & Storage'
  },
  {
    id: 'recovery-spa',
    name: 'Recovery Spa',
    description: 'State-of-the-art recovery center featuring saunas, steam rooms, and therapeutic treatments for optimal muscle recovery.',
    image: "https://images.unsplash.com/photo-1734594683564-cadeeaefd6cd",
    alt: 'Modern spa interior with wooden sauna, ambient lighting, and comfortable seating area',
    features: [
    'Infrared sauna therapy',
    'Steam room with aromatherapy',
    'Cold plunge pools',
    'Massage therapy rooms',
    'Recovery compression boots'],

    icon: 'SparklesIcon',
    category: 'Recovery & Wellness'
  },
  {
    id: 'nutrition-bar',
    name: 'Elite Nutrition Bar',
    description: 'Fresh, healthy meals and supplements designed by nutritionists to fuel your performance and recovery goals.',
    image: "https://images.unsplash.com/photo-1597636407663-f296c45a3c7e",
    alt: 'Modern juice bar with fresh smoothies, protein shakes, and healthy snacks displayed on clean counters',
    features: [
    'Custom protein smoothies',
    'Pre & post-workout meals',
    'Supplement consultation',
    'Hydration station',
    'Meal prep services'],

    icon: 'CupIcon',
    category: 'Nutrition & Fuel'
  },
  {
    id: 'childcare',
    name: 'Kids Zone',
    description: 'Safe, supervised childcare facility allowing parents to focus on their workouts while kids enjoy structured activities.',
    image: "https://images.unsplash.com/photo-1722247483436-f6e70875a062",
    alt: 'Bright children play area with colorful toys, soft play equipment, and safety mats',
    features: [
    'Certified childcare staff',
    'Age-appropriate activities',
    'Secure check-in system',
    'Educational programs',
    'Healthy snacks provided'],

    icon: 'HeartIcon',
    category: 'Family Services'
  },
  {
    id: 'parking',
    name: 'Valet Parking',
    description: 'Complimentary valet parking service ensuring convenience and security for all premium members.',
    image: "https://images.unsplash.com/photo-1660514134312-ea9f9ccc1f72",
    alt: 'Professional valet attendant in uniform standing next to luxury cars in covered parking garage',
    features: [
    'Complimentary for members',
    'Covered parking available',
    'Car detailing services',
    'Electric vehicle charging',
    'Security monitoring'],

    icon: 'TruckIcon',
    category: 'Convenience Services'
  },
  {
    id: 'business-center',
    name: 'Business Lounge',
    description: 'Professional workspace with high-speed internet and meeting facilities for busy professionals who need to stay connected.',
    image: "https://images.unsplash.com/photo-1672382583899-20dcd1e50c6f",
    alt: 'Modern business lounge with comfortable seating, laptops, and professional lighting for remote work',
    features: [
    'High-speed WiFi',
    'Private meeting rooms',
    'Printing services',
    'Coffee & refreshments',
    'Quiet work zones'],

    icon: 'BriefcaseIcon',
    category: 'Business Services'
  }];


  // Mock data for floor plan
  const floorAreas: FloorArea[] = [
  {
    id: 'cardio-zone',
    name: 'Cardio Zone',
    description: 'Treadmills, ellipticals, and bikes',
    x: 50,
    y: 50,
    width: 150,
    height: 100,
    color: '#00ff88',
    icon: 'HeartIcon',
    capacity: 40,
    currentOccupancy: 28
  },
  {
    id: 'strength-area',
    name: 'Strength Training',
    description: 'Free weights and machines',
    x: 250,
    y: 50,
    width: 200,
    height: 150,
    color: '#0099ff',
    icon: 'CubeIcon',
    capacity: 60,
    currentOccupancy: 45
  },
  {
    id: 'functional-zone',
    name: 'Functional Training',
    description: 'Cables, TRX, and functional equipment',
    x: 500,
    y: 50,
    width: 120,
    height: 120,
    color: '#ff9500',
    icon: 'LinkIcon',
    capacity: 25,
    currentOccupancy: 12
  },
  {
    id: 'group-studio',
    name: 'Group Fitness Studio',
    description: 'Classes and group training',
    x: 50,
    y: 200,
    width: 180,
    height: 120,
    color: '#ff3366',
    icon: 'UserGroupIcon',
    capacity: 35,
    currentOccupancy: 22
  },
  {
    id: 'recovery-spa',
    name: 'Recovery Spa',
    description: 'Sauna, steam, and recovery',
    x: 280,
    y: 250,
    width: 140,
    height: 80,
    color: '#9333ea',
    icon: 'SparklesIcon',
    capacity: 20,
    currentOccupancy: 8
  },
  {
    id: 'locker-rooms',
    name: 'Locker Rooms',
    description: 'Changing and storage facilities',
    x: 480,
    y: 220,
    width: 100,
    height: 140,
    color: '#64748b',
    icon: 'LockClosedIcon'
  },
  {
    id: 'nutrition-bar',
    name: 'Nutrition Bar',
    description: 'Smoothies and healthy meals',
    x: 650,
    y: 80,
    width: 100,
    height: 60,
    color: '#10b981',
    icon: 'CupIcon'
  }];


  return (
    <div className="min-h-screen bg-background">
      <VirtualTourSection tourAreas={tourAreas} />
      <EquipmentAvailability equipment={equipment} />
      <ClassSchedule schedule={schedule} />
      <FloorPlanNavigation floorAreas={floorAreas} />
      <AmenitiesShowcase amenities={amenities} />
    </div>);

};

export default FacilityInteractive;