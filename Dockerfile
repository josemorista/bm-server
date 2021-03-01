FROM ubuntu:20.04

RUN apt update

RUN apt install libgl1-mesa-glx -yq

RUN apt install python3-pip -y

RUN apt install curl -yq 

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -

RUN apt update

RUN printf 'y\n1\n\1n' | apt install nodejs

RUN pip3 install numpy

RUN pip3 install scikit-image

RUN pip3 install opencv-python

RUN pip3 install pydicom

WORKDIR /var/apps/bm-server

COPY . .

RUN npm install pm2 -g

RUN npm install

RUN npm run build

RUN rm -rf ./src

RUN mkdir -p tmp

RUN mkdir -p ./uploads

RUN rm ormconfig.json

RUN sed 's/src/dist/g' ormconfig.sample.json | sed 's/.ts/.js/g' | sed 's/localhost/postgres/g' &> ormconfig.json

ENV NODE_ENV=production apiUrl=https://api.bm-diag.org

EXPOSE 3333

CMD [ "pm2-runtime", "start", "process.json" ]
