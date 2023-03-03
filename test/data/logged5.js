const test = function (a, b) {
    console.log(`Entering <anonymous function>(${ a },${ b }) at line 1`);
    const insideTest = function (a, b) {
        console.log(`Entering <anonymous function>(${ a },${ b }) at line 2`);
        return a + b;
    };
    insideTest(a, b);
};
test(1, 2);