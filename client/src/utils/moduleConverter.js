const Module = require('../../../models/Module');

const moduleConverter = (id) => {
    try {
        return Module.findById(id);
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

export default moduleConverter;
