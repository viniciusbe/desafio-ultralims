<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Buscador de CEP</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/zipCodeInput.js') }}"></script>
    <script src="{{ asset('js/fetchZipCode.js') }}"></script>
    <script src="{{ asset('js/saveAddress.js') }}"></script>
    <script src="{{ asset('js/updateTable.js') }}"></script>
    <script src="{{ asset('js/orderData.js') }}"></script>
</head>

<body class="antialiased">
    <main class="content">
        <div id="input_container">
            <label for="zipCode">Informe o CEP que deseja buscar:</label>
            <div>
                <input id="zip_code_input" type="text" maxlength="9" name="zipCode" placeholder="89220-750" onkeyup="handleZipCode(event)" />
                <span id="fetch_status" class="status_message"></span>
            </div>
        </div>

        <div id="address">
            <p>CEP:<span id="fetched_zip_code"> </span></p>
            <p class="two-fields">
                Rua:<span id="fetched_street"> </span>
                Complemento: <span class="fit" id="fetched_complement"> </span>
            </p>
            <p>Bairro:<span id="fetched_neighborhood"> </span></p>
            <p class="two-fields">
                Cidade:<span id="fetched_city"> </span>
                UF:<span class="fit" id="fetched_state"> </span>
            </p>

            <div id="save_button_container">
                <button id="save_button" class="button" disabled onclick="saveAddress()">Salvar</button>
                <span id="save_status" class="status_message"></span>
            </div>
        </div>


        <div id="table_container">
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
                    <tr>
                        <td colspan="6">
                            Carregando...
                        </td>
                    </tr>
                </tbody>
            </table>
    </main>
</body>

</html>