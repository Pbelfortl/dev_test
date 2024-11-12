#TODO Configure o Dockerfile
FROM node

WORKDIR /src

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build

CMD [ "npm", "start" ]