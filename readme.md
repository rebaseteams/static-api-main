

# Concert Curator Backend Service

## Setup Env Variables Locally: 

export DB_HOST="localhost"
export DB_PORT=5432
export DB_DATABASE="concert_curator"
export DB_USER="admin"
export DB_PASSWORD="admin"

## Start postgres instance as a db container
- `npm run setup`

## Create New Migration
- Make changes to existing pg entities or add a new pg entity (table)
- In case of adding a new entity, record the same in pg-conntection.ts > createConnection function.
- Update the `npm run migration-generate` script {migration-name} to give a name for migration.

## Applying Migrations
- `npm run migration-run`

# Kill postgres instance
- `npm run tear-down`
