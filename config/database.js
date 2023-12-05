import postgres from 'postgres';

const sql = postgres({
    database: 'AppUcaldas',
    user: 'postgres',
    password: '1124'
});// will use psql environment variables

export default sql;
