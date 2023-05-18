// Importa os módulos necessários
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Configurações da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'programadorweb-31-03-2023'
  });

  // Cria o servidor Express
const app = express();

// Adiciona o middleware Cors para permitir o acesso externo à API
app.use(cors());

// Configura o servidor para usar requisições no formato JSON
app.use(express.json());

// Acesso a raiz da API
app.get('/', (req, res) => {
    res.send('Minha  API de Programador Web');
  });

// Método para listar todos os registros da tabela alunos
app.get('/alunos', (req, res) => {
    const sql = 'SELECT codigoaluno, nome, endereco, telefone FROM alunos';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

// Método para listar um registro da tabela alunos pelo código do aluno
app.get('/alunos/:codigoaluno', (req, res) => {
  const sql = 'SELECT * FROM alunos WHERE codigoaluno = ' + req.params.codigoaluno;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Método para apagar algum aluno
app.delete('/alunos/:codigoaluno', (req, res) => {
  const sql = 'DELETE FROM alunos WHERE codigoaluno = ' + req.params.codigoaluno;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Aluno apagado: '+ req.params.codigoaluno);
  });
});

// Método para atualizar um registro da tabela alunos pelo código do aluno
app.put('/alunos/:codigoaluno', (req, res) => {
  nome = req.body.nome;
  endereco = req.body.endereco;
  telefone = req.body.telefone;
  const sql = "UPDATE alunos SET nome = '"+nome+"', endereco = '"+endereco+"', telefone = '"+telefone+"' WHERE codigoaluno = " + req.params.codigoaluno;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Registro atualizado com sucesso!');
  });
});

// Método para inserir um novo registro na tabela alunos
app.post('/alunos', (req, res) => {
  nome = req.body.nome;
  endereco = req.body.endereco;
  telefone = req.body.telefone;
  const sql = "INSERT INTO alunos (nome, endereco, telefone) VALUES ('"+nome+"', '"+endereco+"', '"+telefone+"')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Registro inserido com sucesso!');
  });
});

// Método para listar todos os registros da tabela cursos
app.get('/cursos', (req, res) => {
    const sql = "SELECT \
                cursos.codigocurso, \
                cursos.nome, \
                DATE_FORMAT(cursos.inicio, '%d/%m/%Y') as inicio, \
                DATE_FORMAT(cursos.termino, '%d/%m/%Y') as termino, \
                cursos.turno, \
                FORMAT(cursos.valor, 2, 'pt_BR') as valor \
              FROM cursos";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

// Método para listar um registro da tabela alunos pelo código do curso
app.get('/cursos/:codigocurso', (req, res) => {
  const sql = "SELECT \
                cursos.codigocurso, \
                cursos.nome, \
                DATE_FORMAT(cursos.inicio, '%d/%m/%Y') as inicio, \
                DATE_FORMAT(cursos.termino, '%d/%m/%Y') as termino, \
                cursos.turno, \
                FORMAT(cursos.valor, 2, 'pt_BR') as valor \
              FROM cursos \
              WHERE codigocurso = " + req.params.codigocurso;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Método para apagar algum curso
app.delete('/cursos/:codigocurso', (req, res) => {
  const sql = 'DELETE FROM cursos WHERE codigocurso = ' + req.params.codigocurso;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Curso apagado: '+ req.params.codigocurso);
  });
});

// Método para atualizar um registro da tabela cursos pelo código do curso
app.put('/cursos/:codigocurso', (req, res) => {
  nome = req.body.nome;
  cargahoraria = req.body.cargahoraria;
  inicio = req.body.inicio;
  termino = req.body.termino;
  turno = req.body.turno;
  valor = req.body.valor;
  const sql = "UPDATE cursos SET nome = '"+nome+"', cargahoraria = '"+cargahoraria+"', inicio = '"+inicio+"', termino = '"+termino+"', turno = '"+turno+"', valor = '"+valor+"' WHERE codigocurso = " + req.params.codigocurso;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Registro atualizado com sucesso!');
  });
});

// Método para inserir um novo registro na tabela cursos
app.post('/cursos', (req, res) => {
  nome = req.body.nome;
  cargahoraria = req.body.cargahoraria;
  inicio = req.body.inicio;
  termino = req.body.termino;
  turno = req.body.turno;
  valor = req.body.valor;
  const sql = "INSERT INTO cursos (nome, cargahoraria, inicio, termino, turno, valor) VALUES ('"+nome+"', '"+cargahoraria+"', '"+inicio+"', '"+termino+"', '"+turno+"', '"+valor+"')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Novo registro adicionado com sucesso!');
  });
});

// Método para listar todos os registros da tabela matriculas
app.get('/matriculas', (req, res) => {
    const sql = "SELECT \
                  matriculas.codigomatricula, \
                  matriculas.codigoaluno, \
                  matriculas.codigocurso, \
                  alunos.nome, \
                  alunos.endereco, \
                  alunos.telefone, \
                  cursos.nome as cursonome, \
                  DATE_FORMAT(cursos.inicio, '%d/%m/%Y') as inicio, \
                  DATE_FORMAT(cursos.termino, '%d/%m/%Y') as termino, \
                  cursos.turno, \
                  FORMAT(cursos.valor, 2, 'pt_BR') as valor \
                FROM matriculas \
                LEFT JOIN alunos ON (alunos.codigoaluno = matriculas.codigoaluno) \
                LEFT JOIN cursos ON (cursos.codigocurso = matriculas.codigocurso)";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

// Método para listar um registro da tabela alunos pelo código da matrícula
app.get('/matriculas/:codigomatricula', (req, res) => {
  const sql = "SELECT \
                matriculas.codigomatricula, \
                matriculas.codigoaluno, \
                matriculas.codigocurso, \
                alunos.nome, \
                alunos.endereco, \
                alunos.telefone, \
                cursos.nome as cursonome, \
                DATE_FORMAT(cursos.inicio, '%d/%m/%Y') as inicio, \
                DATE_FORMAT(cursos.termino, '%d/%m/%Y') as termino, \
                cursos.turno, \
                FORMAT(cursos.valor, 2, 'pt_BR') as valor \
              FROM matriculas \
              LEFT JOIN alunos ON (alunos.codigoaluno = matriculas.codigoaluno) \
              LEFT JOIN cursos ON (cursos.codigocurso = matriculas.codigocurso) \
              WHERE codigomatricula = " + req.params.codigomatricula; 
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Método para listar um registro da tabela alunos pelo código da matrícula
app.get('/alunosmatriculasemcurso/:codigocurso', (req, res) => {
  const sql = "SELECT \
                matriculas.codigocurso, \
                matriculas.codigomatricula, \
                matriculas.codigoaluno, \
                alunos.nome, \
                alunos.endereco, \
                alunos.telefone, \
                cursos.nome as cursonome, \
                DATE_FORMAT(cursos.inicio, '%d/%m/%Y') as inicio, \
                DATE_FORMAT(cursos.termino, '%d/%m/%Y') as termino, \
                cursos.turno, \
                FORMAT(cursos.valor, 2, 'pt_BR') as valor \
              FROM cursos \
              JOIN matriculas ON (matriculas.codigocurso = cursos.codigocurso) \
              JOIN alunos ON (alunos.codigoaluno = matriculas.codigoaluno) \
              WHERE cursos.codigocurso = " + req.params.codigocurso; 
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


// Método para apagar alguma matrícula
app.delete('/matriculas/:codigomatricula', (req, res) => {
  const sql = 'DELETE FROM matriculas WHERE codigomatricula = ' + req.params.codigomatricula;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Matrícula apagado: '+ req.params.codigomatricula);
  });
});

// Método para atualizar um registro da tabela matriculas pelo código do matricula
app.put('/matriculas/:codigomatricula', (req, res) => {
  codigocurso = req.body.codigocurso;
  codigoaluno = req.body.codigoaluno;
  const sql = "UPDATE matriculas SET codigocurso = '"+codigocurso+"', codigoaluno = '"+codigoaluno+"' WHERE codigomatricula = " + req.params.codigomatricula;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Registro atualizado com sucesso!');
  });
});

// Método para inserir um novo registro na tabela matriculas
app.post('/matriculas', (req, res) => {
  codigocurso = req.body.codigocurso;
  codigoaluno = req.body.codigoaluno;
  const sql = "INSERT INTO matriculas (codigocurso, codigoaluno) VALUES ('"+codigocurso+"', '"+codigoaluno+"')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Novo registro adicionado com sucesso!');
  });
});

// Método para listar todos os registros da tabela usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT codigousuario, nome, senha, email FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Método para listar um registro da tabela usuarios pelo código do usuário
app.get('/usuarios/:codigousuario', (req, res) => {
  const sql = 'SELECT * FROM usuarios WHERE codigousuario = ' + req.params.codigousuario;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Método para apagar algum usuário
app.delete('/usuarios/:codigousuario', (req, res) => {
  const sql = 'DELETE FROM usuarios WHERE codigousuario = ' + req.params.codigousuario;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Usuário apagado: '+ req.params.codigousuario);
  });
});

// Método para atualizar um registro da tabela usuarios pelo código do usuário
app.put('/usuarios/:codigousuario', (req, res) => {
  nome = req.body.nome;
  email = req.body.email;
  senha = req.body.senha;
  const sql = "UPDATE usuarios SET nome = '"+nome+"', email = '"+email+"', senha = MD5('"+senha+"') WHERE codigousuario = " + req.params.codigousuario;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Registro atualizado com sucesso!');
  });
});

// Método para inserir um novo registro na tabela usuarios
app.post('/usuarios', (req, res) => {
  nome = req.body.nome;
  email = req.body.email;
  senha = req.body.senha;
  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('"+nome+"', '"+email+"', MD5('"+senha+"'))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Registro inserido com sucesso!');
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });