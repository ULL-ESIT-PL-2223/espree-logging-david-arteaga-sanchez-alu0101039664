const sayHello = name => {
    console.log(`Entering <anonymous function>(${ name }) at line 1`);
    return `Hello ${name}`;
};
sayHello('David');