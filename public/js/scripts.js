var simplemde = new SimpleMDE({ element: document.getElementById("create-post") });

const openCreatePost = document.querySelector(".btn-criarpost");
const closeCreatePost = document.querySelector(".btn-fechar");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    [modal, fade].forEach((element) => element.classList.toggle("hide"));
}

[openCreatePost, closeCreatePost].forEach((element) => {
    element.addEventListener("click", () => toggleModal());
})

/*
const openModal = () => {
    const modalContent = document.createElement("div");
    modalContent.innerHTML = "
        < textarea id = "markdownEditor" ></textarea >
            <div class="botoes">
                <button id="cancelPost">Cancelar</button>
                <button id="savePost">Publicar</button>

            </div>"
}
*/
