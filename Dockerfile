FROM node:15.3.0-alpine

LABEL maintainer=willis.rh@gmail.com

LABEL org.label-schema.name="dokku-ui" \
  org.label-schema.description="dokku-ui image" \
  org.label-schema.vcs-url="https://github.com/badsyntax/dokku-ui" \
  org.label-schema.usage="README.md" \
  org.label-schema.vendor="badsyntax"

ENV APP_HOME=/usr/local/app
ENV NPM_CONFIG_LOGLEVEL error
ENV NPM_CONFIG_FUND false
ENV NPM_CONFIG_AUDIT false
ENV PORT 3000
ENV WS_PORT 3001
ENV CI true

WORKDIR $APP_HOME

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]
