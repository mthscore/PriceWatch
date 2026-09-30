#encontra qual resultado possui o menor preço
def encontrar_menor_preco(resultados):

    #procura o menor preço dentro dos resultados
    menor = min(resultados, key=lambda item: item["Preço"])

    #retorna o resultado completo da loja mais barata
    return menor

#calcula a porcentagem de variação dos preços
def calcular_variacao(preco_anterior, preco_atual):

    #calcula quanto o preço mudou em relação ao preço anterior
    variacao = ((preco_atual - preco_anterior) / preco_anterior) * 100

    #retorna a porcentagem calculada
    return variacao

#calcula a média dos preços encontrados
def calcular_media_precos(resultados):

    #começa a soma dos preços com zero
    total = 0

    #análisa todos os resultados encontrados
    for resultado in resultados:

        #adiciona o preço atual
        total = total + resultado["Preço"]

    #divide o total de acordo com a quantidade de resultados
    media = total / len(resultados)

    #retorna a média
    return media

#organiza os principais dados encontrados
def preparar_resumo(resultados, preco_anterior=None):

    #encontra o menor preço
    menor = encontrar_menor_preco(resultados)

    #calcula a média dos preços
    media = calcular_media_precos(resultados)

    #cria um resumo as informações
    resumo = {
        "menor_preco": menor["Preço"],
        "loja_menor_preco": menor["Loja"],
        "url_menor_preco": menor["Url"],
        "quantidade_resultados": len(resultados),
        "preco_medio": media
    }

    #verifica se existe um preço anterior
    if preco_anterior is not None:

        #calcula a variação do anterior para o atual
        variacao = calcular_variacao(
            preco_anterior,
            menor["Preço"]
        )

        #adiciona ao resumo
        resumo["variacao"] = variacao

    #retorna o resumo por completo
    return resumo

#essa parte só roda quando executamos diretamente o arquivo da logica.py
if __name__ == "__main__":

    #dados teste
    resultados = [
        {
            "Loja": "Mercado Livre",
            "Preço": 429.90,
            "Url": "https://mercadolivre.com.br"
        },
        {
            "Loja": "Amazon",
            "Preço": 379.90,
            "Url": "https://amazon.com.br"
        },
        {
            "Loja": "KaBuM",
            "Preço": 399.90,
            "Url": "https://kabum.com.br"
        }
    ]

    #simula o preço encontrado anteriormente
    preco_anterior = 359.90

    #começa a preparar o resumo dos resultados
    resumo = preparar_resumo(
        resultados,
        preco_anterior
    )

    print("PriceWatch - Resumo")
    print()

    #mostra os preços encontrados (iinseridos manualmente por enquanto)
    print("Preços localizados:")

    for resultado in resultados:

        print(
            resultado["Loja"],
            "- R$",
            resultado["Preço"]
        )

    print()

    #mostra o menor preço
    print(
        "Menor preço: R$",
        resumo["menor_preco"]
    )

    #mostra a loja com menor preço
    print(
        "Loja:",
        resumo["loja_menor_preco"]
    )

    #mostra o link de acesso
    print(
        "Link:",
        resumo["url_menor_preco"]
    )

    #mostra a quantidade de resultados
    print(
        "Quantidade de resultados:",
        resumo["quantidade_resultados"]
    )

    #mostra a média dos preços
    print(
        "Preço médio: R$",
        round(resumo["preco_medio"], 2)
    )

    #verifica se a variação foi calculada
    if "variacao" in resumo:

        print(
            "Variação:",
            round(resumo["variacao"], 2),
            "%"
        )