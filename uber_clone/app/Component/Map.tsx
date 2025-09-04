import { useEffect } from "react";
import mapboxgl from "mapbox-gl"
export const map_token = mapboxgl.accessToken = 'pk.eyJ1Ijoib2Rkam9ic3J5YW4iLCJhIjoiY20wa2dlcmJ0MHd3djJxcHk3Y3J1ZzRhcCJ9.8cLPHpY1-5fDVsj-4nZ6Eg'

type MapCoordinate={
    pickUpCoordinate: [number, number]
    destinationCoordinate: [number, number]
}

//have no idea how to specify the map's type
function addMarker(map: any, coordinate: MapCoordinate['pickUpCoordinate']){
    const marker1 = new mapboxgl.Marker()
    .setLngLat(coordinate)
    .addTo(map)
}

export default function Map({pickUpCoordinate,destinationCoordinate}: MapCoordinate) {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/navigation-day-v1',
            center: [-99.29011, 39.39172],
            zoom: 3,
        })
        // const nav = new mapboxgl.NavigationControl()
        // map.addControl(nav)

        if (pickUpCoordinate){
            addMarker(map, pickUpCoordinate)
        }
        if(destinationCoordinate){
            addMarker(map, destinationCoordinate)
        }
        if(pickUpCoordinate && destinationCoordinate){
            map.fitBounds([
                pickUpCoordinate,
                destinationCoordinate
            ],{
                padding: 60
            })
        }
    },[pickUpCoordinate, destinationCoordinate])

    

    return <div id="map"
                className="flex-1"
    ></div>
}

