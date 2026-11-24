
const productSearchForm = document.querySelector('#productSearchForm');
const productSearch = document.querySelector('#productSearch');
const searchMessage = document.querySelector('#searchMessage');
const productCount = document.querySelector('#productCount');
const productHeader = document.querySelector('.price-header');
const productsTable = document.querySelector('.products-table');

const comparisonProduct = document.querySelector('#comparisonProduct');
const comparisonForm = document.querySelector('#comparisonForm');
const comparisonResults = document.querySelector('#comparisonResults');

let products = [];
let historico = [];
let ofertasPorProduto = {};

// Normaliza textos para facilitar a pesquisa
function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Monta o nome do produto
function getProductName(product) {
  return `${product.nome_produto} ${product.modelo_produto || ''}`.trim();
}

// Formata valores monetários
function formatPrice(price) {
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// Consulta as APIs
async function carregarDados() {
  try {
    const [respostaProdutos, respostaHistorico] = await Promise.all([
      fetch('/api/produtos'),
      fetch('/api/historico-precos')
    ]);

    if (!respostaProdutos.ok || !respostaHistorico.ok) {
      throw new Error('Erro ao consultar as APIs.');
    }

    products = await respostaProdutos.json();
    historico = await respostaHistorico.json();

    organizarOfertas();
    exibirProdutos(products);
    preencherComparacao();

  } catch (erro) {
    console.error('Erro ao carregar dados:', erro);

    productCount.textContent = 'Erro ao carregar dados';
    searchMessage.hidden = false;
    searchMessage.textContent = 'Não foi possível carregar os produtos e preços.';
  }
}

// Organiza o histórico, mantendo o registro mais recente de cada loja
function organizarOfertas() {
  ofertasPorProduto = {};

  historico.forEach(registro => {
    const idProduto = registro.id_produto;
    const nomeLoja = registro.nome_loja;

    if (!ofertasPorProduto[idProduto]) {
      ofertasPorProduto[idProduto] = {};
    }

    const ofertaAnterior = ofertasPorProduto[idProduto][nomeLoja];

    if (
      !ofertaAnterior ||
      new Date(registro.historico_dataehora) >
      new Date(ofertaAnterior.historico_dataehora)
    ) {
      ofertasPorProduto[idProduto][nomeLoja] = registro;
    }
  });

  // Transforma as ofertas em listas e organiza pelo menor preço
  Object.keys(ofertasPorProduto).forEach(idProduto => {
    ofertasPorProduto[idProduto] = Object.values(
      ofertasPorProduto[idProduto]
    ).sort((a, b) => a.preco_obtido - b.preco_obtido);
  });
}

// Retorna as ofertas de um produto
function obterOfertas(idProduto) {
  return ofertasPorProduto[idProduto] || [];
}

// Exibe os produtos na tabela principal
function exibirProdutos(lista) {
  productsTable.querySelectorAll('[data-product-id]').forEach(row => row.remove());

  lista.forEach(product => {
    const ofertas = obterOfertas(product.id_produto);
    const menorOferta = ofertas[0];

    const row = document.createElement('div');
    row.className = 'price-row';
    row.dataset.productId = product.id_produto;
    row.setAttribute('role', 'row');

    const nome = document.createElement('span');
    nome.setAttribute('role', 'cell');
    nome.textContent = getProductName(product);

    const fornecedor = document.createElement('span');
    fornecedor.setAttribute('role', 'cell');
    fornecedor.textContent = menorOferta
      ? menorOferta.nome_loja
      : 'Sem registro';

    const preco = document.createElement('strong');
    preco.setAttribute('role', 'cell');
    preco.textContent = menorOferta
      ? formatPrice(menorOferta.preco_obtido)
      : '—';

    row.append(nome, fornecedor, preco);
    productsTable.append(row);
  });

  productCount.textContent =
    `${lista.length} produto${lista.length === 1 ? '' : 's'} cadastrados`;

  productHeader.hidden = lista.length === 0;

  searchMessage.hidden = lista.length > 0;

  if (lista.length === 0) {
    searchMessage.textContent = 'Nenhum produto encontrado.';
  }
}

// Pesquisa por nome, modelo ou marca
function filterProducts() {
  const query = normalizeText(productSearch.value.trim());

  const resultados = products.filter(product => {
    const nome = normalizeText(
      `${product.nome_produto} ${product.modelo_produto || ''} ${product.marca_produto || ''}`
    );

    return nome.includes(query);
  });

  exibirProdutos(resultados);

  if (resultados.length === 0) {
    searchMessage.hidden = false;
    searchMessage.textContent =
      `Nenhum produto corresponde à pesquisa "${productSearch.value.trim()}".`;
  }
}

productSearchForm.addEventListener('submit', event => {
  event.preventDefault();
  filterProducts();
});

productSearch.addEventListener('input', filterProducts);

// Preenche a seleção de produtos para comparação
function preencherComparacao() {
  comparisonProduct.replaceChildren();

  const opcaoInicial = document.createElement('option');
  opcaoInicial.value = '';
  opcaoInicial.textContent = 'Selecione um produto';
  opcaoInicial.disabled = true;
  opcaoInicial.selected = true;

  comparisonProduct.append(opcaoInicial);

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id_produto;
    option.textContent = getProductName(product);

    comparisonProduct.append(option);
  });
}

// Cria células da tabela de comparação
function createCell(tag, text) {
  const cell = document.createElement(tag);
  cell.textContent = text;
  return cell;
}

// Compara os preços do produto selecionado
comparisonForm.addEventListener('submit', event => {
  event.preventDefault();

  const idProduto = comparisonProduct.value;

  const product = products.find(
    item => String(item.id_produto) === String(idProduto)
  );

  if (!product) {
    return;
  }

  const ofertas = obterOfertas(idProduto);

  if (ofertas.length === 0) {
    comparisonResults.textContent =
      'Não existem preços registrados para este produto.';
    return;
  }

  const table = document.createElement('table');
  table.className = 'comparison-table';

  const tableHead = document.createElement('thead');
  const header = document.createElement('tr');

  header.append(
    createCell('th', 'Fornecedor'),
    createCell('th', 'Preço'),
    createCell('th', 'Resultado')
  );

  tableHead.append(header);

  const tableBody = document.createElement('tbody');

  ofertas.forEach((oferta, index) => {
    const row = document.createElement('tr');

    const resultado = index === 0
      ? 'Menor preço'
      : `${formatPrice(oferta.preco_obtido - ofertas[0].preco_obtido)} acima`;

    if (index === 0) {
      row.className = 'lowest-offer';
    }

    row.append(
      createCell('td', oferta.nome_loja),
      createCell('td', formatPrice(oferta.preco_obtido)),
      createCell('td', resultado)
    );

    tableBody.append(row);
  });

  table.append(tableHead, tableBody);

  const resultTitle = document.createElement('p');
  resultTitle.className = 'comparison-result-title';
  resultTitle.textContent = `Comparação de preços: ${getProductName(product)}`;

  comparisonResults.replaceChildren(resultTitle, table);
});

// Inicializa o dashboard
carregarDados();
