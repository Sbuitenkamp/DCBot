module.exports = {
    name: 'warn',
    async execute(person, warningHandler, reason) {
        warningHandler(person, reason)
    }
};