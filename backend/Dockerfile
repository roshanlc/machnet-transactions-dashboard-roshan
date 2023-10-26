FROM golang:1.21.3-alpine

WORKDIR /usr/arc/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./

# Reduce time by simply copying dependencies
COPY vendor ./vendor

# RUN go mod download 

#RUN go mod verify

COPY . .

COPY .env.example .env

RUN go build -ldflags="-w -s" -v -o /usr/local/bin/app .

EXPOSE 9000

# # Hard coding the db credentails for docker container
# ENV host localhost
# ENV port 5432
# ENV username postgres
# ENV password test1234
# ENV dbname transx

# supported: debug, release, test
ENV mode release

CMD ["app"]


# Reference: https://hub.docker.com/_/golang