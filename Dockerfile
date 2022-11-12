FROM node:16-alpine
WORKDIR /src
COPY package.json /
COPY tsconfig.json /
COPY . .
RUN npm install typescript -g
RUN npm install
RUN npm run build
EXPOSE ${PORT}
CMD npm start