module.exports = function (partials, partialName, data) {
    return partials[partialName](data.hash);
};