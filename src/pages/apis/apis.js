const port='http://192.168.1.81:8082'

export const login =()=>
    `${port}/api/v1/admin/login`;

export const signup=()=>
    `${port}/api/v1/signup`;

export const addTruck=()=>
    `${port}/api/v1/add-truck`

export const driverInfo=()=>
    `${port}/api/v1/add-driver`

export const helperInfo=()=>
    `${port}/api/v1/add-helper`

export const getProfile=(id)=>
    `${port}/api/v1/profile?id=${id}`

export const getTruck=(id)=>
    `${port}/api/v1/trucks?admin_id=${id}`

export const getDriver=(id)=>
    `${port}/api/v1/drivers?admin_id=${id}`

export const getHelper=(id)=>
    `${port}/api/v1/helpers?admin_id=${id}`

export const addTrip=()=>
    `${port}/api/v1/add-trip`

export const getTrips=(id,limit)=>
    `${port}/api/v1/trips?admin_id=${id}&page=1&limit=${limit}`