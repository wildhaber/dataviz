import { CssValueClassifier } from './CssValueClassifier';

class CssValueLength {
    constructor(value, node) {
        this._value = value;
        this._node = node;

        this._computeSample();

        this._classifier = new CssValueClassifier(value);
        this._pixel = this._getPixel();
        this._pixelRaw = parseInt(this._pixel);
        this._pixelWidth = this._getPixel(true);
        this._pixelHeight = this._getPixel(false);

        this._cleanupComputedSample();
    }

    _computeSample() {
        this._sample = document.createElement('div');
        this._sample.style.position = 'absolute';
        this._sample.style.opacity = 0;
        this._sample.style.pointerEvents = 'none';
        this._node.appendChild(this._sample);
    }

    _cleanupComputedSample() {
        this._node.removeChild(this._sample);
    }

    _getComputedPixel(width = true) {
        const dimension = (width) ? 'width' : 'height';
        this._sample.style[dimension] = this._value;

        return getComputedStyle(this._sample).getPropertyValue(dimension);
    }

    _getPixel(width = true) {
        if(this._classifier.isPixel()) {
            return this._value;
        }

        return this._getComputedPixel(width);
    }

    toPixel(width = true) {
        return (width)
            ? this._pixelWidth
            : this._pixelHeight;
    }

    toPercent(width = true) {
        const box = this._node.getBoundingClientRect();
        const rawPixels = (width)
            ? parseInt(this._pixelWidth)
            : parseInt(this._pixelHeight);

        return (width)
            ? (box.width > 0) ? `${rawPixels / box.width * 100}%` : 0
            : (box.height > 0) ? `${rawPixels / box.height * 100}%` : 0;
    }

    toVw() {
        const boxWidth = window.innerWidth;

        return (boxWidth)
            ? `${this._pixelRaw / boxWidth * 100}vw`
            : 0;
    }

    toVh() {
        const boxHeight = window.innerHeight;
        return (boxHeight)
            ? `${this._pixelRaw / boxHeight * 100}vh`
            : 0;
    }
}

export { CssValueLength };
