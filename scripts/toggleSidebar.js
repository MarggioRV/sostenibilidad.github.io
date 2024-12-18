// toggleSidebar.js
function toggleAside() {
    const aside = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const toggleButton = document.querySelector(".toggle-button");

    if (aside.style.left === "0px") {
        aside.style.left = "-231px";
        toggleButton.innerHTML = "➡️";
        toggleButton.style.left = "10px"; // Vuelve a la posición original
    } else {
        aside.style.left = "0px";
        toggleButton.innerHTML = "⬅️";
        toggleButton.style.left = "241px"; // Se desplaza junto con el aside
    }
}
