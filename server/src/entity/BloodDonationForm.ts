import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BloodDonationFormDTO } from "../../../models";
import { BloodDonor } from "./BloodDonor";
import { Location } from "./Location";

@Entity()
export class BloodDonationForm implements BloodDonationFormDTO {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    dateOfBloodDonation: string;

    @Column()
    isSuitable: string;

    @Column()
    examiningDoctorName: string;

    @Column({ nullable: true })
    whyNotSuitable: string;

    @Column()
    isDirectedBloodDonation: string;

    @Column({ nullable: true })
    patientFullName: string;

    @Column({ nullable: true })
    patientTAJnumber: number;

    @ManyToOne(() => BloodDonor, (bloodDonor) => bloodDonor.bloodDonationForms, { eager: true })
    bloodDonor: BloodDonor;

    @ManyToOne(() => Location, (location) => location.bloodDonationForms, { eager: true })
    location: Location;

}