const port='http://103.209.147.20:8082'

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

export const getTrips=(id,page)=>
    `${port}/api/v1/trips?admin_id=${id}&page=${page}&limit=5`

export const gpsData=(truckId,id)=>
    `${port}/api/v1/gps-data/latest?truck_id=${truckId}&admin_id=${id}`