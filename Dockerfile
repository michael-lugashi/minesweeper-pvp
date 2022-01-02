FROM node:16.13.1

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]