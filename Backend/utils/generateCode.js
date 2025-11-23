module.exports = function generateCode() {
    // Create a random 6–8 character alphanumeric code
    const length = Math.floor(Math.random() * 3) + 6; // gives 6, 7 or 8

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
};
