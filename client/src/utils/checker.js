import { getPreciseDistance, findNearest } from 'geolib'

const checker = (location_1, location_2, busStops) => {

    const distance = getPreciseDistance(
        {latitude: location_1.y, longitude: location_1.x},
        {latitude: location_2.y, longitude: location_2.x}
    )
    if (distance < 600) {
        const firstNearest = findNearest(
            {lat: location_1.y, lng: location_1.x}, 
            busStops.map((busStop) => {
                return {lat: busStop.location[0], lng: busStop.location[1]}
            })
        )
        console.log(firstNearest);
    }
}

export default checker;