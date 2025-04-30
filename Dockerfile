ARG PW_VERSION=1.52.0
FROM mcr.microsoft.com/playwright:v${PW_VERSION}-jammy AS e2e

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci && npm i -D @playwright/test@${PW_VERSION}

# copy sources and build your webpack bundle
COPY . .
RUN npm run build

# run tests by default (override in CI if you just want the image)
CMD ["npx","playwright","test","--reporter=line"]
    