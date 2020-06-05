import axios from 'axios';

const moduleConverter = async (id) => {
    try {
        const res = await axios.get(`/api/user-modules/${id}`);
        return res;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

export default moduleConverter;
