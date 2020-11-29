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

Clone the dokku repo:

```sh
git clone https://github.com/dokku/dokku
```

Start the dokku VM using vagrant:

```sh
cd dokku
vagrant up dokku
```

Install & start the dokku-daemon:

```sh
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
