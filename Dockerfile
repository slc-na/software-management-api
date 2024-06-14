######################################
#        BUILD FOR Development       #
######################################

FROM "node":latest As development

RUN echo 

ADD . /app

WORKDIR /app

# COPY package*.json .
# COPY . .

RUN chmod +x ./wait-pg.sh

RUN npm install
RUN npx prisma generate

RUN apt update
RUN apt --assume-yes install postgresql-client

RUN apt --assume-yes install dos2unix
RUN dos2unix ./wait-pg.sh
RUN npx prisma db push
EXPOSE 3009

CMD ["npm", "run", "start:dev"]

######################################
#        BUILD FOR Development       #
######################################

