'use client'

import Map from "./Component/Map"
import Link from "next/link"
import { authentication } from "@/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const uber_logo = 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg'
const default_profile={
  name: authentication.name,
  src:"https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F426d1bae-ee2a-4ef8-9ae0-37c9c31fae56.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1"
}

export default function Home() {
  const router = useRouter()
  const[user, setUser] = useState<{name: any; photo: any}>({name: null, photo: null})

  useEffect(()=>{
    onAuthStateChanged(authentication, user=>{
      if (user) {
          setUser({
            name: user.displayName,
            photo: user.photoURL
          })
      } else{
        router.push('/login')
      }
  })
  },[])
  return(

    //DIV for the big container
    <div className="flex flex-col h-screen">

      {/* <Map/> */}

      {/*DIV for the lower parts as the big container*/}
      <div className="flex-1 pt-5">
        
        {/* HEADER */}
        <div className="flex justify-around gap-24 items-center mt-5">
          <Link href="/">
            <img src={uber_logo} 
                className="h-16"
            />
          </Link>
          <div className="flex items-center gap-2">
            <p>{ user.name }</p>
            <img src={ user.photo}
                 className="h-10 w-11 rounded-full border border-grey-200 p-px"
            />
          </div>
        </div>

        {/* MENU BUTTON */}
        <div className="flex m-10 ">
          <Link href="/search">
            <div className="flex flex-1 bg-gray-200 m-1 flex-col items-center justify-center rounded-lg transform hover:scale-95 transition">
              <img style={{height: "8rem"}}
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" />
              Ride
            </div>
          </Link>

          <div className="flex flex-1 bg-gray-200 m-1 flex-col items-center justify-center rounded-lg transform hover:scale-95 transition">
            <img className="h-24" 
            src="https://i.ibb.co/n776JLm/bke.png" />
            Wheels
          </div>

          <div className="flex flex-1 bg-gray-200 m-1 flex-col items-center justify-center rounded-lg pt-4 transform hover:scale-95 transition">
            <img className="h-20" 
            src="https://www.freeiconspng.com/thumbs/calendar-icon-png/calendar-icon-png-4.png"/>
            Reserve
          </div>

        </div>

        {/* INPUT PLACE */}
        <div className="h-20 bg-gray-300 text-2xl m-10 flex items-center mt-8 p-6 rounded-lg">
          Where to...
        </div>
      </div>
    </div>
  )
}


