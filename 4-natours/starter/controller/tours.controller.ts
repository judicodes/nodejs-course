import { Request, Response } from "express";
import { readFileSync, writeFile } from "fs";
import path from "path";
import { TourDto } from "../model/tour.interface";

const toursFilePath = path.resolve(
  __dirname,
  "..",
  "dev-data",
  "data",
  "tours-simple.json"
);
const tours: TourDto[] = JSON.parse(readFileSync(toursFilePath, "utf-8"));

// TODO: replace middleware function with yup validators

const checkId = (req: Request, res: Response, next: Function) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  console.log(`Tour id is: ${id}`);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }
  next();
};

const checkBody = (req: Request, res: Response, next: Function) => {
  const { name, price } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name"
    });
  }

  if (!price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing price"
    });
  }

  next();
};

const getAllTours = (_: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTourById = (req: Request, res: Response) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour
    }
  });
};

const createTour = (req: Request, res: Response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour: TourDto = { ...req.body, id: newId };
  tours.push(newTour);
  writeFile(toursFilePath, JSON.stringify(tours), () => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
  });
};

const updateTour = (req: Request, res: Response) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  const updatedTour = { ...tour, ...req.body };
  if (tour) {
    tours[tours.indexOf(tour)] = updatedTour;
  }
  writeFile(toursFilePath, JSON.stringify(tours), () => {
    res.status(201).json({
      status: "success",
      data: {
        tour: updatedTour
      }
    });
  });
};

const deleteTour = (req: Request, res: Response) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (tour) {
    tours.splice(tours.indexOf(tour), 1);
  }
  writeFile(toursFilePath, JSON.stringify(tours), () => {
    res.status(204).json({
      status: "success",
      data: null
    });
  });
};

export {
  createTour,
  deleteTour,
  getAllTours,
  getTourById,
  updateTour,
  checkId,
  checkBody
};
