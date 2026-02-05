<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Orçamento - ALCAST</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 20px 0;">
    <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                    <td style="background-color:#0d47a1; padding:20px; text-align:center;">
{{--                        <img src="{{ asset('images/logo-white.svg') }}" alt="ALCAST" style="height:40px;">--}}
                        <p style="color:#fff; font-size:24px; margin-top:10px;">ALCAST</p>
                    </td>
                </tr>

                <!-- Título -->
                <tr>
                    <td style="padding:30px; text-align:center;">
                        <h2 style="margin:0; color:#0d47a1;">Orçamento solicitado</h2>
                        <p style="color:#555; margin-top:10px;">Segue abaixo o resumo da sua solicitação de orçamento.</p>
                    </td>
                </tr>

                <!-- Dados do cliente -->
                <tr>
                    <td style="padding:20px 30px;">
                        <h3 style="margin-bottom:10px; color:#0d47a1;">Dados do cliente</h3>
                        <p><strong style="color: #383737">Nome:</strong> {{ $userData['primeiroNome'] }} {{ $userData['sobreNome'] }}</p>
                        <p><strong style="color: #383737">Email:</strong> {{ $userData['email'] }}</p>
                        <p><strong style="color: #383737">Telefone:</strong> {{ $userData['telefone'] }}</p>
                        <p><strong style="color: #383737">Empresa:</strong> {{ $userData['empresa'] }}</p>
                        <p><strong style="color: #383737">Segmento:</strong> {{ $userData['segmento'] }}</p>
                        <p><strong style="color: #383737">Localização:</strong> {{ $userData['uf'] }} - {{ $userData['pais'] }}</p>

                        @if(data_get($userData, 'lgpdConsent', null))
                            <p>✅ Autorizo o uso dos meus dados para receber comunicações.</p>
                        @endif
                    </td>
                </tr>

                <!-- Produtos -->
                <tr>
                    <td style="padding:20px 30px;">
                        <h3 style="margin-bottom:15px; color:#0d47a1;">Produtos solicitados</h3>

                        @foreach($items as $item)
                            <div style="border:1px solid #ddd; box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.36); border-radius:8px; padding:15px; margin-bottom:15px; background-color:#ffffff;">
                                <p style="margin:0 0 8px 0;">
                                    <strong>Produto:</strong> {{ ucfirst($item['produto']) }}
                                </p>
                                <p style="margin:0 0 8px 0;">
                                    <strong>Quantidade:</strong> {{ $item['quantity'] }}
                                </p>
                                <p style="margin:0;">
                                    <strong>Propriedades:</strong><br>
                                    @foreach($item['properties'] as $key => $value)
                                        <span style="display:block; margin-left:10px;">- {{ ucfirst($key) }}: {{ $value }}</span>
                                    @endforeach
                                </p>
                            </div>
                        @endforeach

                    </td>
                </tr>

                <!-- Rodapé -->
                <tr>
                    <td style="padding:20px; text-align:center; background-color:#f4f6f8; color:#555;">
                        <p style="margin:5px 0 0;"><strong>ALCAST</strong></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
