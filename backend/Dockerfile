FROM golang:alpine

WORKDIR /usr/arc/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./

RUN go mod download 

#RUN go mod verify

COPY . .

RUN go build -v -o /usr/local/bin/app .

EXPOSE 9000

# # Hard coding the db credentails for docker container
# ENV host localhost
# ENV port 5432
# ENV username postgres
# ENV password test1234
# ENV dbname transx


CMD ["app"]


# Reference: https://hub.docker.com/_/golang