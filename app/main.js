function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar componente.');
      return response.text();
    })
    .then(html => {
      element.innerHTML = html;
      if (file.includes("seja-voluntario.html")) {
        setupVoluntarioForm();
      }
    })
    .catch(error => {
      element.innerHTML = '<p style="color:red;">Erro ao carregar componente.</p>';
      console.error(error);
    });
}

function navegar(pagina) {
  loadComponent("main-content", `app/components/${pagina}.html`);
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "app/components/header.html");
  loadComponent("footer", "app/components/footer.html");
  loadComponent("main-content", "app/components/boas-vindas.html");
});

function setupVoluntarioForm() {
  const form = document.getElementById("voluntarioForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://formspree.io/f/xdkgadve", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Obrigado!',
          text: 'Recebemos seu interesse. Em breve entraremos em contato 😊',
          confirmButtonColor: '#f4978e'
        });
        form.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.',
        });
      }
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão',
        text: 'Verifique sua internet ou tente novamente mais tarde.',
      });
    });
  });
}

function abrirQR() {
  document.getElementById("qrModal").style.display = "block";
}

function fecharQR() {
  document.getElementById("qrModal").style.display = "none";
}
