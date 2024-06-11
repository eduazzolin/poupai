import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'poupai'
}).promise()

export async function getUsuarioById(id) {
  const [rows] =  await pool.query(`SELECT * FROM USUARIOS WHERE ID = ?`, [id])
  return rows[0]
}

export async function getUsuario(email, senha) {
  const [rows] =  await pool.query(`SELECT * FROM USUARIOS WHERE EMAIL = ? and SENHA = ?`, [email, senha])
  return rows[0]
}

export async function existsUsuarioEmail(email) {
  const [rows] =  await pool.query(`SELECT * FROM USUARIOS WHERE EMAIL = ?`, [email])
  return rows[0] != null
}

export async function insertUsuario(email, senha, nome, dt_nascimento) {
  const [rows] = await pool.query(`INSERT INTO USUARIOS (EMAIL, SENHA, NOME, DT_NASCIMENTO) VALUES (?, ?, ?, ?)`, [email, senha, nome, dt_nascimento])
  const id = rows.insertId
  return getUsuarioById(id)
}

export async function insertDespesa(descricao, valor, mes, ano, usuario_id, icone) {
  const [rows] = await pool.query(`INSERT INTO DESPESAS (DESCRICAO, VALOR, MES, ANO, USUARIO_ID, ICONE) VALUES (?, ?, ?, ?, ?, ?)`, [descricao, valor, mes, ano, usuario_id, icone])
  const id = rows.insertId
  return getDespesaById(id)
}

export async function getDespesaById(id) {
  const [rows] =  await pool.query(`SELECT * FROM DESPESAS WHERE ID = ?`, [id])
  return rows[0]
}

export async function getDespesaByUsuarioMesAno(usuario, mes, ano) {
  console.log (usuario, mes, ano)
  const [rows] =  await pool.query(`SELECT * FROM DESPESAS WHERE USUARIO_ID = ? AND MES = ? AND ANO = ?`, [usuario, mes, ano])
  return rows
}

export async function getDespesaByUsuario(usuario) {
  const [rows] =  await pool.query(`SELECT * FROM DESPESAS WHERE USUARIO_ID = ?`, [usuario])
  return rows
}

export async function removeDespesa(id) { 
  const [rows] =  await pool.query(`DELETE FROM DESPESAS WHERE ID = ?`, [id])
  return rows[0]
}

export async function updateDespesa(id, descricao, valor, mes, ano, usuario_id, icone) {
  const [rows] = await pool.query(`UPDATE DESPESAS SET DESCRICAO = ?, VALOR = ?, MES = ?, ANO = ?, USUARIO_ID = ?, ICONE = ? WHERE ID = ?`, [descricao, valor, mes, ano, usuario_id, icone, id])
  return getDespesaById(id)
}

export async function getValorTotalById(mes, ano, usuario_id) {
  const [rows] =  await pool.query(`SELECT SUM (valor) AS TOTAL FROM DESPESAS WHERE MES = ? AND ANO = ? AND USUARIO_ID = ?`, [mes, ano, usuario_id])
  return rows[0]
}

export async function insertLimit(valor, mes, ano, usuario_id) {
  const [rows] = await pool.query(`INSERT INTO LIMITES (VALOR, MES, ANO, USUARIO_ID) VALUES (?, ?, ?, ?)`, [valor, mes, ano, usuario_id])
  const id = rows.insertId
  return getLimiteById(id)
}

export async function getLimiteById(id) {
  const [rows] =  await pool.query(`SELECT * FROM LIMITES WHERE ID = ?`, [id])
  return rows[0]
}

export async function getLimiteByUsuarioMesAno(usuario, mes, ano) {
  const [rows] =  await pool.query(`SELECT * FROM LIMITES WHERE USUARIO_ID = ? AND MES = ? AND ANO = ?`, [usuario, mes, ano])
  return rows[0]
}

export async function removeLimite(id) { 
  const [rows] =  await pool.query(`DELETE FROM LIMITES WHERE ID = ?`, [id])
  return rows[0]
}

export async function updateLimite(id, valor, mes, ano, usuario_id) {
  const [rows] = await pool.query(`UPDATE LIMITES SET VALOR = ?, MES = ?, ANO = ?, USUARIO_ID = ? WHERE ID = ?`, [valor, mes, ano, usuario_id, id])
  return getLimiteById(id)
}
