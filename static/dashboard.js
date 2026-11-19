const productRows = [...document.querySelectorAll('.price-panel [data-product-id]')];
const productSearchForm = document.querySelector('#productSearchForm');
const productSearch = document.querySelector('#productSearch');
const searchMessage = document.querySelector('#searchMessage');
const productCount = document.querySelector('#productCount');
const productHeader = document.querySelector('.price-header');

const comparisonOffers = {
  cafe: [
    { supplier: 'Empório da Serra', price: 41.5 },
    { supplier: 'Feira do Grão', price: 35.9 },
  ],
  fone: [
    { supplier: 'Tech Audio', price: 219.9 },
    { supplier: 'Som Centro', price: 249.9 },
  ],
  monitor: [
    { supplier: 'Tela Norte', price: 729 },
    { supplier: 'Pixel Shop', price: 679 },
  ],
};

function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function filterProducts() {
  const query = normalizeText(productSearch.value.trim());
  const matchingRows = productRows.filter((row) => {
    const productName = normalizeText(row.children[0].textContent);
    const matches = productName.includes(query);
    row.hidden = !matches;
    return matches;
  });

  productCount.textContent = `${matchingRows.length} produto${matchingRows.length === 1 ? '' : 's'} de exemplo`;
  productHeader.hidden = matchingRows.length === 0;
  searchMessage.hidden = matchingRows.length > 0;
  searchMessage.textContent = matchingRows.length === 0
    ? `Nenhum produto corresponde à pesquisa "${productSearch.value.trim()}".`
    : '';
}

productSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  filterProducts();
});

productSearch.addEventListener('input', () => {
  if (productSearch.value.trim() === '') {
    filterProducts();
  }
});

const comparisonProduct = document.querySelector('#comparisonProduct');
const comparisonForm = document.querySelector('#comparisonForm');
const comparisonResults = document.querySelector('#comparisonResults');

productRows.forEach((row) => {
  const option = document.createElement('option');
  option.value = row.dataset.productId;
  option.textContent = row.children[0].textContent;
  comparisonProduct.append(option);
});

function createCell(tag, text) {
  const cell = document.createElement(tag);
  cell.textContent = text;
  return cell;
}

function parsePrice(text) {
  return Number(text.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'));
}

function formatPrice(price) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

comparisonForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedRow = productRows.find((row) => row.dataset.productId === comparisonProduct.value);
  const offers = [
    {
      supplier: selectedRow.children[1].textContent,
      price: parsePrice(selectedRow.children[2].textContent),
    },
    ...comparisonOffers[comparisonProduct.value],
  ].sort((first, second) => first.price - second.price);

  const table = document.createElement('table');
  table.className = 'comparison-table';

  const tableHead = document.createElement('thead');
  const header = document.createElement('tr');
  header.append(
    createCell('th', 'Fornecedor de exemplo'),
    createCell('th', 'Preço demonstrativo'),
    createCell('th', 'Resultado')
  );
  tableHead.append(header);

  const tableBody = document.createElement('tbody');
  offers.forEach((offer, index) => {
    const row = document.createElement('tr');
    const result = index === 0 ? 'Menor preço de exemplo' : `${formatPrice(offer.price - offers[0].price)} acima`;

    if (index === 0) {
      row.className = 'lowest-offer';
    }

    row.append(
      createCell('td', offer.supplier),
      createCell('td', formatPrice(offer.price)),
      createCell('td', result)
    );
    tableBody.append(row);
  });
  table.append(tableHead, tableBody);

  const resultTitle = document.createElement('p');
  resultTitle.className = 'comparison-result-title';
  resultTitle.textContent = `Ofertas fictícias para ${comparisonProduct.selectedOptions[0].text}:`;
  comparisonResults.replaceChildren(resultTitle, table);
});
