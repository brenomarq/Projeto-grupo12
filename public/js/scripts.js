document.addEventListener("DOMContentLoaded", function() {
    const simplemde = new SimpleMDE({ element: document.getElementById("markdownEditor") });
    const openCreatePost = document.querySelector(".btn-criarpost");
    const closeCreatePost = document.querySelector(".btn-fechar");
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");

    const toggleModal = () => {
        [modal, fade].forEach((element) => element.classList.toggle("hide"));
    };

    [openCreatePost, closeCreatePost].forEach((element) => {
        element.addEventListener("click", () => toggleModal());
    });

    const savePostBtn = document.getElementById("savePost");

    savePostBtn.addEventListener("click", async () => {
        toggleModal();
        const content = simplemde.value(); // Obtém o conteúdo do editor
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            const postResponse = await fetch('/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content })
            });

            const postData = await postResponse.json();
            console.log("Post Criado:", postData); // Exibe a resposta do servidor
        } catch (error) {
            console.error("Erro ao enviar o post:", error);
        } finally {
            simplemde.value(""); // Limpa o conteúdo do editor após enviar o post
        }
    });
});