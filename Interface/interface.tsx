export interface User {
    id?: string; 
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email: string;
    password: string;
  }

  export interface DiaryEntry {
    id: string;
    title: string;
    description: string;
    address: string;
    photo?: string;
    createdAt: string | Date; 
    date: string
}