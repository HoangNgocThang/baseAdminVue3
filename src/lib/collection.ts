
/**
 * Generate an array
 * @param {number} max
 * @param {number} step=1
 * @param {number} start=0
 * @return {Array<number>}
 */
export function range(max, step = 1, start = 0) {
    const result = [];
    for (let i = start; i <= max; i+= step) {
        result.push(i);
    }

    return result;
}

/**
 *
 * @param obj
 * @param cb
 */
export function forEach(obj, cb) {
    if (Array.isArray(obj)) {
        obj.forEach(cb);
        return;
    }

    for (const k in obj) {
        cb(obj[k], k);
    }
}



/**
 *
 * @param {Array<any>} entries
 * @param {string} key
 * @return {object}
 */
export function groupBy(entries, key) {
    const groups = {};
    entries.forEach(entry => {
        const keyValue = entry[key];
        if (keyValue != null) {
            groups[keyValue] = groups[keyValue] || [];
            groups[keyValue].push(entry);
        }
    });

    return groups;
}

export function objectHasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 *
 * @param {Array<any>} entries
 * @param {string} key
 * @return {object}
 */
export function groupByFirst(entries, key) {
    const groups = {};
    entries.forEach(entry => {
        const keyValue = entry[key];
        if (keyValue != null && !objectHasOwn(groups, keyValue)) {
            groups[keyValue] = entry;
        }
    });

    return groups;
}

/**
 *
 * @param {Array<any>} entries
 * @param {string} key
 * @return {number}
 */
export function arraySum(entries, key) {
    return entries.reduce((partialSum, a) => partialSum + (a[key]-0), 0);
}

/**
 *
 * @param {Array<any>} entries
 * @param {string} key
 * @return {any | null}
 */
export function arrayMaxValueIndex(entries, key) {
    if (entries.length === 0) {
        return null;
    }

    let maxValue = entries[0][key];
    let maxIndex = 0;
    const len = entries.length;
    for (let i = 1; i < len; i++) {
        if (entries[i][key] > maxValue) {
            maxValue = entries[i][key];
            maxIndex = i;
        }
    }

    return maxIndex;
}

/**
 *
 * @param {Array<any>} entries
 * @param {string} key
 * @return {object}
 */
export function groupByLast(entries, key) {
    const groups = {};
    entries.forEach(entry => {
        const keyValue = entry[key];
        if (keyValue != null) {
            groups[keyValue] = entry;
        }
    });
    return groups;
}

/**
 *
 * @param {object} src
 * @param {object} dst
 * @return {object}
 */
export function fillDefault(src, dst) {
    forEach(src, (v, k) => {
        if (!objectHasOwn(dst, k)) {
            dst[k] = v;
        }
    });

    return dst;
}
