# How to develop this app

## Running the app

Run the app in development mode (`docker` and `dokku` are mocked):

```sh
nvm use
npm i
npm run build:server

# In terminal 1
npm run start:mock-dokku

# In terminal 2
npm start
```

Visit http://localhost:3000 to view the running app.

## Running in a dokku VM

Running the app in the VM means we don't need to mock `dokku` or `docker`.

### Setting up the VM

Clone the `dokku` repo:

```sh
git clone https://github.com/dokku/dokku
cd dokku
```

Update the `Vagrantfile` to use `rsync` for synced folders (this allows app server to reload when files change):

Replace:

`vm.vm.synced_folder File.dirname(__FILE__), "/root/dokku"`

with:

`vm.vm.synced_folder File.dirname(__FILE__), "/root/dokku", type: "rsync", rsync_auto: true, rsync_exclude: ".git/"`

Start the `dokku` VM using `vagrant`:

```sh
vagrant up dokku
```

Visit http://dokku.me to complete the installation.

Start `rsync-auto` in a different terminal to sync file changes:

```sh
vagrant rsync-auto
```

Install & start the `dokku-daemon`:

```sh
vagrant ssh
cd /home/vagrant/
git clone https://github.com/dokku/dokku-daemon
cd dokku-daemon
sudo make install
sudo systemctl start dokku-daemon
```

### Running in the dokku VM

Copy the `dokku-ui` directory into the root of the `dokku` repo and enter the VM:

```sh
cp -r dokku-ui ../dokku/
```

Install deps in the VM:

```sh
vagrant ssh
cd /vagrant/dokku-ui
rm -rf node_modules package-lock.json
npm i
```

As the `node_modules` folder is synced to the host, this process can take a long time and is known to freeze. To workaround this performance issue:

1. Move the `dokku-ui` directory into a different directory within the VM
2. Install the node modules (`npm i`)
3. Move the `dokku-ui` directory back into `/vagrant`
4. You might need to run `npm rebuild --verbose sharp` to fix any symlink issues

Update vagrant user permissions to allow nodejs to access sockets:

```sh
sudo usermod -aG docker vagrant
sudo usermod -aG dokku vagrant
```

Now you can build and start the app within the VM:

```sh
npm run build:server
npm start
```

Visit http://dokku.me:3000 to view the running app.

### Deploying to the dokku VM

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

## Adding mocks

Interact with the daemon to save mock responses to the mock `dokku` server:

```sh
vagrant ssh
socat - UNIX-CONNECT:/var/run/dokku-daemon/dokku-daemon.sock
```
