module.exports = {
    succeed,
    fail,
    repair,
    get,
};

// checks if item has correct type and structure
function checkItem(item) {
    // check if item has the appropriate keys
    if ('name' in item && 'durability' in item && 'enhancement' in item) {
        if (
            item.durability >= 0 &&
            item.durability <= 100 &&
            item.enhancement >= 0 &&
            item.enhancement <= 20
        ) {
            return true;
        } else {
            throw 'durability or enhancement are not within correct range';
        }
    } else {
        throw 'item must be an object with name, durability, and enhancement';
    }
}

function succeed(item) {
    if (checkItem(item)) {
        const newItem = { ...item };

        if (newItem.enhancement < 20) {
            newItem.enhancement++;
        }

        return newItem;
    }

    return;
}

function fail(item) {
    if (checkItem(item)) {
        const newItem = { ...item };

        if (newItem.enhancement < 15) {
            newItem.durability -= 5;
        } else if (newItem.enhancement >= 15) {
            newItem.durability -= 10;

            if (newItem.enhancement > 16) {
                newItem.enhancement -= 1;
            }
        }

        return newItem;
    }

    return;
}

function repair(item) {
    if (checkItem(item)) {
        return { ...item, durability: 100 };
    }

    return;
}

function get(item) {
    if (checkItem(item)) {
        if (item.enhancement === 0) {
            return { ...item };
        } else if (item.enhancement > 0) {
            const newName = `[+${item.enhancement}] ${item.name}`;

            return { ...item, name: newName };
        }
    }

    return;
}
