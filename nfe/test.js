// Função para extrair a situação com base no atributo "data-original-title"
function extractSituacao(column) {
    const img = column.querySelector("img");
    if (img && img.getAttribute("data-original-title")) {
        const title = img.getAttribute("data-original-title");
        if (title.includes("Cancelada")) {
            return "Cancelada";
        } else if (title.includes("Substituída")) {
            return "Substituída";
        }
    }
    return "Emitida"; // Situação padrão
}

// Função para extrair dados de uma página
async function extractDataFromPage(page) {
    const response = await fetch(`/EmissorNacional/Notas/Emitidas?pg=${page}`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const rows = doc.querySelectorAll("table.table-striped tbody tr");
    const pageData = [];

    rows.forEach(row => {
        const columns = row.querySelectorAll("td");
        const geracao = columns[0]?.innerText.trim();
        const emitidaPara = columns[1]?.innerText.trim().replace(/\s+/g, " ");
        const valor = columns[3]?.innerText.trim();
        const situacao = extractSituacao(columns[4]); // Extrai a situação usando a função

        pageData.push([geracao, emitidaPara, valor, situacao]);
    });

    return pageData;
}

// Função principal para capturar dados de todas as páginas
async function extractAllPages() {
    const totalPages = 33;
    const allData = [];

    for (let page = 1; page <= totalPages; page++) {
        console.log(`Extraindo dados da página ${page}...`);
        const pageData = await extractDataFromPage(page);
        allData.push(...pageData);
    }

    // Chama a função para baixar o CSV com todos os dados capturados
    downloadCSV(allData);
}

// Função para converter os dados em CSV com separador de colunas ";"
function downloadCSV(data) {
    const csvContent = "data:text/csv;charset=utf-8," +
        ["Geração;Emitida para;Valor (R$);Situação"]
        .concat(data.map(row => row.join(";")))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "notas_fiscais_completas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Inicia o processo de extração de todas as páginas
extractAllPages();
