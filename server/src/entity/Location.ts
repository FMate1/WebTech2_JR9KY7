import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LocationDTO } from '../../../models';
import { BloodDonationForm } from "./BloodDonationForm";

@Entity()
export class Location implements LocationDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    institutionName: string;

    @Column()
    adress: string;

    @Column()
    isActive: boolean;

    @OneToMany(() => BloodDonationForm, (bloodDonationForm) => bloodDonationForm.location)
    bloodDonationForms: BloodDonationForm[];
}