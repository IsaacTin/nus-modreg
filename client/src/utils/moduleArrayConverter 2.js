import moduleConverter from './moduleConverter';

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
