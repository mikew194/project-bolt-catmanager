export interface Cat {
  id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number;
  healthStatus: string;
  neutered: boolean;
  vaccinated: boolean;
  adoptionStatus: 'available' | 'adopted' | 'pending' | 'foster';
  description: string;
  imageUrl: string;
  intakeDate: string;
  lastCheckup: string;
}

export type CatFormData = Omit<Cat, 'id'>;

export type CatFilter = {
  breed?: string;
  adoptionStatus?: Cat['adoptionStatus'];
  minAge?: number;
  maxAge?: number;
  healthStatus?: string;
};