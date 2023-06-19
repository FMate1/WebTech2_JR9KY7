import express from 'express';
import { LocationController } from './controller/location.controller';
import { BloodDonorController } from './controller/bloodDonor.controller';
import { BloodDonationFormController } from './controller/bloodDonationForm.controller';
import { UserController } from './controller/user.controller';
import { checkUser } from './protect-routes';

export function getRoutes() {
    const router = express.Router();

    const locationController = new LocationController();

    router.get('/locations', locationController.getAll);
    router.get('/locations/:id', locationController.getOne);
    router.post('/locations', checkUser, locationController.create);
    router.put('/locations', checkUser, locationController.update);
    router.delete('/locations/:id', checkUser, locationController.delete);
    router.put('/locations', checkUser, locationController.activateLocationStatus);
    router.put('/locations', checkUser, locationController.deactivateLocationStatus);

    const bloodDonorController = new BloodDonorController();

    router.get('/bloodDonors', bloodDonorController.getAll);
    router.get('/bloodDonors/:id', bloodDonorController.getOne);
    router.post('/bloodDonors', checkUser, bloodDonorController.create);
    router.put('/bloodDonors', checkUser, bloodDonorController.update);
    router.delete('/bloodDonors/:id', checkUser, bloodDonorController.delete);

    const bloodDonationFormController = new BloodDonationFormController();

    router.get('/bloodDonationForms', bloodDonationFormController.getAll);
    router.get('/bloodDonationForms/:id', bloodDonationFormController.getOne);
    router.post('/bloodDonationForms', checkUser, bloodDonationFormController.create);
    router.put('/bloodDonationForms', checkUser, bloodDonationFormController.update);
    router.delete('/bloodDonationForms/:id', checkUser, bloodDonationFormController.delete);

    const userController = new UserController();

    router.post('/users', userController.create);
    router.post('/users/login', userController.login);

    return router;
}
