import mailin from 'mailin';
import express from 'express';
import LRU from 'lru-cache';

let app   = express();
let cache = LRU({
  max: 50,
  maxAge: 30 * 60 * 1000
});

mailin.start({
  port: 25,
  disableWebhook: true,
  logLevel: 'silly',
  smtpOptions: {
    SMTPBanner: 'Hi from the SMTP test server'
  }
});

mailin.on('authorizeUser', function(connection, username, password, done) {
  if (username === 'yacine' && password === 'secret') {
    done(null, true);
  } else {
    done(new Error('Unauthorized!'), false);
  }
});

mailin.on('message', function (connection, data, content) {
  cache.set(connection.id, data);
  console.log('EMAIL RECEIVED AND CACHED', connection.id);
});

app.get('/check', (req, res, next) => {
  res.send('200 OK');
});

app.get('/emails/:emailId', (req, res, next) => {
  const email = cache.get(req.params.emailId);

  if (email) {
    res.send(email);
  } else {
    res.status(404).send('Sorry, we cannot find that email!');
  }
});

export default app;
