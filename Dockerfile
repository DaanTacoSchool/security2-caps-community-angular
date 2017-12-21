FROM node

ENV HOME=/usr/src/app
RUN mkdir $HOME
WORKDIR $HOME

RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN npm install -g @angular/cli

EXPOSE 4200
EXPOSE 49153