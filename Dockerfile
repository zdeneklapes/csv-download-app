FROM node:18.19
WORKDIR /opt/frontend
COPY package.json package-lock.json /opt/frontend/
RUN <<EOF
  npm install
EOF
COPY public /opt/frontend/public
COPY src /opt/frontend/src
COPY angular.json tsconfig.json tsconfig.app.json tsconfig.spec.json /opt/frontend/
