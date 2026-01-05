const { Pool } = require('pg');

const pool = new Pool({
    database: 'storytrip_ai',
    // Default config assumes localhost, default port 5432, 
    // and current user with no password (common local dev setup)
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
