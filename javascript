  {
    icon: "🌻",
    text: "Eres una persona con una luz increíble.",
    image: "https://picsum.photos/400/300?random=1" // Puedes cambiar por 'img/foto1.jpg'
  },
  {
    icon: "🌸",
    text: "Nunca dejes de sonreír.",
    image: "" // Dejar vacío si solo quieres texto
  },
  {
    icon: "🌷",
    text: "Cada día es una nueva oportunidad para florecer.",
    image: "https://picsum.photos/400/300?random=2"
  },
  {
    icon: "🌺",
    text: "Gracias por estar siempre cerca.",
    image: "https://picsum.photos/400/300?random=3"
  },
  {
    icon: "🌹",
    text: "Todo lo que buscas está al otro lado del miedo.",
    image: ""
  },
  {
    icon: "🌼",
    text: "Un pequeño detalle para alegrar tu día.",
    image: "https://picsum.photos/400/300?random=4"
  }
];

const garden = document.getElementById("garden");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalText = document.getElementById("modal-text");
const closeBtn = document.getElementById("close-btn");

// Generar las flores en el campo
items.forEach((item) => {
  const flower = document.createElement("div");
  flower.classList.add("flower");
  flower.textContent = item.icon;

  flower.addEventListener("click", () => {
    openModal(item);
  });

  garden.appendChild(flower);
});

function openModal(data) {
  modalText.textContent = data.text;

  if (data.image) {
    modalImg.src = data.image;
    modalImg.classList.remove("hidden");
  } else {
    modalImg.src = "";
    modalImg.classList.add("hidden");
  }

  modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
