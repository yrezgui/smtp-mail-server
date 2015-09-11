# SMTP Mail test server
mail testing service using [mailin](http://mailin.io)


## Getting started
If you don't have NVM installed:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
```

If you don't have NodeJS v4 installed:

```
nvm install v4
nvm alias default 4
```

Execute these commands to run the server:

```
npm install
sudo npm start-watch
```

## Send email test

Run telnet to connect to the server:

```
telnet localhost 25
```

And copy past these commands in your terminal:

```
EHLO mail.simple.co

MAIL FROM: <support@simple.co>

RCPT TO: <support@simple.co>

DATA

From: "Yacine Rezgui" <yrezgui@simple.co>
To: "Robin Vivant" <rvivant@simple.co>
Subject: test message sent from manual telnet session
Date: Wed, 11 May 2015 16:19:57 -0400

Hello World,
This is a test message sent from a manual telnet session.

Yours truly,
SMTP administrator






.

QUIT

```

You should see an email ID displayed in the server logs like `9a1266a7-c29a-48fb-90a4-bda4dca160bc`

Open your browser with this URL: [http://localhost:3333/emails/9a1266a7-c29a-48fb-90a4-bda4dca160bc](http://localhost:3333/emails/9a1266a7-c29a-48fb-90a4-bda4dca160bc)

## Docker commands

### Build the docker image

In the root directory, execute: 

```
docker build -t <image-name> .
```

### Run the container

```
docker run -d -p 25:25 -p 3333:3333 --name <container-name> <image-name>
```

### Get the followable logs

```
docker logs -f <container-name>
```

You should be able to access the app as usual (be sure to check `DOCKER_HOST` for Mac OS X users, in this case you'll have to access the `mailin` service this way: `telnet DOCKER_HOST 25`)
