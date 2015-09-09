import mailin from 'mailin';

mailin.start({
  port: 25,
  disableWebhook: true,
  logLevel: 'silly',
  smtpOptions: {
    SMTPBanner: 'Hi from a custom Mailin instance'
  }
});

mailin.on('authorizeUser', function(connection, username, password, done) {
  if (username === 'nicolas' && password === 'iznogoud') {
    done(null, true);
  } else {
    done(new Error('Unauthorized!'), false);
  }
});

mailin.on('message', function (connection, data, content) {
  console.log(data);
});
