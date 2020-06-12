const Module = require('../../../models/Module');

const moduleConverter = (id) => {
    try {
        return Module.findById(id);
    } catch (error) {
        console.log(error.message);
        throw new Error('Invalid ID');
    }
};

export default moduleConverter;
