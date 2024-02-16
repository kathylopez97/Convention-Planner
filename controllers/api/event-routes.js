const router = require("express").Router();
const { Event, User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const dbEventData = await Event.create({
      event_name: req.body.name,
      image: req.body.image,
      date: req.body.date,
      start_time: req.body.start_time,
      price: req.body.price,
      description: req.body.description,
      attendance_number: req.body.attendance,
      creator_id: req.body.creator_id,
    });
  } catch {
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
    res.render("events", events);
  } catch {
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
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
