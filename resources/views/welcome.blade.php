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
                <p>CEP: </p> <span id="cep"></span>
            </div>
            <div>
                <p>Logradouro: </p> <span id="logradouro"></span>
            </div>
            <div>
                <p>Complemento: </p> <span id="complemento"></span>
            </div>
            <div>
                <p>Bairro: </p> <span id="bairro"></span>
            </div>
            <div>
                <p>Localidade: </p> <span id="localidade"></span>
            </div>
            <div>
                <p>UF: </p> <span id="uf"></span>
            </div>
        </div>
        <button class="button" onclick="salvarEndereco()">Salvar</button>
        <table>
            <thead>
                <tr>
                    <th>CEP </th>
                    <th>Logradouro</th>
                    <th>Complemento</th>
                    <th class="sortable" id="neighborhood" onclick="orderByColumn(event)">
                        Bairro
                        <img class="arrows arrow_disabled" src="{{ asset('arrow-up.svg') }}" alt="">
                        <img class="arrows arrow_hidden" src="{{ asset('arrow-down.svg') }}" alt="">
                    </th>
                    <th class="sortable" id="city" onclick="orderByColumn(event)">
                        Cidade
                        <img class="arrows arrow_disabled" src="{{ asset('arrow-up.svg') }}" alt="">
                        <img class="arrows arrow_hidden" src="{{ asset('arrow-down.svg') }}" alt="">
                    </th>
                    <th class="sortable" id="state" onclick="orderByColumn(event)">
                        UF
                        <img class="arrows arrow_disabled" src="{{ asset('arrow-up.svg') }}" alt="">
                        <img class="arrows arrow_hidden" src="{{ asset('arrow-down.svg') }}" alt="">
                    </th>
                </tr>
            </thead>
            <tbody id="testBody">
                @foreach ($data as $adress)
                <tr>
                    <td>{{$adress->cep}}</td>
                    <td>{{$adress->logradouro}}</td>
                    <td>{{$adress->complemento}}</td>
                    <td>{{$adress->bairro}}</td>
                    <td>{{$adress->localidade}}</td>
                    <td>{{$adress->uf}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

    </main>
</body>

</html>