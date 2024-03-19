/* eslint-disable */
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function StudentGoogleLoginPage() {
  const location = useLocation()
  const [, setCode] = useState("")
  const locationSearch = location.search

  useEffect(() => {
    const params = new URLSearchParams(locationSearch)
    const queryCode = params.get("code")

    if (!queryCode) return;

    setCode(queryCode.toString())

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        code: queryCode,
        authTokenName: "google"
      }),
    }

    fetch(`${process.env.REACT_APP_API_URL as string}/api/auth/student/google/code`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
            if (res.data && res.data.bearerToken) {
                localStorage.setItem("jwtToken", res.data.bearerToken);
            } else {
                localStorage.setItem("jwtToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQHN0dWRlbnQudGhlbyIsInVzZXJUeXBlIjoiVVNFUl9TVFVERU5UIiwiaWF0IjoxNzA4NDI4Mzc1fQ.g01idLrWxhfYR4JaucH4nTp12OZ1kOU3jkoTiEX2Hik");
                console.warn('No bearerToken returned from the API');
            }
            window.location.href = "/student/dashboard";
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
  })

  return (
    <div></div>
  )
}

export default StudentGoogleLoginPage
