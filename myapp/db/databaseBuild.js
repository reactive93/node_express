const knex = require("knex");

const url_db = "postgresql://onlineuser:online@127.0.0.1:5432/myDB";

const database = new knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'onlineuser',
        password: "online",
        database: "myDB2"
    }
});
async function createTable() {

    const isExist_user = await database.schema.hasTable("user_entity");
    const isExist_group = await database.schema.hasTable("group_entity");


    if (isExist_user){
        const drop_user_entity = await database.schema.dropTable("user_entity").thenReturn();
        const user_entity = await create_user();

    }
    if (isExist_group){
        const drop_group_entity = await database.schema.dropTable("group_entity").thenReturn();
        const group_entity = await create_group();
    }
    if (!isExist_group){
        const group_entity = await create_group();
    }
    if(!isExist_user && !isExist_group){
        const user_entity = await create_user();
        const group_entity = await create_group();
    }

}


function create_user() {
    // user_entity TABLE
    return database.schema.createTable("user_entity",tableBuilder => {

        tableBuilder.increments("id").notNullable();
        tableBuilder.string("login").notNullable();
        tableBuilder.string("password").notNullable();
        tableBuilder.string("email").notNullable();
        tableBuilder.timestamp("created_at").defaultTo(database.fn.now());
        tableBuilder.boolean("is_active").notNullable();
    }).thenReturn();
}

function create_group() {
    // group_entity TABLE
    return database.schema.createTable("group_entity",tableBuilder => {
        tableBuilder.increments("id").notNullable();
        tableBuilder.string("name").notNullable();
        tableBuilder.bigInteger("creator_id").references("id").inTable("user_entity");
        tableBuilder.boolean("is_creator");
        tableBuilder.bigInteger("user_id").references("id").inTable("user_entity");
        tableBuilder.string("link").notNullable();
    }).thenReturn();
}


createTable();

database.destroy(()=>console.log("Done"));