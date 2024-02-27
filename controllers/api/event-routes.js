// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files //
const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const { Event, User } = require("../../models");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(
      null,
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("eventImage"), async (req, res) => {
  try {
    const dbEventData = await Event.create({
      event_name: req.body.eventName,
      image: req.file.filename,
      date: req.body.startDate,
      start_time: req.body.startTime,
      price: req.body.price,
      description: req.body.description,
      attendance_number: req.body.attendance,
      creator_id: req.session.userID,
    });

    res.status(200).json(dbEventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    // find all the rows in Event table
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // get just the table information
    const events = eventData.map((e) => {
      return e.get({ plain: true });
    });

    // log the data that was returned
    console.log(events);
    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
