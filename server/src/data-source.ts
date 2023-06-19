import "reflect-metadata"
import { DataSource } from "typeorm"
import { Location } from "./entity/Location"
import { BloodDonor } from "./entity/BloodDonor"
import { BloodDonationForm } from "./entity/BloodDonationForm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "infrend_beadando_veradas",
    synchronize: true,
    logging: true,
    entities: [Location, BloodDonor, BloodDonationForm, User],
    migrations: [],
    subscribers: [],
})
