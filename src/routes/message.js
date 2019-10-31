import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    // return res.send(Object.values(req.context.models.messages));
    // return '\n';
    const messages = await req.context.models.Message.findAll();
    return res.send(messages);
});

router.get('/:messagesId', async (req, res) => {
    // return res.send(req.context.models.messages[req.params.messagesId]);
    const message = await req.context.models.Message.findByPk(
        req.params.messagesId
    );
    return res.send(message);
});

router.post('/', async (req, res) => {
    // const id = uuidv4();
    // const message = {
    //   id,
    //   text: req.body.text,
    //   userId: req.context.me.id,
    // };
    //
    // req.context.models.messages[id] = message;
    //
    // return res.send(message);
    const message = await req.context.models.Message.create({
        text: req.body.text,
        userId: req.context.me.id,
    });
    return res.send(message);
});

router.delete('/:messagesId', async (req, res) => {
    // const {
    //     [req.params.messagesId]: message,
    //     ...otherMessages
    // } = req.context.models.messages;
    // req.context.models.messages = otherMessages;
    // return res.send(message);
    const message = await req.context.models.Message.destory(
        where: { id: req.params.messagesId },
    );

    return res.send(true);
});

export default router;
