#Primeiro commit (teste).

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from urllib.parse import quote_plus


app = Flask(__name__)
CORS(app)


# Conexão com o SQL Server
conexao = quote_plus(
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=SEU_SERVIDOR;"
    "DATABASE=SEU_BANCO;"
    "Trusted_Connection=yes;"
    "TrustServerCertificate=yes;"
)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mssql+pyodbc:///?odbc_connect={conexao}"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# Model
class Produto(db.Model):
    __tablename__ = "Produtos"

    id_produtos = db.Column(
        db.Integer,
        primary_key=True
    )

    nome_produto = db.Column(
        db.String(150),
        nullable=False
    )

    marca_produto = db.Column(
        db.String(150),
        nullable=False
    )


# Rota principal
@app.route("/")
def home():

    return jsonify({
        "mensagem": "API PriceWatch funcionando"
    })


# Rota para listar produtos
@app.route("/api/produtos", methods=["GET"])
def listar_produtos():

    produtos = Produto.query.all()

    resultado = []

    for produto in produtos:

        resultado.append({
            "id": produto.id_produtos,
            "nome": produto.nome_produto,
            "marca": produto.marca_produto
        })

    return jsonify(resultado)


if __name__ == "__main__":
    app.run(debug=True)

    #anotações:
    
    #from flask_cors import CORS - serve para permitir que o front-end de outro endereço do meu consiga se comunicar com o Flask

    #from urllib.parse import quote_plus - ajuda a transformar a configuração do SQL Server em um formato que o SQLAlchemy consiga entender

