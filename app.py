
from flask import Flask, jsonify, render_template
from banco import listar_produtos, listar_historico_precos

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/api/produtos", methods=["GET"])
def listar_produtos_api():

    try:
        produtos = listar_produtos()

        return jsonify(produtos)

    except Exception as erro:
        print(f"Erro ao listar produtos: {erro}")

        return jsonify({
            "erro": "Não foi possível consultar os produtos."
        }), 500

@app.route("/api/historico-precos", methods=["GET"])
def listar_historico_precos_api():
    try:
        historico = listar_historico_precos()
        return jsonify(historico)
    except Exception as erro:
        print(f"Erro ao listar histórico de preços: {erro}")
        return jsonify({
            "erro": "Não foi possível consultar o histórico de preços."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
