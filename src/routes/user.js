import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    // return res.send(Object.values(Object.values(req.context.models.users)));
    const users = await req.context.models.User.findAll();
    return res.send(users);
});

router.get('/:userId', async (req, res) => {
    // return res.send(req.context.models.users[req.params.userId]);
    const user = await req.context.models.User.findByPk(
        req.params.userId,
    );
    return res.send(user);
});

export default router;
