import { CssValue } from './CssValue';

class CssReader {
    constructor(node) {
        this._node = node;
        this._watchingPropsCallback = {};

        this._whilePause = ('requestIdleCallback' in window)
            ? window.requestIdleCallback.bind(window)
            : window.requestAnimationFrame.bind(window);
    }

    subscribe(callback, ...properties) {
        if(typeof callback !== 'function') {
            return;
        }

        properties.forEach((property) => {
            if(typeof property !== 'string') {
                return;
            }

            this._watchingPropsCallback[property] = callback;
            this._pseudoWatcher(property);
        });
    }

    unsubscribe(...properties) {
        if(!properties.length) {
            this._watchingPropsCallback = {};
        }

        properties.forEach((property) => {
            if(
                typeof property !== 'string'
                || typeof this._watchingPropsCallback[property] === 'undefined'
            ) {
                return;
            }

            delete this._watchingPropsCallback[property];
        });
    }

    _pseudoWatcher(property, initialValue = null) {
        let propertyValue = window
            .getComputedStyle(this._node)
            .getPropertyValue(property);

        if(!initialValue) {
            return this._pseudoWatcher(property, propertyValue);
        }

        this._whilePause(() => {
            setTimeout(() => {
                let callback = this._watchingPropsCallback[property];
                if(!callback) {
                    return;
                }

                if(propertyValue !== initialValue) {
                    this._watchingPropsCallback[property](property, new CssValue(propertyValue, this._node));
                    return this._pseudoWatcher(property, propertyValue);
                }

                return this._pseudoWatcher(property, initialValue);
            }, 500);
        });
    }
}

export { CssReader };
