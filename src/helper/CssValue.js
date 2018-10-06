import { UNIT_CLASSIFICATIONS } from './CssValueClassifications';

import { CssValueClassifier } from './CssValueClassifier';
import { CssValueLength } from './CssValueLength';

class CssValue {
    constructor(value, node) {
        this._value = value.trim();
        this._node = node;
        this._unit = new CssValueClassifier(this._value);
        this._classification = this._unit.getClassification();
    }

    getValue() {
        switch(this._classification) {
            case UNIT_CLASSIFICATIONS.LENGTH:
                return new CssValueLength(this._value, this._node);
            case UNIT_CLASSIFICATIONS.COLOR:
                return null;
            case UNIT_CLASSIFICATIONS.UNITLESS:
                return null;
            default:
                return null;
        }
    }
}

export { CssValue };
