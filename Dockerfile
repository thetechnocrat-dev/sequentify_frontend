FROM node
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /app
WORKDIR /app

COPY README.md /app/ ./
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
