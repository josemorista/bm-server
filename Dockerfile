FROM ubuntu:20.04

RUN npm install pm2 -g

ENV port=3333 apiUrl=https://api.bm-diag.org

RUN mkdir -p /home/apps/bmserver

WORKDIR /home/apps/bmserver

COPY . .

RUN sed 's/src/dist/g' ormconfig.sample.json | sed 's/.ts/.js/g' | sed 's/localhost/postgres/g' &> ormconfig.json

RUN npm install

RUN npm run build

RUN rm -rf ./src

RUN mkdir ./uploads

RUN mkdir ./tmp

EXPOSE 3333

CMD [ "pm2-runtime", "start", "process.json" ]