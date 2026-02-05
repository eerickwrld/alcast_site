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
{{--                        <img src="https://www.alcast.com.br/logo.png" alt="ALCAST" style="height:40px;">--}}
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
                        <p><strong>Nome:</strong> {{ $userData['primeiroNome'] }} {{ $userData['sobreNome'] }}</p>
                        <p><strong>Email:</strong> {{ $userData['email'] }}</p>
                        <p><strong>Telefone:</strong> {{ $userData['telefone'] }}</p>
                        <p><strong>Empresa:</strong> {{ $userData['empresa'] }}</p>
                        <p><strong>Segmento:</strong> {{ $userData['segmento'] }}</p>
                        <p><strong>Localização:</strong> {{ $userData['uf'] }} - {{ $userData['pais'] }}</p>
                    </td>
                </tr>

                <!-- Produtos -->
                <tr>
                    <td style="padding:20px 30px;">
                        <h3 style="margin-bottom:10px; color:#0d47a1;">Produtos solicitados</h3>
                        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                            <thead>
                            <tr style="background-color:#e3f2fd; text-align:left;">
                                <th style="border:1px solid #ddd;">Produto</th>
                                <th style="border:1px solid #ddd;">Espessura</th>
                                <th style="border:1px solid #ddd;">Largura</th>
                                <th style="border:1px solid #ddd;">Ligas</th>
                                <th style="border:1px solid #ddd;">Têmperas</th>
                                <th style="border:1px solid #ddd;">Quantidade</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($items as $item)
                                <tr>
                                    <td style="border:1px solid #ddd;">{{ ucfirst($item['produto']) }}</td>
                                    <td style="border:1px solid #ddd;">{{ $item['properties']['espessura'] }}</td>
                                    <td style="border:1px solid #ddd;">{{ $item['properties']['largura'] }}</td>
                                    <td style="border:1px solid #ddd;">{{ $item['properties']['ligas'] }}</td>
                                    <td style="border:1px solid #ddd;">{{ $item['properties']['temperas'] }}</td>
                                    <td style="border:1px solid #ddd;">{{ $item['quantity'] }}</td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </td>
                </tr>

                <!-- Rodapé -->
                <tr>
                    <td style="padding:20px; text-align:center; background-color:#f4f6f8; color:#555;">
                        <p style="margin:0;">Em breve nossa equipe entrará em contato com mais detalhes sobre seu orçamento.</p>
                        <p style="margin:5px 0 0;">Atenciosamente, <br> <strong>Equipe ALCAST</strong></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
