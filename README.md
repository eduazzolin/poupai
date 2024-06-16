# Poupaí
Trabalho acadêmico com React Native - Senac 2024 <br>
Feito por [Eduardo Azzolin](https://github.com/eduazzolin), [Guilherme Caon](https://github.com/caon-guilherme) e [Pedro Cavallazzi](https://github.com/PedroCavallazzi)
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
### Usuário
1. **POST** /usuario
   - Cria um novo usuário
   - Body: { nome, email, senha, dt_nascimento }
2. **POST** /login
   - Inicia sessão
   - Body: { email, senha }
3. **POST** /logout
    - Encerra sessão
### Despesas
1. **GET** /despesas
   - Retorna todas as despesas do usuário para o mês e ano informados
   - Query: { mes, ano }
2. **POST** /despesas
   - Cria uma nova despesa
   - Body: { descricao, valor, mes, ano, icone }
3. **PUT** /despesas/:id
    - Atualiza uma despesa
    - Body: { descricao, valor, mes, ano, icone }
    - Params: { id }
4. **DELETE** /despesas/:id
    - Deleta uma despesa
    - Params: { id }
5. **GET** /total
    - Retorna o valor total de despesas do usuário para o mês e ano informados
    - Query: { mes, ano }
### Limites
1. **GET** /limites
   - Retorna o limite do usuário para o mês e ano informados
   - Query: { mes, ano }
2. **POST** /limites
    - Cria um novo limite
    - Body: { valor, mes, ano }
3. **PUT** /limites/:id
    - Atualiza um limite
    - Body: { valor, mes, ano }
    - Params: { id }
4. **DELETE** /limites/:id
    - Deleta um limite
    - Params: { id }