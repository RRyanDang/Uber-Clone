'use client'

import {useState} from "react"
import Link from "next/link"
// npm install bootstrap-icons, then import the statement below
import "bootstrap-icons/font/bootstrap-icons.css"

export default function Search() {
    //need TS here
    const[pickUp, setPickUp] = useState("")
    const[destination, setDestination] = useState("")

    return (
        <div className="bg-gray-200 h-screen m-0">
            <div className="bg-white">
                {/* BACk BUTTON */}
                <Link href="/">
                    <div className="text-5xl pl-5 mb-3">&larr;</div>
                </Link>

                {/* NAVIGATION SECTION */}
                <div className="flex flex-row items-center">
                    <div className="flex flex-col ml-5 items-center">
                        {/* <p className="text-2xl">&#9679;</p> */}
                        <i className="bi bi-circle-fill text-xs"></i>
                        <p className="text-2xl h-9">|</p>
                        {/* <p>&#9632;</p> */}
                        <i className="bi bi-square-fill text-xs"></i>
                    </div>

                    <div className="flex flex-col ml-5">
                        <input type="text" placeholder="From here"
                            value={pickUp}
                            onChange={(e)=>setPickUp(e.target.value)}
                            className="w-96 max-w-96 h-10 bg-gray-100 my-2 p-2 outline-none border-none" />
                        
                        <input type="text" placeholder="To here"
                            value={destination}
                            onChange={(e)=>setDestination(e.target.value)}
                            className="w-96 max-w-96 h-10 bg-gray-100 my-2 p-2 outline-none border-none" />
                    </div>

                    <div>
                        <i className="bi bi-arrow-down-up ml-5 text-2xl"></i>
                    </div>
                </div>
            </div>

            {/* SAVED LOCATIONS */}
            <div className="flex flex-row mt-3 items-center bg-white px-5 py-2">
                <i className="bi bi-bookmark-star bg-white mr-2 text-lg"></i>
                <p>SAVED PLACES</p>
            </div>

            {/* CONFIRM DESIRED LOCATION */}
            <div>
                <Link href={{
                    pathname: "/confirm",
                    query:{
                        pickUp: pickUp,
                        destinationPlace: destination
                    }
                }}>
                    <button className="bg-gray-900 text-white px-5 py-2 mt-3 w-screen text-xl"
                    >Confirm Location</button>
                </Link>
            </div>


        </div>





        //CONFIRM DESIRED LOCATION

    )
}