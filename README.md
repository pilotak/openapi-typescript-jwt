# OpenAPI 3 TypeScript JWT template
An example API with TypeScript support and basic login mechanism based on JWT

## Install
```sh
npm install && npm run dev
```

## Run
First login and copy generated token.

```sh
curl -H 'Accept: application/json' -X POST -d 'username=test' http://localhost:3000/v1/login
```

Now you can see openapi.json
```sh
curl -H 'Accept: application/json' -X GET -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' http://localhost:3000/v1/docs
```

Or you can list users
```sh
curl -H 'Accept: application/json' -X GET -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' http://localhost:3000/v1/users
```

## GUI
Just visit `redoc.html` via your browser
