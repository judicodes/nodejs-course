import { Router } from 'express';
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  checkId,
} from '../controller/tours.controller';

const tourRouter = Router();

tourRouter.param('id', checkId);


tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default tourRouter;
