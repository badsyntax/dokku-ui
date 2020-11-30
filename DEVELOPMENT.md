# How to develop this app

There's two main workflows:

- Develop the app on the host using mock dokku and docker servers
- Publish and run the app in a VirtualBox VM

## Getting started

Run the app in development mode:

```sh
nvm use
npm i

# In terminal 1
npm run start:mock-dokku

# In terminal 2
npm run dev
```

## Running in the dokku VM

> Due to performance issues with synced folders we can't share node_modules between host and container. For this reason it's not practical to do development within the container if using an IDE.

The following describes the process to deploy dokku-ui to a Ubuntu VM.

Clone the dokku repo:

```sh
git clone https://github.com/dokku/dokku
```

Start the dokku VM using vagrant:

```sh
cd dokku
vagrant up dokku
```

Visit http://dokku.me to complete the installation.

Install & start the dokku-daemon:

```sh
vagrant ssh
cd /home/vagrant/
git clone https://github.com/dokku/dokku-daemon
cd dokku-daemon
sudo make install
sudo systemctl start dokku-daemon
```

## Adding mocks

Interact with the daemon to save mock responses to the mock dokku server:

```sh
vagrant ssh
socat - UNIX-CONNECT:/var/run/dokku-daemon/dokku-daemon.sock
```

## Deploying to the dokku VM

Create the dokku-ui app:

```sh
vagrant ssh
sudo -s
dokku apps:create dokku-ui
dokku storage:mount dokku-ui /var/run/dokku-daemon/dokku-daemon.sock:/var/run/dokku-daemon/dokku-daemon.sock
dokku storage:mount dokku-ui /var/run/docker.sock:/var/run/docker.sock
dokku config:set dokku-ui NODE_ENV=production
# dokku ps:restart dokku-ui
```

Add the git remote and push to deploy:

```sh
git remote add dokku dokku@dokku.me:dokku-ui
git push dokku
```
