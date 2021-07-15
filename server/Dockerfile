FROM alpine:edge

# Installs latest Chromium (89) package.
RUN apk add --no-cache \
      nodejs \
      npm

#RUN addgroup app && adduser -S -G app app
#RUN mkdir /app && chown app:app /app
#USER app

RUN mkdir /app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

ENV PORT=3000
ENV email=mine.trace256@gmail.com
ENV pw=3060TiForDays123
# ENV db=mongodb://localhost/minetrace
# ENV jwtPrivateKey=1234
# ENV GOOGLE_SERVICE_ACCOUNT_EMAIL=minetrace@minetrace.iam.gserviceaccount.com

EXPOSE 3000

RUN ["chmod", "+x", "./docker-entrypoint.sh"]
CMD ["sh", "./docker-entrypoint.sh"]