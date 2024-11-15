// Question - https://stackoverflow.com/q/171251/2788478
// Answer   - https://stackoverflow.com/a/12495197/2788478

const realMerge = function (to: any, from: any) {
    // Make sure to make a shallow copy first, otherwise
    // the original objects are mutated. 
    to = {...to};
    from = {...from};

    let n;
    for (n in from) {

        if (typeof to[n] != 'object') {
            to[n] = from[n];
        } else if (typeof from[n] == 'object') {
            to[n] = realMerge(to[n], from[n]);
        }
    }
    return to;
};