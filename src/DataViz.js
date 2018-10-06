import mojs from 'mo-js';

const data = [
    { value: Math.random(), label: 'Dorothea' },
    { value: Math.random(), label: 'Michaela' },
    { value: Math.random(), label: 'Juliane' },
    { value: Math.random(), label: 'Maraike' },
    { value: Math.random(), label: 'Stefanie' },
];

function drawCircle(elements, dataPoint, radius = 200, fill = 'black', delay = 0, strokeWidth = 2) {
    const strokeLength = 2 * Math.PI * radius;
    const connectorLength = 20;
    const duration = 400;

    const bar = new mojs.Shape({
        parent: elements.plot,
        shape: 'circle',
        stroke: fill,
        strokeOpacity: 1,
        strokeLinecap: 'round',
        strokeWidth: strokeWidth,
        strokeDasharray: strokeLength,
        strokeDashoffset: { [strokeLength]: (strokeLength * 0.25) + ((strokeLength * 0.75) * Math.abs(dataPoint.value - 1)) },
        fill: 'none',
        fillOpacity: 1,
        left: '50%',
        top: '50%',
        x: 0,
        y: 0,
        angle: { 0: 90 },
        scale: 1,
        scaleX: null,
        scaleY: null,
        origin: '50% 50%',
        opacity: { 0.4: 1 },
        rx: 0,
        ry: 0,
        radius: radius,
        delay: delay,
        easing: 'ease.in',
        duration,
        repeat: 0,
        isYoyo: true,
    });

    const labelConnector = new mojs.Shape({
        parent: elements.plot,
        shape: 'line',
        fill: 'none',
        stroke: 'var(--palette-color-text)',
        strokeWidth: 1,
        strokeDashoffset: { [connectorLength]: 0 },
        strokeDasharray: connectorLength,
        strokeLinecap: 'round',
        x: connectorLength,
        y: radius,
        radius: connectorLength / 2,
        points: 2,
        angle: 0,
        opacity: { 0: 0.6 },
        delay: delay + duration,
        duration,
    });

    // Labels
    const labelElement = document.createElement('label');
    labelElement.classList.add('dataviz-label');
    labelElement.innerHTML = `${dataPoint.label} <span class='dataviz-label-value'>${Math.round(dataPoint.value * 100)}%</span>`;
    labelElement.style.left = `${connectorLength * 2}px`;
    labelElement.style.top = `${radius}px`;

    elements.labelContainer.appendChild(labelElement);
    window.setTimeout(() => {
        labelElement.classList.add('dataviz-label--active');
    }, (delay + duration));

    // Play
    const playbook = [bar, labelConnector];

    playbook.forEach((element) => {
        element.play();
    });
}

const colorPalette = [
    'var(--palette-color-1)',
    'var(--palette-color-2)',
    'var(--palette-color-3)',
    'var(--palette-color-4)',
    'var(--palette-color-5)',
    'var(--palette-color-6)',
    'var(--palette-color-7)',
    'var(--palette-color-8)',
    'var(--palette-color-9)',
    'var(--palette-color-10)',
];

// Setup Chart

const plotElement = document.querySelector('.plot');
const labelContainer = document.createElement('div');
labelContainer.classList.add('dataviz-label-container');
plotElement.appendChild(labelContainer);

const maxRadius = parseInt(getComputedStyle(plotElement).getPropertyValue('--dataviz-radius'));
const strokeWidth = parseInt(getComputedStyle(plotElement).getPropertyValue('--dataviz-stroke-width'));
const stepSize = strokeWidth + parseInt(getComputedStyle(plotElement).getPropertyValue('--dataviz-radius-gutter'));

const elements = {
    plot: plotElement,
    labelContainer,
};

data.sort((a, b) => {
    return a.value < b.value ? -1 : 1;
}).forEach((d, idx) => {
    drawCircle(
        elements,
        d,
        maxRadius - stepSize * idx,
        colorPalette[(idx % colorPalette.length)],
        ((idx + 1) * 150),
        strokeWidth,
    );
});
