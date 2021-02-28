FROM ubuntu:20.04

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -

RUN apt update

RUN apt install python3-pip -y

RUN apt install curl -y 

RUN apt install nodejs -y

RUN pip3 install numpy

RUN pip3 intall sckit-image

RUN pip3 install opencv-python

RUN pip3 install pydicom

WORKDIR ~/apps/bm-server

COPY . .

RUN npm install pm2 -g

RUN npm install

RUN npm run build

RUN rm -rf ./src

RUN mkdir -p tmp

RUN mkdir -p ./uploads

ENV NODE_ENV=production apiUrl=https://api.bm-diag.org

RUN sed 's/src/dist/g' ormconfig.sample.json | sed 's/.ts/.js/g' | sed 's/localhost/postgres/g' &> ormconfig.json

EXPOSE 3333

CMD [ "pm2-runtime", "start", "process.json" ]
