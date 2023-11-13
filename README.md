**Documentação para execução da aplicação Laravel localmente**

**Requisitos**

-   PHP 8.1+
-   Composer
-   PostgreSQL (Opcional)

**Configurações de ambiente**

Copie o arquivo `.env.example` na raiz do projeto, renomeie para `.env` e altere as seguintes configurações:

```
APP_DEBUG=false
DB_CONNECTION=pgsql
DB_HOST=ep-lively-field-15237453.us-east-2.aws.neon.tech
DB_PORT=5432
DB_DATABASE=ultralims
DB_USERNAME=ultralims
DB_PASSWORD=
```

**Passo a passo**

1. Instale as dependências do projeto:

```
composer install
npm install
```

2. Migre o banco de dados(Opcional):

```
php artisan migrate
```

3. Execute a aplicação:

```
php artisan serve
npm run dev
```

**Arquivos modificados**

Os seguintes arquivos foram modificados/criados:

-   **Backend:**
    -   `app/Exceptions/*`
    -   `app/Http/AddressController.php`
    -   `app/Models/Address.php`
    -   `routes/api.php`
-   **Frontend:**
    -   `public/js/*`
    -   `resources/css/app.css`
    -   `resources/views/home.blade.php`

**Conteúdo dos arquivos**

-   **`app/Exceptions/*`:** Exceções personalizadas.
-   **`app/Http/AddressController.php`:** Métodos chamados pelas rotas que manipulam o banco de dados.
-   **`app/Models/Address.php`:** Entidade que representa o endereço.
-   **`routes/api.php`:** Rotas expostas pela API para o frontend buscar os endereços salvos e salvar novos endereços.
-   **`public/js/*`:** Toda a lógica do frontend para buscar o CEP, buscar e salvar endereços, etc.
-   **`resources/css/app.css`:** Estilos da home page.
-   **`resources/views/home.blade.php`:** Código HTML da home page.

**Observações**

-   Caso prefira, poderá usar os dados do banco de dados que enviei por e-mail.
