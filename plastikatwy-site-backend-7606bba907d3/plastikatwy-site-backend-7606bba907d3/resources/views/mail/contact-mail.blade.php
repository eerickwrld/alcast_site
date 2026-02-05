<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Contato - ALCAST</title>
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
                        <h2 style="margin:0; color:#0d47a1;">Novo contato recebido</h2>
                        <p style="color:#555; margin-top:10px;">Um visitante enviou uma mensagem através do site.</p>
                    </td>
                </tr>

                <!-- Dados do contato -->
                <tr>
                    <td style="padding:20px 30px;">
                        <h3 style="margin-bottom:10px; color:#0d47a1;">Detalhes do contato</h3>
                        <p><strong>Nome:</strong> {{ $data['name'] }}</p>
                        <p><strong>Email:</strong> {{ $data['email'] }}</p>
                        <p><strong>Telefone:</strong> {{ $data['phone'] }}</p>
                        <p><strong>Setor de interesse:</strong> {{ ucfirst($data['sector']) }}</p>
                        <p><strong>Receber newsletter:</strong> {{ $data['newsletter'] == 'yes' ? 'Sim' : 'Não' }}</p>
                    </td>
                </tr>

                <!-- Mensagem -->
                <tr>
                    <td style="padding:20px 30px;">
                        <h3 style="margin-bottom:10px; color:#0d47a1;">Mensagem</h3>
                        <div style="background:#f9f9f9; border:1px solid #ddd; border-radius:5px; padding:15px; color:#333;">
                            {{ $data['message'] }}
                        </div>
                    </td>
                </tr>

                <!-- Rodapé -->
                <tr>
                    <td style="padding:20px; text-align:center; background-color:#f4f6f8; color:#555;">
                        <p style="margin:0;">Este é um e-mail automático gerado pelo site da <strong>ALCAST</strong>.</p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>
</body>
</html>
