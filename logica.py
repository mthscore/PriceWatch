# encontra o menor preço
def encontrar_menor_preco(resultados):

    menor = resultados[0]

    for resultado in resultados:

        if resultado["Preço"] < menor["Preço"]:
            menor = resultado

    return menor


# calcula a média dos preços
def calcular_media_precos(resultados):

    total = 0

    for resultado in resultados:

        total = total + resultado["Preço"]

    media = total / len(resultados)

    return media


# calcula a variação do preço
def calcular_variacao(preco_anterior, preco_atual):

    variacao = ((preco_atual - preco_anterior) / preco_anterior) * 100

    return variacao


# dados de teste
resultados = [
    {
        "Loja": "Mercado Livre",
        "Preço": 429.90,
        "Url": "https://www.mercadolivre.com.br"
    },
    {
        "Loja": "Amazon",
        "Preço": 379.90,
        "Url": "https://www.amazon.com.br"
    },
    {
        "Loja": "KaBuM",
        "Preço": 399.90,
        "Url": "https://www.kabum.com.br"
    }
]


# preço encontrado anteriormente
preco_anterior = 359.90


# encontra o menor preço
menor = encontrar_menor_preco(resultados)

# calcula a média
media = calcular_media_precos(resultados)

# calcula a variação
variacao = calcular_variacao(
    preco_anterior,
    menor["Preço"]
)


print("PriceWatch")
print()

print("Preços encontrados:")

for resultado in resultados:

    print(
        resultado["Loja"],
        "- R$",
        resultado["Preço"],
        "-",
        resultado["Url"]
    )

print()

print("Menor preço:", menor["Preço"])
print("Loja:", menor["Loja"])
print("Link:", menor["Url"])
print("Preço médio:", round(media, 2))
print("Variação:", round(variacao, 2), "%")