document.addEventListener("DOMContentLoaded", function() {
    function toggleAside() {
        const aside = document.getElementById("sidebar2");
        const toggleButton2 = document.querySelector(".toggle-button2");
        const main = document.querySelector('main');

        if (aside.classList.contains("active")) {
            aside.classList.remove("active");
            toggleButton2.classList.remove("active");
            main.classList.remove("active");
            toggleButton2.innerHTML = "➡️";
        } else {
            aside.classList.add("active");
            toggleButton2.classList.add("active");
            main.classList.add("active");
            toggleButton2.innerHTML = "⬅️";
        }
    }

    document.querySelector(".toggle-button2").addEventListener("click", toggleAside);

    // Función para descargar un archivo
    function downloadFile(url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.substring(url.lastIndexOf('/') + 1);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    window.downloadFile = downloadFile;
});

