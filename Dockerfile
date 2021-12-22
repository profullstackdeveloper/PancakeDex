FROM mhart/alpine-node:12
# RUN apk update && apk add --no-cache wget

# RUN wget https://nodejs.org/dist/v13.0.1/node-v13.0.1-linux-x64.tar.xz && tar -xf node-v13.0.1-linux-x64.tar.xz
RUN node -v
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*   
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN apk add --no-cache git
#RUN npm update
RUN npm config set unsafe-perm true
RUN npm cache clean --force
RUN npm install -g serve
RUN npm install --legacy-peer-deps
RUN node -v
RUN npm run build
EXPOSE 8080
CMD ["serve", "-l", "8080", "./build"]