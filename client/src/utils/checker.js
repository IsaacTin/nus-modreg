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
            } else if (checkSimilar(firstNearest[0], secondNearest[0])) {
                return [firstNearest[0], secondNearest[0]];
            } else {
                const distance1 = getPreciseDistance(
                    {latitude: location_1.y, longitude: location_1.x},
                    {latitude: firstNearest[0].location[0], longitude: firstNearest[0].location[0]}
                )
                const distance2 = getPreciseDistance(
                    {latitude: location_2.y, longitude: location_2.x},
                    {latitude: secondNearest[0].location[0], longitude: secondNearest[0].location[0]}
                )
                console.log(busStops);
                if (busStops.length === 0) {
                    return null;
                } else if (distance1 <= distance2) {
                    const filteredBusStops = busStops.filter((stop) => stop !== firstNearest[0])
                    return checker(location_1, location_2, filteredBusStops);
                } else {
                    const filteredBusStops = busStops.filter((stop) => stop !== secondNearest[0]) 
                    return checker(location_1, location_2, filteredBusStops);
                }
            }
        } else {
        return null;
    }
}

const checkSimilar = (NearestFirst, NearestSecond) => {
    for (let i = 0; i < NearestFirst.routes.length; i++) {
        for(let k = 0; k < NearestSecond.routes.length; k++) {
            if (NearestFirst.routes[i] === NearestSecond.routes[k]) {
                return true;
            }
        }
    }
    return false;
}

export default checker;