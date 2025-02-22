const { Pool } = require('pg');
const dbConfig = require("../config/db.js")

const pool = new Pool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    allowExitOnIdle: dbConfig.allowExitOnIdle,
});
    
// Add a case
const addCase = async (title, type_id, status, start_date, end_date, description, court_id) => {
    const query = "INSERT INTO cases VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)"
    const params = [title, type_id, status, start_date, end_date, description, court_id]
    const result = await pool.query(query, params)
    console.log("Caso agregado")
}

// Get all cases of the portfolio
const getCases = async () => {
    const { rows } = await pool.query('SELECT * FROM cases ORDER BY case_id DESC');
    return rows;
};

// Get a specific case of the portfolio
const getCase = async (caseId) => {
    try {
        const query = 'SELECT * FROM cases WHERE case_id = $1';
        const values = [caseId];
        const { rows } =  await pool.query(query, values);
        return rows[0];
    }
    catch (err) {
        console.error('Error al obtener el caso')
    }
};

// Delete a specific case 
const deleteCase = async (caseId) => {
    const query = 'DELETE FROM cases WHERE case_id = $1';
    const values = [caseId];
    const result = await pool.query(query, values);
    console.log('Registro eliminado exitosamente');
};


// Update the status of a specific case
const updateCase = async (caseId, status) => {
    const query = `
    UPDATE cases
    SET status = $1
    WHERE case_id = $2
    `;
    const params = [status, caseId];
    const result = await pool.query(query, params)
    return result.rows;
};

// Export the CRUD queries
module.exports = {
    getCase,
    getCases,
    addCase,
    updateCase,
    deleteCase
}

