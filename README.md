# Sobre o projeto

Uma aplicação de Uma aplicação de gerenciamento de contatos , onde um usuário pode cadastrar vários contatos e seus contatos podem ter vário numeros e vários emails, um usuário também pode ter vários numeros vinculados a ele.

# Como instalar e rodar a aplicação

1- Clone o repositório para a sua maquina

2- Instale todas as dependências necessárias com o comando : `yarn` ou  `npm install`

3- Crie um arquivo .env, siga o exemplo do arquivo .env.example e preencha os dados necessário

4- Rode as migrations com o : `yarn typeorm migration:run -d src/data-source.ts`

5- Por fim é só rodar a aplicação com o comando: `yarn dev`

# Rotas
**BASE_URL: http://localhost:3001**

O workspace com todas as requisições se encontra na pasta raiz da aplicação para que se possa ser importada no insominia
## **Rotas de Usuário:**

1- Criação de Usuário

- POST /users/create
- Não há necessidade de um token
- Exemplo do corpo da requisição:

```json
{
  "name": "Pedro",
  "email": "Pedro@gmail.com",
  "password": "1234",
  "phones": ["2133033333", "21991073426"]
}
```

2- Listagem de Usuário

- GET /users/profile/:user_id
- É necessário ter um token
- Não é necessário um corpo da requisição

3- Atualização de Usuário

- PATCH /users/update/:user_id
- É necessário ter um token
- Exemplo do corpo da requisição:

```json
{
  "name": "novo_nome",
  "email": "novo_email",
  "password": "nova_senha"
}
```

4- Deleção de Usuário

- DELETE /users/delete/:user_id
- É necessário ter um token
- Não é necessário um corpo da requisição

## **Rotas de Contatos:**

1- Criação de Contato

- POST /contacts/create/:user_id
- É necessário ter um token
- Exemplo do corpo da requisição:

```json
{
  "name": "caio",
  "emails": ["caio@gmail.com", "caio2@gmail.com"],
  "phones": ["2133033333", "21991000000"]
}
```

2- Listagem de Contatos de um Usuário

- GET /contacts/:user_id
- É necessário ter um token
- Não é necessário um corpo da requisição

3- Atualização de Contato

- PATCH /contacts/update/:contact_id
- É necessário ter um token
- Exemplo do corpo da requisição:

```json
{
  "name": "novo_nome"
}
```

4- Deleção de contato

- DELETE /contacts/delete/:contact_id
- É necessário ter um token
- Não é necessário um corpo da requisição

## **Rota de Login:**

1- Login de Usuário

- POST /login/users
- Não há necessidade de um token
- Exemplo do corpo da requisição:

```json
{
  "name": "Pedro",
  "password": "1234"
}
```

## **Rotas de Email:**

1- Criação de Email para contatos

- POST /emails/create/:contact_id
- É necessário ter um token
- Exemplo do corpo da requisição:

```json
{
  "emails": ["email1@gmail.com", "email2@gmail.com"]
}
```

2- Atualização de Email

- PATCH /emails/update/:email_id
- É necessário ter um token
- Exemplo do corpo da requisição:

```json
{
  "email": "novoEmail@gmail.com"
}
```

3- Deleção de Email

- DELETE /emails/delete/:email_id
- É necessário ter um token
- Não é necessário um corpo da requisição

## **Rotas de Telefones:**

1- Criação de Telefones para contatos ou usuários

- POST /phones/create/:owner_id
- É necessário ter um token
- Exemplo do corpo da requisição:

```json
{
  "phones": ["21994607592", "21945013845"]
}
```

2- Atualização de Telefone

- PATCH /phones/update/:phone_id
- É necessário ter um token
- Exemplo do corpo da requisição:

```json
{
  "phone":"21991800000"
}
```

3- Deleção de Telefone

- DELETE /phones/delete/:phone_id
- É necessário ter um token
- Não é necessário um corpo da requisição
