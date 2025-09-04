"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authentication, provider } from "@/firebase"
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"


export default function Login(){
    const router = useRouter()

    useEffect(()=>{
        onAuthStateChanged(authentication, user=>{
            if (user) {
                router.push('/')
            }
        })
    },[])


    return (
        <div>
            <h5 className="bg-black text-white text-8xl items-center"
            >Uber</h5>
            <img src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_638,w_956/v1565733741/assets/0f/9719ad-69a4-4c0d-9444-ce6d8c3f9759/original/Signup.svg"/>
            <button className="bg-gray-900 text-white px-5 py-2 mt-3 w-screen text-xl"
                    onClick={()=>signInWithPopup(authentication,provider)}
                    >Login with Google</button>
        </div>
        
    )
}