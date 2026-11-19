from flask import Flask, jsonify
import pyodbc

app = Flask(__name__)


# Conexão com o SQL Server
conexao = pyodbc.connect(
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER= 'Colocar o Servidor' ;" #Falta colocar o servidor!
    "DATABASE=PriceWatch;"
    "Trusted_Connection=yes;"
    "TrustServerCertificate=yes;"
)


@app.route("/")
def home():
    return jsonify({
        "mensagem": "API PriceWatch funcionando"
    })


@app.route("/api/produtos", methods=["GET"])
def listar_produtos():

    cursor = conexao.cursor()

    cursor.execute("""
        SELECT
            id_produtos,
            nome_produto,
            modelo_produto,
            marca_produto,
            armazenamento,
            cor,
            id_categoria
        FROM Produtos
    """)

    produtos = []

    for produto in cursor.fetchall():

        produtos.append({
            "id": produto.id_produtos,
            "nome": produto.nome_produto,
            "modelo": produto.modelo_produto,
            "marca": produto.marca_produto,
            "armazenamento": produto.armazenamento,
            "cor": produto.cor,
            "id_categoria": produto.id_categoria
        })

    return jsonify(produtos)


if __name__ == "__main__":
    app.run(debug=True)