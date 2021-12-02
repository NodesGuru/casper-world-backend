# Casper Network Stats & Decentralization Map

This web app monitors Casper network health, including nodes version distribution, VPS centralization, stake distribution (to prevent possible sybil attacks) and stake distribution by country, active/non-active nodes and validators statistics by date, etc.

---
## Prerequisites

It's required to install Git, Node.js, Yarn and MongoDB.

### Update your system
```bash
$ sudo apt update
$ sudo apt upgrade
```

### Install git
```bash
$ sudo apt install git -y
```

### Open required ports
```bash
$ sudo ufw allow 27017 
$ sudo ufw allow 80
$ sudo ufw allow 443
$ sudo ufw allow 3000
```

### Install nodejs
- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ curl https://deb.nodesource.com/setup_14.x | sudo bash
      $ sudo apt install -y nodejs

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.15.5

    $ npm --version
    v6.14.11

###
### Yarn installation
After installing node, this project will need yarn too, so just run the following command.

    $ curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
    $ echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    $ sudo apt update && sudo apt install yarn -y

###
### MongoDb installation
Install the latest stable version.

If Ubuntu 20:
```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```
If Ubuntu 18:
```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```

Then continue with the following:
```bash
mkdir -p /data/db
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y mongodb-org < "/dev/null"
echo "storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log
net:
  port: 27017
  bindIp: 127.0.0.1, $(curl ifconfig.me)
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security:
  authorization: enabled" > /etc/mongod.conf
systemctl enable mongod
systemctl restart mongod
systemctl status mongod
```

Now we need to create сasper user, do the following:

Open `mongosh`:
```bash
mongosh
```
Create Admin:
```bash
use admin
db.createUser(
{
user: "Admin",
pwd: "YOUR_$ECURE_P@ASSW0RD",
roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
}
)
exit
```
Re-enter with `Admin`:
```bash
mongosh -u Admin
```
Enter your password, in our case it will be `YOUR_$ECURE_P@ASSW0RD`.

Create сasper user:
```bash
use casper
db.createUser(
{
user: "Casper",
pwd: "YOUR_$ECURE_P@ASSW0RD",
roles: [ { role: "readWrite", db: "casper" } ]
}
)
exit
```

---

## Install Casper World Backend

    $ git clone https://github.com/nodesguru/casper-world-backend
    $ cd casper-world-backend
    $ yarn install

## Configure the application

Create .env file and fill RPC, MongoDB and IP_API_KEY parameters. You can find an example shown below

    RPC=https://node-clarity-mainnet.make.services/rpc

    # MONGODB
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_AUTH_SOURCE

    # API key for https://ip-api.com/ to get location by IP
    IP_API_KEY=

## Testing the project

```bash
yarn run test
```
Expected result: all tests are passed

## Running the project

Run as a service:

```bash
echo "[Unit]
Description=Casper Job
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/casper-world-backend
ExecStart=$(which yarn) --cwd $HOME/casper-world-backend/ start
Restart=always
RestartSec=1
LimitNOFILE=10000
[Install]
WantedBy=multi-user.target" > $HOME/casper-job.service
sudo mv $HOME/casper-job.service /etc/systemd/system/casper-job.service
sudo systemctl daemon-reload
sudo systemctl enable casper-job
sudo systemctl restart casper-job
```

## Documentation

Documentation available [here](https://nodesguru.github.io/casper-world-backend/)

## License

Released under the MIT license.

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) [ Nodes.Guru ]( https://github.com/nodesguru )
