import express from 'express';
import {
  createTour,
  deleteTour,
  getAllTours,
  getTourById,
  updateTour,
} from './controller/tours.controller';

const app = express();
app.use(express.json());

const port = 3000;
const baseUrl = '/api/v1';

app.route(`${baseUrl}/tours`).get(getAllTours).post(createTour);

app
  .route(`${baseUrl}/tours/:id`)
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
