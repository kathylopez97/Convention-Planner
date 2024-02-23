const { Event } = require('../models');

const eventData = [
    {
        event_name: 'Twin Cities Comic-Con',
        image: '03-sample-event-TCCC.png',
        date: '2024-01-01',
        start_time: '11:00:00',
        price: 500,
        description: 'Twin Cities Con is a celebration of comics, toys, TV, film, art, and cosplay',
        attendance_number: 10,
        creator_id: 1
    },
    {
        event_name: 'Event A',
        image: '01-sample-event-A.jpeg',
        date: '2024-01-01',
        start_time: '11:00:00',
        price: 500,
        description: 'This is test date for Event A',
        attendance_number: 15,
        creator_id: 1
    },
    {
        event_name: 'Event B',
        image: '02-sample-event-B.png',
        date: '2024-01-01',
        start_time: '11:00:00',
        price: 500,
        description: 'This is test date for Event B',
        attendance_number: 1,
        creator_id: 1
    },

];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;