import { getPreciseDistance, findNearest } from 'geolib'

const checker = (location_1, location_2, busStops) => {

    const distance = getPreciseDistance(
        {latitude: location_1.y, longitude: location_1.x},
        {latitude: location_2.y, longitude: location_2.x}
    )
    if (distance > 200) {
        const firstNearest = 
                busStops.filter((BusStop) => 
                    BusStop.location[0] === findNearest(
                    {lat: location_1.y, lng: location_1.x}, 
                     busStops.map((busStop) => {
                        return {lat: busStop.location[0], lng: busStop.location[1]}
                    })).lat 
                    && BusStop.location[1] === findNearest(
                    {lat: location_1.y, lng: location_1.x}, 
                    busStops.map((busStop) => {
                            return {lat: busStop.location[0], lng: busStop.location[1]}
                    })).lng
            )
        const secondNearest = 
            busStops.filter((BusStop) => 
                BusStop.location[0] === findNearest(
                {lat: location_2.y, lng: location_2.x}, 
                busStops.map((busStop) => {
                    return {lat: busStop.location[0], lng: busStop.location[1]}
                })).lat 
                && BusStop.location[1] === findNearest(
                {lat: location_2.y, lng: location_2.x}, 
                busStops.map((busStop) => {
                        return {lat: busStop.location[0], lng: busStop.location[1]}
                })).lng
            )
            if(firstNearest === secondNearest) {
                return null;
            } else {
                return [firstNearest[0], secondNearest[0]];
            }
    } else {
        return null;
    }
}

export default checker;