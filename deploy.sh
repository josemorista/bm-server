#!/bin/bash

export DEBIAN_FRONTEND=noninteractive
apt update
apt upgrade -y
apt install libgtk2.0-dev -y
apt install libgl1-mesa-glx -y
apt install python3-pip -y
apt install curl -yq 
curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
apt update
apt install nodejs -y
npm install -g pm2

pip3 install numpy
pip3 install scikit-image
pip3 install opencv-python
pip3 install pydicom
pip3 install pandas
pip3 install scipy
pip3 install matplotlib
pip3 install sklearn

apt install -y nginx
systemctl enable nginx
systemctl start nginx