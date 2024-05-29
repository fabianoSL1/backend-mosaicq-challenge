## Ambiente

### Docker
```bash
    sudo docker compose build --no-cache api
    sudo docker compose up
```

### Sem docker
```bash
    cp .env.example .env
    # editar o .env

    export $(cat .env | xargs)

    npm install
    npm run init
    npm run dev
```

## testes
```bash
    npm run build
    
    npm run test:unit

    docker compose up database -d

    #definir a variavel DB_HOST como 'localhost'
    npm run test:e2e
```

## Decisões
Existe o middleware ExceptionsMiddlare que captura todas as exceções que ocorrem durante a aplicação.

É tratada duas exceções de foram especifica.
- ZodError: esse erro é lançada na validação dos Dtos
- HttpException: uma exception que precisa de um status code e uma mensagem

Caso precise mudar de banco de dados ou utilizar um Orm basta implementar outra classe com TodoRepository e alterar a instancia no TodoService.
[](/doc/diagrama.png)

Os recursos podem ser protegidos pelo AuthMiidlleware.

Para obter um token basta realizar POST /auth.
[](/doc/fluxo_de_dados.png)