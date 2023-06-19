import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BloodDonorDTO } from "../../../models"
import { BloodDonationForm } from "./BloodDonationForm";

@Entity()
export class BloodDonor implements BloodDonorDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    nationality: string;

    @Column()
    placeOfBirth: string;
    
    @Column({ type: 'date' })
    dateOfBirth: string;

    @Column()
    homeAdress: string;

    @Column()
    TAJnumber: number;

    @OneToMany(() => BloodDonationForm, (bloodDonationForms) => bloodDonationForms.bloodDonor)
    bloodDonationForms: BloodDonationForm[];

}
