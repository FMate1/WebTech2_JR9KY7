export interface LocationDTO {
    id: number;
    institutionName: string;
    adress: string;
    isActive: boolean;
}

export interface BloodDonationFormDTO {
    id: number;
    dateOfBloodDonation: string;
    isSuitable: string;
    examiningDoctorName: string;
    whyNotSuitable: string;
    isDirectedBloodDonation: string;
    patientFullName: string;
    patientTAJnumber: number;
    bloodDonor: null | BloodDonorDTO;
    location: null | LocationDTO;
}

export interface BloodDonorDTO {
    id: number;
    name: string;
    gender: string;
    nationality: string;
    placeOfBirth: string;
    dateOfBirth: string;
    homeAdress: string;
    TAJnumber: number;
}

export interface UserDTO {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
}
