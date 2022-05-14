import express from "express";
const router = express.Router();
import Reservation from "../models/reservation.js";

router.route("/add").post((req, res) => {
  const { title, date, showTime, seatNumber, seatingArea, price } = req.body;

  const newReservation = new Reservation({
    title,
    date,
    showTime,
    seatNumber,
    seatingArea,
    price,
  });

  newReservation
    .save()
    .then(() => {
      res.status(200).send({ status: "Reservation added" });
      console.log("Reservation added");
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with adding Reservation ", error: err.message });
      console.log("Error with adding Reservation :", err);
    });
});

router.route("/").get((req, res) => {
  Reservation.find()
    .then((Reservation) => {
      res.json(Reservation);
      console.log("Reservations fetched :", Reservation);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          status: "Error with fetching Reservations ",
          error: err.message,
        });
      console.log("Error with fetching Reservations :", err);
    });
});

router.route("/get/:id").get(async (req, res) => {
  let reservationID = req.params.id;
  await Reservation.findById(reservationID)
    .then((Reservation) => {
      res.status(200).send({ status: "Reservation fetched", Reservation });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error with fetching Reservation",
          error: err.message,
        });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let reservationID = req.params.id;
  const { title, date, showTime, seatNumber, seatingArea, price } = req.body;

  const updateReservation = {
    title,
    date,
    showTime,
    seatNumber,
    seatingArea,
    price,
  };

  await Reservation.findByIdAndUpdate(reservationID, updateReservation)
    .then(() => {
      res.status(200).send({ status: "Reservation updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with updating Reservation",
          error: err.message,
        });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let reservationID = req.params.id;
  await Reservation.findByIdAndDelete(reservationID)
    .then(() => {
      res.status(200).send({ status: "Reservation deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error with deleting the Reservation",
          error: err.message,
        });
    });
});

export default router;
