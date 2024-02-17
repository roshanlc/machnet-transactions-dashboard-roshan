# Stage 1: Build stage
FROM golang:1.22-alpine AS build

WORKDIR /usr/src/app

COPY go.mod go.sum ./
COPY vendor ./vendor
COPY . .

RUN go build -ldflags="-w -s" -v -o /usr/local/bin/app .

EXPOSE 9000

# Stage 2: Final (scratch)
FROM scratch

COPY .env.example .env

# Copy only the built binary from the build stage
COPY --from=build /usr/local/bin/app /usr/local/bin/app

# Set environment variable (customize with build arguments if needed)
# supported: debug, release, test
ENV mode release

# Run the application
CMD ["app"]

# ---------------------------------------------------
# FROM golang:1.21.3-alpine

# WORKDIR /usr/arc/app

# # pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
# COPY go.mod go.sum ./

# # Reduce time by simply copying dependencies
# COPY vendor ./vendor

# # RUN go mod download 

# #RUN go mod verify

# COPY . .

# COPY .env.example .env

# RUN go build -ldflags="-w -s" -v -o /usr/local/bin/app .

# EXPOSE 9000

# # # Hard coding the db credentails for docker container
# # ENV host localhost
# # ENV port 5432
# # ENV username postgres
# # ENV password test1234
# # ENV dbname transx

# # supported: debug, release, test
# ENV mode release

# CMD ["app"]


# Reference: https://hub.docker.com/_/golang