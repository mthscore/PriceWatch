
import mariadb


# estabelece conexão com o banco de dados
def conectar():

    try:
        conexao = mariadb.connect(
            user="root",
            password="4127",
            host="localhost",
            port=3306,
            database="PriceWatch"
        )

        return conexao

    except mariadb.Error as erro:
        print(f"Erro ao conectar ao banco: {erro}")
        raise


# lista os produtos cadastrados
def listar_produtos():

    conexao = conectar()

    try:
        cursor = conexao.cursor()

        cursor.execute("""
            SELECT
                id_produto,
                nome_produto,
                modelo_produto,
                marca_produto,
                armazenamento,
                cor,
                id_categoria
            FROM Produtos
        """)

        colunas = [coluna[0] for coluna in cursor.description]

        produtos = [
            dict(zip(colunas, linha))
            for linha in cursor.fetchall()
        ]

        return produtos

    except mariadb.Error as erro:
        print(f"Erro ao consultar produtos: {erro}")
        raise

    finally:
        conexao.close()



# lista o histórico de preços dos produtos e suas respectivas lojas
def listar_historico_precos():

    conexao = conectar()

    try:
        cursor = conexao.cursor()

        cursor.execute("""
            SELECT
                Historico_Preco.id_historico,
                Historico_Preco.id_produto,
                Historico_Preco.preco_obtido,
                Historico_Preco.historico_dataehora,
                Loja.nome_loja
            FROM Historico_Preco
            INNER JOIN Loja
                ON Historico_Preco.id_loja = Loja.id_loja
            ORDER BY Historico_Preco.historico_dataehora DESC
        """)

        colunas = [coluna[0] for coluna in cursor.description]

        historico = []

        for linha in cursor.fetchall():
            registro = dict(zip(colunas, linha))

            # Converte os valores para formatos aceitos pelo JSON
            registro["preco_obtido"] = float(registro["preco_obtido"])
            registro["historico_dataehora"] = str(registro["historico_dataehora"])

            historico.append(registro)

        return historico

    except mariadb.Error as erro:
        print(f"Erro ao consultar histórico de preços: {erro}")
        raise

    finally:
        conexao.close()
