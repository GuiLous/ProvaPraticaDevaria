# ProvaPraticaDevaria
Sistema simples de módulos e aulas

================== Instruções ====================

Obs: Todos os comandos são sem aspas("). Exemplo: "npm install" vc digital npm install (sem as aspas).

###(Backend Api REST)
  PostegresSql com TypeOrm e migrations
  
-> Necessário ter o Nodejs com npm.
  *link 
    Node com npm> https://nodejs.org/en/download/
-> Necessário ter o Yarn instalado.
   *Como instalar mais abaixo.
-> Necessário PostgresSql instalado.
  *link
    PostgresSql https://www.postgresql.org/download/

1° Após clonar o projeto, abra o arquivo backend e rode o comando "npm install" para instalar todas as dependências.
2° Para instalar o Yanr rode o comando "npm install --global yarn"
3° Com o banco de dados Postgres instalado, crie um banco de dados com o nome "modulos_aulas".
4° Configure o arquivo "ormconfig.json" na raiz da pasta backend. Onde tem: 
   ("port": 5432), altere o número para a porta onde seu postgres roda (por padrão vem 5432).
   ("username": "postgres"), o seu username no postgres (por padrão vem postgres). 
   ("password": "teste"), a senha do seu postgres (caso não tenha senha deixe em branco "teste" => "").
   ("database": "modulos_aulas"), o nome do banco que será utilizado, nesse caso "modulos_aulas".
6° Após todas as dependências instaladas e o banco devidamente configurado, rode o comando "yarn typeorm migration:run" para criar as Entidades no banco.
7 Por fim, rode "yarn dev:server" dentro da pasta "backend" para startar o servidor backend(api).

###(Frontend)
  ->Informações úteis
    *Login administrativo padrão: "teste@gmail.com"
    *Senha padrão: "teste"

1° Abra o arquivo frontend e rode o comando "npm install" para instalar todas dependências.
2° Com o servidor banckend rodando, dentro da pasta frontend, rode o comando "yarn start" para startar localmente o sistema
   (uma janela no navegador será aberta. Pode demorar alguns segundos).
  
  
  

