const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const descriptionBox = document.getElementById('description-box');
const infoPanel = document.getElementById('info-panel');

// Cargar la imagen del mapa
const mapImage = new Image();
mapImage.src = '../images/IES_CuraValera2.png'; 

mapImage.onload = function() {
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
    drawRegions();
};

// Definir regiones, cuadrilateros y ovaladas
const regions = [
    { type: 'polygon', points: [180, 390, 220, 390, 220, 450, 180, 450], description: "<b>ITC Termica<b>" }, // Área 2
    { type: 'polygon', points: [180, 230, 248, 230, 248, 270, 180, 270], description: "<b>Paneles Fotovoltaicos<b>" }, // Área 3
    { type: 'polygon', points: [120, 225, 160, 225, 160, 325, 120, 325], description: "<b>Ventilación y Aclimatización<b>" },
    { type: 'oval', x: 265, y: 114, radiusX: 20, radiusY: 20, description: "<b>Invernadero<b>" }, // Área ovalada
    { type: 'oval', x: 265, y: 255, radiusX: 15, radiusY: 15, description: "<b>Tanque de Propano<b>" }
];

// Dibujar regiones (sin colorearlas inicialmente)
function drawRegions() {
    regions.forEach(region => {
        ctx.beginPath();
        if (region.type === 'oval') {
            ctx.ellipse(region.x, region.y, region.radiusX, region.radiusY, 0, 0, 2 * Math.PI);
        } else if (region.type === 'polygon') {
            ctx.moveTo(region.points[0], region.points[1]);
            for (let i = 2; i < region.points.length; i += 2) {
                ctx.lineTo(region.points[i], region.points[i + 1]);
            }
            ctx.closePath();
        }
        ctx.closePath();
    });
}

// Detectar si el puntero está dentro de una región
function isInsideRegion(region, x, y) {
    if (region.type === 'oval') {
        const dx = x - region.x;
        const dy = y - region.y;
        return (dx * dx) / (region.radiusX * region.radiusX) + (dy * dy) / (region.radiusY * region.radiusY) <= 1;
    } else if (region.type === 'polygon') {
        let inside = false;
        for (let i = 0, j = region.points.length / 2 - 1; i < region.points.length / 2; j = i++) {
            const xi = region.points[i * 2], yi = region.points[i * 2 + 1];
            const xj = region.points[j * 2], yj = region.points[j * 2 + 1];
            const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
    return false;
}

// Manejar el evento de movimiento del ratón
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Redibujar la imagen del mapa
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

    let foundRegion = false;

    regions.forEach(region => {
        if (isInsideRegion(region, x, y)) {
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
            ctx.beginPath();
            if (region.type === 'oval') {
                ctx.ellipse(region.x, region.y, region.radiusX, region.radiusY, 0, 0, 2 * Math.PI);
            } else if (region.type === 'polygon') {
                ctx.moveTo(region.points[0], region.points[1]);
                for (let i = 2; i < region.points.length; i += 2) {
                    ctx.lineTo(region.points[i], region.points[i + 1]);
                }
                ctx.closePath();
            }
            ctx.fill();
            descriptionBox.innerHTML = region.description;
            infoPanel.innerHTML = `Hola, estás en el ${region.description}`;
            foundRegion = true;
        }
    });

    if (!foundRegion) {
        descriptionBox.innerHTML = "Pasa el ratón sobre una área para ver la descripción.";
        infoPanel.innerHTML = "Hola, pasa el ratón sobre un área para ver en qué área estás.";
    }
});
