# node.js installation
curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
sudo apt-get install build-essential -y

# install dependencies
cd ~/devcode-giftcards/
npm install

# install and setup nginx
sudo apt-get install nginx -y
sudo cp config/decode-giftcards /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/decode-giftcards /etc/nginx/sites-enabled/decode-giftcards
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -s reload
