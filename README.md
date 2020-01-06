# Zeit Now Postgres DB - Proof of Concept 

This is a proof of concept on how to write a lambda function for [Zeit now.sh](https://zeit.co) that connects to a Postgres DB on AWS RDS.

## Prerequisites

- Node.js 12@latest
- Now account + Now CLI installed
- AWS Account with a Postgres RDS DB created


## Setup

- Create your RDS with a user and password and create a database in it.
- Rename `example.env` to `.env` and fill in your credentials.  
- Create a Now account.
- Install the now cli `npm i -g now`.
- And login `now login`.
- Update the `name` in `now.json`
- Open a terminal in the root of this repo.
- Install node dependencies `npm i`.
- Add your secrets to now (they will be encrypted into your account)
  - `now secrets add user foo`
  - `now secrets add password supersecret`
  - `now secrets add database bah`
  - `now secrets add port 5432`
  - `now secrets add host foo.123.eu-central-1.rds.amazonaws.com`

## Development local

!Hint: The example expects to get a JSON body on the POST function.

To test your function run on localhost

```bash
now dev
```

In another session run

```bash
curl --location --request POST 'http://localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{"foo":"bah"}'
```

## Deployment Production

To deploy your function run.

```bash
now --prod
```
