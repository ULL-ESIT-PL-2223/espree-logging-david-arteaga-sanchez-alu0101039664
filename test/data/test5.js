const test = function(a, b) {
    const insideTest = function(a, b) {
        return a + b;
    }
    insideTest(a, b);
}

test(1, 2);