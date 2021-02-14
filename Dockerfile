FROM node:14-alpine

RUN npm install pm2 -g

ENV port=3333 apiUrl=https://api.bm-diag.org

RUN mkdir -p /home/apps/bmserver

COPY ./src /home/apps/bmserver/src

COPY ./package.json /home/apps/bmserver/package.json

COPY ./tsconfig.json /home/apps/bmserver/tsconfig.json

COPY ./babel.config.js /home/apps/bmserver/babel.config.js

COPY ./process.json /home/apps/bmserver/process.json

COPY ./yarn.lock /home/apps/bmserver/yarn.lock

COPY ./ormconfig.sample.json /home/apps/bmserver/ormconfig.sample.json

WORKDIR /home/apps/bmserver

RUN sed 's/src/dist/g' ormconfig.sample.json | sed 's/.ts/.js/g' | sed 's/localhost/postgres/g' &> ormconfig.json

RUN npm install

RUN npm run build

RUN rm -rf ./src

RUN mkdir ./uploads

RUN mkdir ./tmp

EXPOSE 3333

CMD [ "pm2-runtime", "start", "process.json" ]