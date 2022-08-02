FROM alpine:3.14

RUN apk update

RUN apk add --no-cache \
        git \
        bash \
        su-exec \
        ca-certificates \
        libstdc++ \
        binutils-gold \
        curl \
        g++ \
        gcc \
        gnupg \
        libgcc \
        linux-headers \
        make \
        python3 \
        nodejs-current \
        npm \
        openjdk8 \
        chromium \
        nss \
        freetype \
        harfbuzz \
        ttf-freefont \
        openssl \ 
        jq

# Git
RUN git config --global url."https://".insteadOf "git://"

# JDK
ENV JAVA_HOME /usr/lib/jvm/default-jvm
ENV PATH $PATH:$JAVA_HOME/bin
ENV LD_LIBRARY_PATH=/usr/lib/jvm/default-jvm/jre/lib/amd64/server

# Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

# HELM
RUN curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

# TC JEST FIX
RUN npm install -g npm

# Environment
RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN npm install
CMD [ "node", "index.mjs" ]
