import axios from 'axios'
import ModuleItem from '../components/search/ModuleItem';

const coordsConverter = async (module, day) => {
    const filtered = module.timing.filter((timeslot) => timeslot.day === day)
    try {
        const resCoords = await axios.get(`/api/venues/${filtered[0].venue}`);
        // eventually get this from global config
        return {
            x: resCoords.data.x,
            y: resCoords.data.y,
            moduleCode: module.moduleCode,
            classNo: module.classNo,
            lessonType: module.lessonType,
            venue: filtered[0].venue
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

const getArrayOfCoords = async (arr, day) => {
    return Promise.all(
        arr
            .map(async (module) => {
                return await coordsConverter(module, day);
            })
            .filter((module) => module !== null)
    );
};

const coordsArrayConverter = async (arr, day) => {
    return await getArrayOfCoords(arr, day);
};


export default coordsArrayConverter