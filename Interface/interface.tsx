export interface User {
  id?: string; // Firestore will assign this automatically
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  email: string;
  password: string;
}
