import { addToCart } from "./cartUtils.js";

export function generateProductHTML(
  productName,
  productImageSrc,
  productPrice,
  id
) {
  const column = document.createElement("div");
  column.className = "col-6 col-sm-6 col-md-4 col-lg-3";

  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = `Modal${id}`;
  modal.setAttribute("data-bs-backdrop", "static");
  modal.setAttribute("data-bs-keyboard", "false");
  modal.tabIndex = "-1";
  modal.setAttribute("aria-labelledby", `ModalLabel${id}`);
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h1");
  modalTitle.className = "modal-title fs-5";
  modalTitle.id = `ModalLabel${id}`;
  modalTitle.textContent = `Quer adicionar ao carrinho?`;

  const modalCloseButton = document.createElement("button");
  modalCloseButton.type = "button";
  modalCloseButton.className = "btn-close";
  modalCloseButton.setAttribute("data-bs-dismiss", "modal");
  modalCloseButton.setAttribute("aria-label", "Close");

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(modalCloseButton);

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  const modalImage = document.createElement("img");
  modalImage.src = productImageSrc;
  modalImage.className = "card-img-top";
  modalImage.alt = "Produto";

  modalBody.appendChild(modalImage);

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";

  const modalExitButton = document.createElement("button");
  modalExitButton.type = "button";
  modalExitButton.className = "btn btn-secondary btn-custom-exit";
  modalExitButton.setAttribute("data-bs-dismiss", "modal");
  modalExitButton.textContent = "Sair";

  const modalAddButton = document.createElement("button");
  modalAddButton.type = "button";
  modalAddButton.className = "btn btn-custom-add";
  modalAddButton.id = `adicionar${id}`;
  modalAddButton.textContent = "Adicionar";

  modalFooter.appendChild(modalExitButton);
  modalFooter.appendChild(modalAddButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modalDialog.appendChild(modalContent);

  modal.appendChild(modalDialog);

  column.innerHTML = `
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#Modal${id}">
            <div style="width: 10rem; padding-top: 1em; border: 0;">
                <img src="${productImageSrc}" class="card-img-top w-75 rounded-4 imageCard" alt="...">
                <div class="card-body p-0">
                    <p class="card-text m-0">${productName}</p>
                    <p class="card-text">${productPrice}</p>
                </div>
            </div>
        </button>
    `;

  return { column, modal };
}

export function addProductToSection(
  productName,
  productImageSrc,
  productPrice,
  id,
  sectionId
) {
  const section = document.getElementById(sectionId);
  const { column, modal } = generateProductHTML(
    productName,
    productImageSrc,
    productPrice,
    id
  );
  section.appendChild(column);

  document.body.appendChild(modal);

  const addButton = document.getElementById(`adicionar${id}`);
  addButton.addEventListener("click", () => {
    addToCart(productName, productPrice);
  });
}