FROM "node":latest

RUN echo $DATABASE_URL

WORKDIR /app

COPY package*.json .
COPY . .

RUN chmod +x ./wait-pg.sh

RUN npm install
RUN npx prisma generate

RUN apt update
RUN apt --assume-yes install postgresql-client

RUN apt --assume-yes install dos2unix
RUN dos2unix ./wait-pg.sh

EXPOSE 3000


CMD ["npm", "run", "start:dev"]