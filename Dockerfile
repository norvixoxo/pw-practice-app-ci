FROM mcr.microsoft.com/playwright:v1.45.3-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install
