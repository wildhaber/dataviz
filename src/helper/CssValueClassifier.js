import { UNIT_CLASSIFICATIONS } from './CssValueClassifications';

class CssValueClassifier {
    constructor(value) {
        this._value = value;
    }

    getClassification() {
        const classificationMap = [
            {
                classification: UNIT_CLASSIFICATIONS.LENGTH,
                check: this.isLength.bind(this),
            },
            {
                classification: UNIT_CLASSIFICATIONS.COLOR,
                check: this.isColor.bind(this),
            },
            {
                classification: UNIT_CLASSIFICATIONS.UNITLESS,
                check: this.isUnitless.bind(this),
            },
        ];

        for(let classifier of classificationMap) {
            if(classifier.check()) {
                return classifier.classification;
            }
        }

        return null;
    }

    is(postfix, number = true) {
        const isEndingCorrect = this._value
            .toLowerCase()
            .endsWith(postfix);

        if(!isEndingCorrect) {
            return false;
        }

        if(!number) {
            return true;
        }

        return !isNaN(parseInt(this._value));
    }

    isUnitless() {
        return this.isNumber()
            || this.isCalc()
            || this.isUrl()
            || (
                !this.isLength()
                && !this.isColor()
            );
    }

    isLength() {
        return this.isPixel()
            || this.isPercent()
            || this.isEm()
            || this.isVw()
            || this.isVh()
            || this.isRem()
            || this.isMm()
            || this.isCm()
            || this.isInch()
            || this.isPoint()
            || this.isEx()
            || this.isCh()
            || this.isQuarerMm()
            || this.isPica();
    }

    isColor() {
        return this.isHex()
            || this.isRgb()
            || this.isRgba()
            || this.isHsl()
            || this.isHsla();
    }

    isNumber() {
        return this.isInt() || this.isFloat();
    }

    isInt() {
        return parseInt(this._value).toString() === this._value;
    }

    isFloat() {
        return !isNaN(parseFloat(this._value.match(/^-?\d*(\.\d+)?$/))) && !this.isInt();
    }

    isPixel() {
        return this.is('px');
    }

    isEm() {
        return this.is('em');
    }

    isRem() {
        return this.is('rem');
    }

    isPercent() {
        return this.is('%');
    }

    isVw() {
        return this.is('vw');
    }

    isVh() {
        return this.is('vh');
    }

    isCm() {
        return this.is('cm');
    }

    isMm() {
        return this.is('cm');
    }

    isInch() {
        return this.is('in');
    }

    isQuarerMm() {
        return this.is('q');
    }

    isPoint() {
        return this.is('pt');
    }

    isPica() {
        return this.is('pc');
    }

    isEx() {
        return this.is('ex');
    }

    isCh() {
        return this.is('ch');
    }

    isHex() {
        return /^#?([a-f\d]{3}|[a-f\d]{6})$/.test(this._value.toLowerCase());
    }

    isRgb() {
        return /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/
            .test(this._value.toLowerCase().replace(' ', ''));
    }

    isRgba() {
        return /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/
            .test(this._value.toLowerCase().replace(' ', ''));
    }

    isHsl() {
        return /^hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)$/
            .test(this._value.toLowerCase().replace(' ', ''));
    }

    isHsla() {
        return /^hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%,(0?\.\d|1(\.0)?)\)$/
            .test(this._value.toLowerCase().replace(' ', ''));
    }

    isUrl() {
        return this._value.toLowerCase().startsWith('url(')
            && this._value.toLowerCase().endsWith(')');
    }

    isCalc() {
        return this._value.toLowerCase().startsWith('calc(')
            && this._value.toLowerCase().endsWith(')');
    }
}

export { CssValueClassifier };
