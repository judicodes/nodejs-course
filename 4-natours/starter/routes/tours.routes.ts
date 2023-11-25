import { Router } from 'express';
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} from '../controller/tours.controller';

const tourRouter = Router();

tourRouter.param('id', checkId);

tourRouter.route('/').get(getAllTours).post(checkBody, createTour);

tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default tourRouter;
