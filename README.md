# poupaí
Trabalho acadêmico com React Native - Senac 2024

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

