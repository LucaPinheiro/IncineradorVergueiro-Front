export function generateProductHTML(productName, productImageSrc, productPrice) {
    // Crie um elemento de coluna
    const column = document.createElement("div");
    column.className = "col-6 col-sm-6 col-md-4 col-lg-3";

    column.innerHTML = `
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#${productName}Modal">
            <div style="width: 10rem; padding-top: 1em; border: 0;">
                <img src="${productImageSrc}" class="card-img-top w-75 rounded-4 imageCard" alt="...">
                <div class="card-body p-0">
                    <p class="card-text m-0">${productName}</p>
                    <p class="card-text">${productPrice}</p>
                </div>
            </div>
        </button>
    `;

    return column;
}

export  function addProductToSection(productName, productImageSrc, productPrice, sectionId) {
    const section = document.getElementById(sectionId);
    const productColumn = generateProductHTML(productName, productImageSrc, productPrice);
    section.appendChild(productColumn);
}
