FROM node:latest
ENV NODE_ENV='dev'
COPY ["package.json","./"]
RUN npm i --production
COPY . .
EXPOSE 3000
CMD ["node", "."]