import axios from 'axios';

const moduleConverter = async (id) => {
    try {
        const resModule = await axios.get(`/api/user-modules/${id}`);
        console.log(resModule.data);
        // eventually get this from global config
        const academicYear = '2019-2020';
        const resNusmods = await axios.get(
            `/v2/${academicYear}/modules/${resModule.data.moduleCode}.json`
        );
        console.log(resNusmods.data);
        return resNusmods.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

const getArrayOfModules = async (arr) => {
    return Promise.all(
        arr
            .map(async (moduleID) => {
                return await moduleConverter(moduleID);
            })
            .filter((module) => module !== null)
    );
};

const moduleArrayConverter = async (arr) => {
    return await getArrayOfModules(arr);
};

export default moduleArrayConverter;
