/* eslint-disable import/extensions */
/* eslint-disable no-console*/
import express from 'express';
import * as tourController from '../controllers/tourController.js';

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStart);
router.route('/monthly-plan/:year').get(tourController.getTourMothlyPlan);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
