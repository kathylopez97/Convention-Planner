const router = require('express').Router();
const Event = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbEventData = await Event.create(
            {
                event_name: req.body.name,
                image: req.body.image,
                date: req.body.date,
                start_time: req.body.start_time,
                price: req.body.price,
                description: req.body.description,
                attendance_number: req.body.attendance 
            }
        );
    } catch {
        return;
    }
})

module.exports = router;