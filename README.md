# 🧠 Sistema de Gerenciamento de Eventos (Event Management System)

O Sistema de Gerenciamento de Eventos é uma aplicação abrangente desenvolvida para gerenciar eventos, usuários e tarefas administrativas. Ele oferece uma plataforma robusta para operações de CRUD (Criar, Ler, Atualizar e Excluir) de eventos, contas de usuários e administradores. O sistema foi construído com Java e utiliza Spring Boot, Spring Security e Spring Data JPA para uma camada de acesso a dados segura e eficiente.

## 🚀 Funcionalidades
- **Gerenciamento de Eventos**: Criar, ler, atualizar e excluir eventos.
- **Gerenciamento de Usuários**: Criar, ler, atualizar e excluir contas de usuários.
- **Gerenciamento de Administradores**: Criar, ler, atualizar e excluir contas administrativas.
- **Autenticação e Autorização**: Login e registro seguros usando JSON Web Tokens (JWT).
- **Controle de Acesso Baseado em Funções (RBAC)**: Restrição de acesso a determinadas funcionalidades com base nas funções do usuário.
- **Validação e Sanitização de Dados**: Garantia da integridade e segurança dos dados.

## 🛠️ Tecnologias Utilizadas
- **Backend**: Java, Spring Boot, Spring Security, Spring Data JPA
- **Banco de Dados**: Sistema de gerenciamento de banco de dados relacional (ex: MySQL, PostgreSQL)
- **Segurança**: JSON Web Tokens (JWT), OAuth
- **Ferramenta de Build**: Maven ou Gradle
- **Dependências**: Spring Web, Spring Data JPA, Spring Security, JJWT, etc.

## 📦 Instalação
### Pré-requisitos
- Java Development Kit (JDK) 11 ou superior
- Maven ou Gradle
- Sistema de banco de dados relacional (ex: MySQL, PostgreSQL)

### Instruções de Configuração
1. Clone o repositório: `git clone https://github.com/seu-repo/event-management-system.git`
2. Navegue até o diretório do projeto: `cd event-management-system`
3. Compile o projeto usando Maven ou Gradle: `mvn clean install` ou `gradle build`
4. Crie o esquema do banco de dados: `mysql -u seu_usuario -p seu_banco < schema.sql`
5. Configure as propriedades da aplicação: `application.properties` ou `application.yml`
6. Execute a aplicação: `java -jar target/event-management-system.jar`

## 💻 Como Usar
1. Inicie a aplicação: `java -jar target/event-management-system.jar`
2. Acesse a aplicação: `http://localhost:8080`
3. Registre um novo usuário: `http://localhost:8080/register`
4. Faça login na aplicação: `http://localhost:8080/login`
5. Crie um novo evento: `http://localhost:8080/events`

## 📂 Estrutura do Projeto
```markdown
event-management-system
├── src
│   ├── main
│   │   ├── java
│   │   │   ├── com
│   │   │   │   ├── event
│   │   │   │   │   ├── EventoController.java
│   │   │   │   │   ├── EventoService.java
│   │   │   │   │   ├── EventoRepository.java
│   │   │   │   ├── user
│   │   │   │   │   ├── UsuarioController.java
│   │   │   │   │   ├── UsuarioService.java
│   │   │   │   │   ├── UsuarioRepository.java
│   │   │   │   ├── security
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── JwtUtil.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── UsuarioDetailsService.java
│   │   ├── resources
│   │   │   │   ├── application.properties
│   │   │   │   ├── schema.sql
│   │   ├── test
│   │   │   ├── java
│   │   │   │   ├── com
│   │   │   │   │   ├── event
│   │   │   │   │   │   ├── EventoControllerTest.java
│   │   │   │   │   │   ├── EventoServiceTest.java
│   │   │   │   │   │   ├── EventoRepositoryTest.java
│   │   │   │   │   ├── user
│   │   │   │   │   │   ├── UsuarioControllerTest.java
│   │   │   │   │   │   ├── UsuarioServiceTest.java
│   │   │   │   │   │   ├── UsuarioRepositoryTest.java
│   │   │   │   │   ├── security
│   │   │   │   │   │   ├── SecurityConfigTest.java
│   │   │   │   │   │   ├── JwtUtilTest.java
│   │   │   │   │   │   ├── JwtAuthenticationFilterTest.java
│   │   │   │   │   │   ├── UsuarioDetailsServiceTest.java
│   ├── target
│   │   ├── event-management-system.jar
│   ├── pom.xml
