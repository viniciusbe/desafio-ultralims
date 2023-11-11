<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="{{ asset('js/service.js') }}"></script>
    <script src="{{ asset('js/updateTable.js') }}"></script>
    <script src="{{ asset('js/fetchZipCode.js') }}"></script>
    <script src="{{ asset('js/zipCodeInput.js') }}"></script>
</head>

<body class="antialiased">
    <main class="content">
        <div class="field">
            <label for="cep">Informe o CEP que deseja buscar:</label>
            <input id="cep_input" type="text" maxlength="9" name="cep" placeholder="89220-750" onkeyup="handleZipCode(event)" />
            <span id="status"></span>
        </div>
        <div class="adress">
            <div>
                <p>CEP: </p> <span id="fetched_zip_code"></span>
            </div>
            <div>
                <p>Rua: </p> <span id="fetched_street"></span>
            </div>
            <div>
                <p>Complemento: </p> <span id="fetched_complement"></span>
            </div>
            <div>
                <p>Bairro: </p> <span id="fetched_neighborhood"></span>
            </div>
            <div>
                <p>Cidade: </p> <span id="fetched_city"></span>
            </div>
            <div>
                <p>UF: </p> <span id="fetched_state"></span>
            </div>
        </div>
        <button class="button" onclick="saveAddress()">Salvar</button>
        <table>
            <thead>
                <tr>
                    <th>CEP </th>
                    <th>Rua</th>
                    <th>Complemento</th>
                    <th class="sortable" id="neighborhood" onclick="handleOrderBy(event)">
                        Bairro
                        <img class="arrows arrow_disabled" src="{{ asset('arrow-up.svg') }}" alt="">
                        <img class="arrows arrow_hidden" src="{{ asset('arrow-down.svg') }}" alt="">
                    </th>
                    <th class="sortable" id="city" onclick="handleOrderBy(event)">
                        Cidade
                        <img class="arrows arrow_disabled" src="{{ asset('arrow-up.svg') }}" alt="">
                        <img class="arrows arrow_hidden" src="{{ asset('arrow-down.svg') }}" alt="">
                    </th>
                    <th class="sortable" id="state" onclick="handleOrderBy(event)">
                        UF
                        <img class="arrows arrow_disabled" src="{{ asset('arrow-up.svg') }}" alt="">
                        <img class="arrows arrow_hidden" src="{{ asset('arrow-down.svg') }}" alt="">
                    </th>
                </tr>
            </thead>
            <tbody id="table_body">

            </tbody>
        </table>

    </main>
</body>

</html>