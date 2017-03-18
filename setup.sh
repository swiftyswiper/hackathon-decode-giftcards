if [ ! -f db_settings.json ]; then
    printf '\e[1;31mError:\e[0m db_settings.json file is needed for config. See db_settings.json.template\n'
    exit
fi

# node.js installation
curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt-get install nodejs -y
apt-get install build-essential -y

# install dependencies
cd ~/devcode-giftcards/
npm install

# install and setup nginx
apt-get install nginx -y
cp config/decode-giftcards /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/decode-giftcards /etc/nginx/sites-enabled/decode-giftcards
rm /etc/nginx/sites-enabled/default
nginx -s reload
