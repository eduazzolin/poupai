# poupaí
Trabalho acadêmico com React Native - Senac 2024
# Requisitos
**O objetivo é criar um aplicativo para controle de despesas pessoais.** O usuário poderá cadastrar despesas e limites mensais, visualizar o resultado do mês e seu histórico de despesas. O aplicativo deverá ter autenticação de usuário e rotas privadas.
### Fluxo de sessão
- Criar conta (signup)
  - Campos: data de nascimento, nome, email, senha.
- Iniciar sessão (signin)
- Encerrar sessão (signout)
### Fluxo da Home
- Tela de Home com:
  - Card de feedback (economizou, gastou acima do limite, sem despesas registradas).
  - Barra com soma das despesas mensais e limite mensal.
  - Filtro por data (mês).
  - Exibição de resultado do mês (imagem e texto conforme desempenho).
### Fluxo Meus Dados
- Exibir informações do usuário: nome, email, data de nascimento.
- Botão para encerrar sessão (signout).
### Fluxo de Cadastro de Despesa
- Tela/modal para cadastrar, editar e excluir despesa.
  - Campos: descrição, valor, mês referência.
  - Não é permitido para meses anteriores ao corrente.
  - Busca de despesas por mês (Histórico).
### Fluxo de Cadastro de Limite
- Tela/modal para cadastrar, editar e excluir limite mensal.
  - Campos: valor, mês referência.
  - Apenas um limite por mês.
  - Não é permitido para meses anteriores ao corrente.
  - Busca de limite por mês (Consulta).
### Requisitos técnicos
- Rotas privadas acessíveis apenas com token válido.
- Armazenar token de autenticação no local storage.
- Validar autenticação nas trocas de rota.
- Validações antes de fazer requisição para o back-end.
# endpoints
### /usuarios
#### 1. login
- Método: POST
- Endpoint: /login
- Permissão: Público
```json
{
    "email": "string",
    "senha": "string"
}
```
#### 2. cadastro
- Método: POST
- Endpoint: /cadastro
- Permissão: Público
```json
{
    "nome": "string",
    "email": "string",
    "senha": "string",
    "dt_nascimento": "string"
}
```
#### 3. listar
- Método: GET
- Endpoint: /:id
- Permissão: Privado
### /despesas
#### 1. cadastro
- Método: POST
- Endpoint: /
- Permissão: Privado
```json
{
    "descricao": "string",
    "valor": "number",
    "mes_ano": "string",
    "usuario_id": "number"
}
```
#### 2. listar por mês
- Método: GET
- Endpoint: /?mes_ano=string?usuario_id=number
- Permissão: Privado
#### 3. listar por usuario
- Método: GET
- Endpoint: /?usuario_id=number
- Permissão: Privado
#### 4. deletar
- Método: DELETE
- Endpoint: /:id
- Permissão: Privado
#### 5. atualizar
- Método: PUT
- Endpoint: /:id
- Permissão: Privado
```json
{
    "descricao": "string",
    "valor": "number",
    "mes_ano": "string",
    "usuario_id": "number"
}
```
#### 6. valor total por mês
- Método: GET
- Endpoint: /total?mes_ano=string?usuario_id=number
- Permissão: Privado
- Retorno: number
- Exemplo de SQL: `SELECT SUM(valor) FROM despesas WHERE mes_ano = '012024' AND usuario_id = 1;` 
### /limites
#### 1. cadastro
- Método: POST
- Endpoint: /
- Permissão: Privado
```json
{
    "valor": "number",
    "mes_ano": "string",
    "usuario_id": "number"
}
```
#### 2. listar por mês
- Método: GET
- Endpoint: /?mes_ano=string?usuario_id=number
- Permissão: Privado
#### 3. listar por usuario
- Método: GET
- Endpoint: /?usuario_id=number
- Permissão: Privado
#### 4. deletar
- Método: DELETE
- Endpoint: /:id
- Permissão: Privado
#### 5. atualizar
- Método: PUT
- Endpoint: /:id
- Permissão: Privado
```json
{
    "valor": "number",
    "mes_ano": "string",
    "usuario_id": "number"
}
```

