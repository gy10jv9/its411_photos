import { useState } from 'react';
import { User } from '@/Interface/interface';
let formData: User = {
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    password: ''
};

export const useRegistrationFormData = () => {
    const [_, setLocalState] = useState(formData);

    const setFormData = (data: User) => {
        formData = { ...formData, ...data };
        setLocalState(formData);
    };

    return { formData, setFormData };
};