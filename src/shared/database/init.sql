
--create database MATRICULAS_DB
--DDL - DATA DEFINITION LANGUAGE (LINGUAGEM DE DEFINICAÇÃO DE DADOS) - DEFINE E MANIPULA A ESTRUTUDA DAS TABELAS - CRIAR, MODIFICAR OU DELETAR

-- criando uma tabela
create table Alunos (
	id INT generated always as identity PRIMARY key,
	nome varchar not null,
	cpf varchar not null,
	data_nascimento date not null,
	telefone varchar not null,
	sexo char not null,
	email varchar not null,
	escolaridade varchar not null,
	renda decimal not null,
	pcd boolean not null
);

/*
*Tabela Cursos
*/
create table cursos (
	id INT generated always as identity PRIMARY key,
	nome varchar not null,
	carga_horaria int not null,
	valor decimal not null,
	conteudo varchar not null,
	codigo_curso varchar not null,
	data_publicado timestamp not null,
	area_conhecimento varchar not null,
	ativo boolean not null
);

/*
* Tabela Instrutores
*/
create table instrutores (
	id INT generated always as identity PRIMARY key,
	nome varchar not null,
	cpf varchar not null,
	data_nascimento date not null,
	matricula varchar not null,
	sexo char not null,
	email varchar not null,
	data_admissao date not null,
	data_desligamento date
);

/*
* Tabela Turmas
*/
create table turmas (
	id INT generated always as identity PRIMARY key,
	codigo_turma varchar not null,
	carga_horaria int not null,
	valor decimal not null,
	vagas int not null,
	data_inicio timestamp,
	curso_id int not null,
	instrutor_id int not null,
	foreign key (curso_id)
	references cursos (id)
	on update cascade,
	foreign key (instrutor_id)
	references instrutores (id)
	on update cascade
);

/*
* Tabela Matriculas
*/
create table matriculas(
	id INT generated always as identity PRIMARY key,
	aluno_id int not null,
	turma_id int not null,
	ativo boolean not null default true,
	foreign key (aluno_id)
	references alunos (id)
	on update cascade,
	foreign key (turma_id)
	references turmas (id)
	on update cascade,
	-- constraint, do inglês, restrição
	constraint unq_aluno_turma unique (aluno_id, turma_id)
);

-- Alter table - Incluir o campo CPF
alter table alunos
add column responsavel_legal varchar,
add constraint unq_cpf unique (cpf);
