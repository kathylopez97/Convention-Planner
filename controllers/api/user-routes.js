const router = require('express').Router();
const User = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isCreator: req.body.isCreator
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', (req, res) => {
    try {
        const dbUserData = User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if (!dbUserData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password! Please try again.' })
            return;
        }

        const correctPassword = User.validatePassword(req.body.password);

        if (!correctPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password! Please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            
            res
                .status(200)
                .json({ user: dbUserData, message: 'Successfully logged in!' });
        });
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;