const mysql = require('mysql2/promise');

async function getTables() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'academico'
  });

  const [tables] = await connection.query('SHOW TABLES');
  const tableNames = tables.map(t => Object.values(t)[0]);

  for (const tableName of tableNames) {
    const [cols] = await connection.query(`DESCRIBE ${tableName}`);
    console.log(`\nTable: ${tableName}`);
    cols.forEach(c => console.log(`  ${c.Field} | ${c.Type} | ${c.Null} | ${c.Key}`));
  }
  
  await connection.end();
}

getTables().catch(console.error);
