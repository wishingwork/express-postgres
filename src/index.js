import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    // req.me = users[1];
    req.context = {
        models,
        // me: models.users[1],
        me: await models.User.findByLogin('rwieruch'),
    };
    
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// app.get('/', (req, res) => {
//     return res.send('Received a GET HTTP method');
// });
//
// app.post('/', (req, res) => {
//     return res.send('Received a POST HTTP method');
// });
//
// app.put('/', (req, res) => {
//     return res.send('Received a PUT HTTP method');
// });
//
// app.delete('/', (req, res) => {
//     return res.send('Received a DELETE HTTP method');
// });

// app.get('/users', (req, res) => {
//     return res.send(Object.values(Object.values(req.context.models.users)));
// });
//
// app.get('/users/:userId', (req, res) => {
//     return res.send(req.context.models.users[req.params.userId]);
// });
//
// app.post('/users', (req, res) => {
//     return res.send('POST HTTP method on user resource');
// });
//
// app.put('/users/:userId', (req, res) => {
//     return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
// });
//
// app.delete('/users/:userId', (req, res) => {
//     return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
// });

// app.get('/messages', (req, res) => {
//     return res.send(Object.values(req.context.models.messages));
//     // return '\n';
// });
//
// app.get('/messages/:messagesId', (req, res) => {
//     return res.send(req.context.models.messages[req.params.messagesId]);
// });
//
// app.post('/messages', (req, res) => {
//     const id = uuidv4();
//     const message = {
//       id,
//       text: req.body.text,
//       userId: req.context.me.id,
//     };
//
//     req.context.models.messages[id] = message;
//     return res.send(message);
// });
//
// app.delete('/messages/:messagesId', (req, res) => {
//     const {
//         [req.params.messagesId]: message,
//         ...otherMessages
//     } = req.context.models.messages;
//     req.context.models.messages = otherMessages;
//
//     return res.send(message);
// });
//
// app.get('/session', (req, res) => {
//     return res.send(req.context.models.users[req.context.me.id]);
// });

app.get('/ok', (req, res) => {
    res.send('Hello ok!');
});

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUserWithMessages();
    }

    app.listen(process.env.PORT, (err) => {
      if(err) {
          console.log(err);
      }
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
});

const createUserWithMessages = async () => {
    await models.User.create(
        {
            username: 'rwieruch',
            messages: [
                {
                    text: 'Published the Road to learn React',
                },
            ],
        },
        {
            include: [models.Message],
        },
    );

    await models.User.create(
        {
            username: 'ddavids',
            messages: [
                {
                    text: 'Happy to release ...',
                },
                {
                    text: 'Published a complete ...',
                },
            ],
        },
        {
            include: [models.Message],
        },
    );
};
