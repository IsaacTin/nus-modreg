import axios from 'axios';

const moduleConverter = async (id) => {
    try {
        const res = await axios.get(`api/user-modules/${id}`);
        return res.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export default moduleConverter;
