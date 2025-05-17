import { v4 as uuidv4 } from 'uuid';
import { Cat, CatFilter, CatFormData } from '../types/cat';

// Initial sample data
const initialCats: Cat[] = [
  {
    id: uuidv4(),
    name: 'Whiskers',
    age: 3,
    breed: 'Siamese',
    color: 'Cream',
    weight: 4.2,
    healthStatus: 'Excellent',
    neutered: true,
    vaccinated: true,
    adoptionStatus: 'available',
    description: 'Playful and friendly Siamese cat with beautiful blue eyes.',
    imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    intakeDate: '2023-01-15',
    lastCheckup: '2023-10-10',
  },
  {
    id: uuidv4(),
    name: 'Shadow',
    age: 5,
    breed: 'Maine Coon',
    color: 'Black',
    weight: 7.8,
    healthStatus: 'Good',
    neutered: true,
    vaccinated: true,
    adoptionStatus: 'adopted',
    description: 'Majestic Maine Coon with a gentle personality.',
    imageUrl: 'https://images.pexels.com/photos/982300/pexels-photo-982300.jpeg',
    intakeDate: '2022-05-20',
    lastCheckup: '2023-09-05',
  },
  {
    id: uuidv4(),
    name: 'Luna',
    age: 1,
    breed: 'Domestic Shorthair',
    color: 'Calico',
    weight: 3.1,
    healthStatus: 'Good',
    neutered: false,
    vaccinated: true,
    adoptionStatus: 'pending',
    description: 'Energetic kitten that loves to play with toys.',
    imageUrl: 'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg',
    intakeDate: '2023-08-10',
    lastCheckup: '2023-10-15',
  },
];

// Using localStorage to persist data
const STORAGE_KEY = 'ferrellCatManagerData';

// Helper functions to get/set data from localStorage
const loadCatsFromStorage = (): Cat[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error('Error loading cats from storage:', e);
      return [...initialCats];
    }
  }
  return [...initialCats];
};

const saveCatsToStorage = (cats: Cat[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cats));
};

// In-memory cats array (initialized from localStorage)
let cats: Cat[] = loadCatsFromStorage();

// Service methods
export const CatService = {
  // GET all cats with optional filtering
  getCats: (filters?: CatFilter): Cat[] => {
    if (!filters) return cats;

    return cats.filter(cat => {
      if (filters.breed && !cat.breed.toLowerCase().includes(filters.breed.toLowerCase())) {
        return false;
      }
      if (filters.adoptionStatus && cat.adoptionStatus !== filters.adoptionStatus) {
        return false;
      }
      if (filters.minAge !== undefined && cat.age < filters.minAge) {
        return false;
      }
      if (filters.maxAge !== undefined && cat.age > filters.maxAge) {
        return false;
      }
      if (filters.healthStatus && !cat.healthStatus.toLowerCase().includes(filters.healthStatus.toLowerCase())) {
        return false;
      }
      return true;
    });
  },

  // GET a single cat by ID
  getCatById: (id: string): Cat | undefined => {
    return cats.find(cat => cat.id === id);
  },

  // CREATE a new cat
  createCat: (catData: CatFormData): Cat => {
    const newCat: Cat = {
      id: uuidv4(),
      ...catData
    };
    
    cats = [...cats, newCat];
    saveCatsToStorage(cats);
    return newCat;
  },

  // UPDATE a cat
  updateCat: (id: string, catData: Partial<CatFormData>): Cat | undefined => {
    const index = cats.findIndex(cat => cat.id === id);
    if (index === -1) return undefined;

    const updatedCat = { ...cats[index], ...catData };
    cats = [...cats.slice(0, index), updatedCat, ...cats.slice(index + 1)];
    saveCatsToStorage(cats);
    return updatedCat;
  },

  // DELETE a cat
  deleteCat: (id: string): boolean => {
    const index = cats.findIndex(cat => cat.id === id);
    if (index === -1) return false;

    cats = [...cats.slice(0, index), ...cats.slice(index + 1)];
    saveCatsToStorage(cats);
    return true;
  },

  // Get available breeds from existing cats
  getBreeds: (): string[] => {
    const breeds = new Set(cats.map(cat => cat.breed));
    return Array.from(breeds).sort();
  },

  // Get adoption statuses for filtering
  getAdoptionStatuses: (): Cat['adoptionStatus'][] => {
    return ['available', 'adopted', 'pending', 'foster'];
  }
};