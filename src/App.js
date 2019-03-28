import React, {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'
import ListItem from './components/List'

const placesBackend = 'http://localhost:3333/places'
const bookingsBackend = 'http://localhost:3333/bookings'
const userBookingsBackend = 'http://localhost:3333/users/1/bookings'

function App() {
  const [data, setData] = useState([])
  const [myLocation, setLocation] = useState({})
  const [bookingsData, setBookingsData] = useState([])

  useEffect(() => {
    navigator.geolocation
      .getCurrentPosition(({coords: {latitude, longitude}}) => {
        setLocation({latitude, longitude})
      })
  }, [])

  useEffect(() => {
    if (myLocation.latitude) {
      axios.get(`${placesBackend}?lat=${myLocation.latitude}
      &long=${myLocation.longitude}`)
        .then(result => {
          setData(result.data)
        })
    }
  }, [myLocation])

  useEffect(() => {
    if (myLocation.latitude) {
      axios.get(userBookingsBackend).then(result => {
        setBookingsData(result.data.map(d => d.propertyId))
      })
    }
  }, [myLocation])

  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="content">
        {myLocation.longitude ?
          <ul>
            {data.map(({id, name, vicinity}, i) => {
              console.log(data)
              return (
                <ListItem
                  key={i}
                  name={name}
                  address={vicinity}
                  isBooked={bookingsData.includes(id)}
                  onBook={() => {
                    axios({
                      method: 'post',
                      url: bookingsBackend,
                      data: {
                        propertyId: id,
                        propertyName: name,
                        city: 'Munich',
                        booked: true,
                        UserId: 1,
                      },
                    }).then(() => {
                      console.log(bookingsData)
                      if (!bookingsData.includes(id)) {
                        setBookingsData(bookingsData.concat(id))
                        console.log(bookingsData)
                      }
                    }).catch(err => console.log(err));
                  }}
                />
              )
            })}
          </ul>
          : <p>Loading...</p>}
      </div>
    </div>
  )
}

export default App
