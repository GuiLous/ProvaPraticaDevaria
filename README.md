# ProvaPraticaDevaria
Sistema simples de módulos e aulas

================== Instruções ====================

Obs: Todos os comandos são sem aspas("). Exemplo: "npm install" vc digital npm install (sem as aspas).
<br/>

###(Backend Api REST)
  PostegresSql com TypeOrm e migrations
  
-> Necessário ter o Nodejs com npm.
  <br/>
  *link
  <br/>
    Node com npm> https://nodejs.org/en/download/
    <br/>
-> Necessário ter o Yarn instalado.
   <br/>
   *Como instalar mais abaixo.
   <br/>
-> Necessário PostgresSql instalado.
  <br/>
  *link
  <br/>
    PostgresSql https://www.postgresql.org/download/

<br/>
1° Após clonar o projeto, abra o arquivo backend e rode o comando "npm install" para instalar todas as dependências.
<br/>
2° Para instalar o Yanr rode o comando "npm install --global yarn"
<br/>
3° Com o banco de dados Postgres instalado, crie um banco de dados com o nome "modulos_aulas".
<br/>
4° Configure o arquivo "ormconfig.json" na raiz da pasta backend. Onde tem: 
   <br/>
   ("port": 5432), altere o número para a porta onde seu postgres roda (por padrão vem 5432).
   <br/>
   ("username": "postgres"), o seu username no postgres (por padrão vem postgres). 
   <br/>
   ("password": "teste"), a senha do seu postgres (caso não tenha senha deixe em branco "teste" => "").
   <br/>
   ("database": "modulos_aulas"), o nome do banco que será utilizado, nesse caso "modulos_aulas".
<br/>
6° Após todas as dependências instaladas e o banco devidamente configurado, rode o comando "yarn typeorm migration:run" para criar as Entidades no banco.
<br/>
7° Por fim, rode "yarn dev:server" dentro da pasta "backend" para startar o servidor backend(api).

<br/>
<br/>
<br/>
###(Frontend)
  <br/>
  ->Informações úteis
    <br/>
    *Login administrativo padrão: "teste@gmail.com"
    <br/>
    *Senha padrão: "teste"

<br/>
1° Abra o arquivo frontend e rode o comando "npm install" para instalar todas dependências.
<br/>
2° Com o servidor banckend rodando, dentro da pasta frontend, rode o comando "yarn start" para startar localmente o sistema
   <br/>
   (uma janela no navegador será aberta. Pode demorar alguns segundos).
  
  
  

