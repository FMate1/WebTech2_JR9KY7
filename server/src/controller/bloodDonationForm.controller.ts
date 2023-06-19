import { AppDataSource } from "../data-source";
import { BloodDonationForm } from "../entity/BloodDonationForm";
import { Controller } from "./base.controller";


export class BloodDonationFormController extends Controller {
    repository = AppDataSource.getRepository(BloodDonationForm);
}