
# encontra o menor preço
def encontrar_menor_preco(resultados):

    if not resultados:
        return None

    menor = resultados[0]

    for resultado in resultados:

        if resultado["Preço"] < menor["Preço"]:
            menor = resultado

    return menor


# calcula a média dos preços
def calcular_media_precos(resultados):

    if not resultados:
        return None

    total = 0

    for resultado in resultados:
        total = total + resultado["Preço"]

    media = total / len(resultados)

    return media


# calcula a variação do preço
def calcular_variacao(preco_anterior, preco_atual):

    if preco_anterior == 0:
        return None

    variacao = ((preco_atual - preco_anterior) / preco_anterior) * 100

    return variacao
