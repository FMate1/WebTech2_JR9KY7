import { AppDataSource } from "../data-source";
import { BloodDonor } from "../entity/BloodDonor";
import { Controller } from "./base.controller";

export class BloodDonorController extends Controller {
    repository = AppDataSource.getRepository(BloodDonor);
}