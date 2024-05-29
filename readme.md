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
    npm run test:unit

    docker compose up database -d

    #definir a variavel DB_HOST como 'localhost'
    npm run test:e2e
```