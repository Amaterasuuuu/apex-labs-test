FROM node:lts
ENV NODE_ENV dev
RUN npm install -g @nestjs/cli@7.5.6
USER root
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=root . .
RUN yarn
CMD ["yarn", "start:dev"]
