const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validarCorreoElectronico(email) {
  return emailRegex.test(email);
}
const sendEmail = (serviceID, templateID, form) => {
  emailjs.sendForm(serviceID, templateID, form).then(
    () => {
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
    },
    (err) => {
      Swal.fire({
        title: `"Ocurrió el siguiente error: " ${JSON.stringify(err)}`,
        icon: "Error",
        confirmButtonColor: "#000",
        confirmButtonText: "Intentar más tarde",
      });
    }
  );
};
//Funcion para realizar cambios en el diseño cuando cambie la pantalla
//navbar
const itemsnavbar = document.getElementById("itemsnavbar");
//Icono del menu
const iconmenu = document.getElementById("iconmenu");
//Menu
const menu = document.getElementById("menu");

const showCloseMenuMobile = () => {
  if (itemsnavbar.classList.contains("hidden")) {
    itemsnavbar.classList.remove("scale-out-hor-right");
    itemsnavbar.classList.add("scale-in-hor-right");
    itemsnavbar.classList.remove("hidden");
    iconmenu.classList.add("fa-times");
    iconmenu.classList.remove("fa-bars");
  } else {
    itemsnavbar.classList.remove("scale-in-hor-right");
    itemsnavbar.classList.add("scale-out-hor-right");
    iconmenu.classList.remove("fa-times");
    iconmenu.classList.add("fa-bars");
    setTimeout(() => {
      itemsnavbar.classList.add("hidden");
    }, 500);
  }
};

iconmenu.addEventListener("click", showCloseMenuMobile);

itemsnavbar.addEventListener("click", showCloseMenuMobile);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    if (itemsnavbar.classList.contains("hidden")) {
      itemsnavbar.classList.remove("hidden");
      itemsnavbar.classList.remove("scale-out-hor-right");
      itemsnavbar.classList.remove("scale-in-hor-right");
    } else if (itemsnavbar.classList.contains("scale-out-hor-right")) {
      itemsnavbar.classList.remove("scale-out-hor-right");
      itemsnavbar.classList.remove("scale-in-hor-right");
    }
  } else {
    itemsnavbar.classList.remove("scale-in-hor-right");
    itemsnavbar.classList.add("scale-out-hor-right");
    iconmenu.classList.remove("fa-times");
    iconmenu.classList.add("fa-bars");
    itemsnavbar.classList.add("hidden");
  }
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    menu.classList.add("menuColor");
  } else {
    menu.classList.remove("menuColor");
  }
});

//Capturamos el formulario
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const serviceID = "default_service";
  const templateID = "template_qx6urfd";

  if (
    form.querySelector("#from_name").value.length == 0 ||
    form.querySelector("#email_id").value.length == 0 ||
    form.querySelector("#message").value.length == 0
  ) {
    Toastify({
      text: "No dejes campos vacíos",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #161616, #161616)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  } else {
    if (validarCorreoElectronico(form.querySelector("#email_id").value)) {
      Swal.fire({
        title: "Estas completamente seguro de querer enviar el mensaje?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        iconColor: "#000",
        confirmButtonColor: "#b0ce37", // Cambiar el color del botón de confirmación
        cancelButtonColor: "#000",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log("Entre");
          sendEmail(serviceID, templateID, form);
        } else if (result.isDenied) {
          Swal.fire({
            title: "Ocurrió un error",
            icon: "Error",
            confirmButtonColor: "#000",
            confirmButtonText: "Intentar más tarde",
          });
        }
      });
    } else {
      Toastify({
        text: "Ingresa un correo válido por favor",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #161616, #161616)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }
});
