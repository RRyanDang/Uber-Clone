'use client'
// const[pickUpLocation, setPickUpLocation] = useState([0,0])
// const[pickUpLocation, setPickUpLocation] = useState<{coordinate: [number, number]}>({
//     coordinate: [0,0]
// })

// const[destination, setDestination] = useState<{coordinate:[number, number]}>({
//     coordinate: [0,0]
// })
import Map from "../Component/Map"
import { useEffect, useState } from "react"
import { map_token } from "../Component/Map"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

type places={
    pickUp: string | null
    destinationPlace: string | null
}

export default function Confirm(){
    const searchParams = useSearchParams()
    const pickUp: places['pickUp'] = searchParams.get('pickUp')
    const destinationPlace: places['destinationPlace'] = searchParams.get('destinationPlace')

    //default coordinates for both locations will be [0,0], but this should not matter as the new locations will be processed anyway
    const[pickUpLocation, setPickUpLocation] = useState<[number, number]>([0,0])
    const[destination, setDestination] = useState<[number, number]>([0,0])

    const[roadDuration, setRoadDuration] = useState(0)
    useEffect(()=>{
        const rideDuration = fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpLocation[0]},${pickUpLocation[1]};${destination[0]},${destination[1]}
                    access_token=${map_token}`
                )
                .then(res=>res.json())
                .then(data => {
                    setRoadDuration(data.routes[0].duration/100)
                })
    },[pickUpLocation, destinationPlace])

    function getPickUpCoordinate(pickUp: places['pickUp']){
        const location = pickUp
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?`+
            new URLSearchParams({
                access_token: map_token
            })
        )
        .then(response => response.json())
        .then(data => {
            setPickUpLocation(data.features[0].center)
        })
    }
    function getDestinationCoordinate(destinationPlace: places['destinationPlace']){
        const location = destinationPlace
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?`+
            new URLSearchParams({
                access_token: map_token
            })
        )
        .then(response => response.json())
        .then(data => {
            setDestination(data.features[0].center)
        })
    }
    //This will be called ONLY ONCE everytime a client accesses the /confirm with the input locations
    useEffect(()=>{
        getPickUpCoordinate(pickUp);
        getDestinationCoordinate(destinationPlace);
    }, [])


    return(
        <div className="flex flex-col h-screen">
            <Link href="/">
            {/* back button next */}
                <div className="text-5xl pl-5 mb-3"
                >&larr;</div>
            </Link>
            <Map pickUpCoordinate={pickUpLocation} destinationCoordinate={destination}/>
            
            <div className="flex-1">
                <p className="text-grey-500 text-center text-xs py-2 border-b-2"
                >Choose a ride, or swipe up for more</p>
                {/* This is for the car list */}
                <div>
                    <div className="flex flex-row items-center">
                        <img className="h-24 m-2"
                        src="https://www.svgrepo.com/show/408291/car-white.svg"/>
                        <div className="flex-1">
                            <p className="font-semibold text-base">UberX</p>
                            <p className="text-sky-400"
                            >5 min away</p>
                        </div>
                        <p>{`$`+(roadDuration*2.1).toFixed(2)}</p>
                    </div>
                </div>
            </div>   
        </div>
    )
}