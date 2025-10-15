import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {

    const dbClient = await database.getNewClient();

    const databaseName = process.env.POSTGRES_DB;

    const databaseOpenedConnectionsResultBefore = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName]});

    const databaseOpenedConnectionsValueBefore = parseInt(databaseOpenedConnectionsResultBefore.rows[0].count);

    console.log("conexoes abertas antes: " + databaseOpenedConnectionsValueBefore)

    const defaultMigrationOptions = {
        dbClient: dbClient,
        dryRun: true,
        dir: join("infra", "migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations"
        }

    if (request.method === 'GET') {
        const pendingMigrations = await migrationRunner(defaultMigrationOptions);
        await dbClient.end();
        return response.status(200).json(pendingMigrations);
    }

    if (request.method === 'POST') {
        const migratedMigrations = await migrationRunner({
            ...defaultMigrationOptions,
            dryRun: false});

        await dbClient.end();    

        if (migratedMigrations.length > 0) {
            return response.status(201).json(migratedMigrations);
        }

        return response.status(200).json(migratedMigrations);
    }

    
    const databaseOpenedConnectionsResultAfter = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName]});

    const databaseOpenedConnectionsValueAfter = parseInt(databaseOpenedConnectionsResultAfter.rows[0].count);

    console.log("conexoes abertas depois: " + databaseOpenedConnectionsValueAfter)

    return response.status(405).end();
}