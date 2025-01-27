# HeavenFood

HeavenFood é uma aplicação web para descobrir e compartilhar receitas deliciosas e saudáveis. A aplicação permite que os usuários explorem receitas, adicionem receitas aos favoritos, visualizem detalhes das receitas e gerenciem suas contas.

## Estrutura do Projeto
.gitignore
Client/
    assets/
    css/
    html/
    js/
package.json
Server/
    config/
    controllers/
    models/
    routes/
    services/
    server.js
SQL/
    createDatabase.sql
## Api Externa

Este projeto utiliza a API externa [The Meal DB](https://www.themealdb.com/api.php), que fornece informações detalhadas sobre receitas de alimentos. A API permite acessar dados como ingredientes, instruções de preparo e categorias de pratos, ajudando a enriquecer a experiência do usuário ao oferecer uma ampla variedade de receitas diretamente integradas à aplicação.
    
## Instalação

1. Clone o repositório:

```sh
git clone https://github.com/seu-usuario/heavenfood.git

```
2. Navegue até o diretório do projeto:
 ```  
cd heavenfood
```

3.Instale as dependências:
 ```  
npm install
```

4.Configure o banco de dados:
* Crie o banco de dados executando o script SQL em \SQL\createDatabase.sql.

5. Acesse o diretório do servidor:
```
   cd heavenfood
```
6. Inicie o Servidor
 ```  
node server.js
```
## Estrutura de Diretórios
### Client
* `assets/`: Contém imagens e outros arquivos estáticos.
* `css/`: Contém arquivos CSS para estilização das páginas.
* `html/`: Contém arquivos HTML para as páginas da aplicação.
* `js/`: Contém arquivos JavaScript para a lógica do lado do cliente.

### Server

* `config/`: Contém arquivos de configuração, como a conexão com o banco de dados.
* `controllers/`: Contém os controladores que lidam com as requisições HTTP.
* `models/`: Contém os modelos que interagem com o banco de dados.
* `routes/`: Contém as definições de rotas da aplicação.
* `services/`: Contém a lógica de negócios da aplicação.
* `\server.js`: Arquivo principal do servidor Express.

### SQL
* `\SQL\createDatabase.sql`: Script SQL para criar e configurar a base de dados.

## Funcionalidades
### Usuários
* Cadastro de novos usuários.
* Login e logout de usuários.
* Verificação de sessão de usuário.
### Receitas
* Listagem de todas as receitas.
* Pesquisa de receitas por nome.
* Visualização de detalhes de uma receita.
* Adição e remoção de receitas dos favoritos.
* Importação de receitas de uma API externa.
### Favoritos
* Adição de receitas aos favoritos.
* Remoção de receitas dos favoritos.
* Listagem de receitas favoritadas por um usuário.
  
## Rotas da API

### Autenticação
* `POST /auth/signup`: Cadastro de novo usuário.
* `POST /auth/login`: Login de usuário.
* `POST /auth/logout`: Logout de usuário.
* `GET /auth/session`: Verificação de sessão de usuário.

### Receitas
* `GET /recipes/api/highlight`: Listagem de receitas em destaque.
* `GET /recipes/api/all`: Listagem de todas as receitas.
* `GET /recipes/api/search/:nome`: Pesquisa de receitas por nome.
* `GET /recipes/api/categories`: Listagem de todas as categorias.
* `GET /recipes/api/categories/:id`: Listagem de receitas por categoria.
* `GET /recipes/api/:id`: Detalhes de uma receita.

### Favoritos
* `POST /favorites/add`: Adição de receita aos favoritos.
* `DELETE /favorites/remove`: Remoção de receita dos favoritos.
* `GET /favorites/:utilizador_id`: Listagem de receitas favoritadas por um usuário.

### Importação de Receitas
* `GET /import/data`: Importação de receitas da API externa.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.


## Autores:
* @[jonathan-osorio](https://github.com/jonathan-osorio) 
* @[pedro-cruz](https>//github.com/pmzpro)

