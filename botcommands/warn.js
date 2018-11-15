module.exports = {
    name: 'warn',
    async execute(person, warningHandler) {
        warningHandler(person)
    }
};