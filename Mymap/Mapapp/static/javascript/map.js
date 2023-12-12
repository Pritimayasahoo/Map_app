let heading=document.getElementById('city')
let cityname=document.getElementById('cityform')
let c_name=document.getElementById("cityvalue")
c_name.focus()

//check if navigator.geolocation available in your broswer
if (navigator.geolocation)
{ 
  navigator.geolocation.getCurrentPosition(function (position)
  {
    let latitude=position.coords.latitude
    let longitude=position.coords.longitude
    
    //initialize map
    let map = L.map('map').setView([latitude,longitude],13);
    
    //draw  map on display
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude,longitude]).addTo(map).bindPopup(L.popup(
      {
        maxWidth:300,
        minWidth:60,
        autoClose:false,
        closeOnClick:false,
        content:`Your location`
      })).openPopup()

    //Api key
    let api_key="bf1fea6f9a7149dc9623df1a5911a4c4"


    //found details of a position(cordinate)
    const pos_detail=async function(lat,lng)
                        {
                          try
                           {
                            const responce=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`)
                            const data=await responce.json()
                            heading.innerText=data.results[0].formatted
                           }
                          catch
                           {
                            alert("something wrong")
                           }
                        }


    //move map to given city
    const new_city=async function(city)
                        {
                          try
                           {
                            const responce=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${api_key}`)                                                                         
                            const data=await responce.json()                                                                         
                            let lat=data.results[0].geometry.lat                                                                         
                            let lng=data.results[0].geometry.lng
                            
                            //use custom marker
                            const redIcon = L.icon(
                                          {
                                            iconUrl: 'https://cdn.pixabay.com/photo/2013/07/13/11/57/landmark-159035_960_720.png', //icon image path
                                            iconSize: [25, 41], // Icon size in pixels
                                            iconAnchor: [12, 41], // The point of the icon that corresponds to the marker's location
                                            popupAnchor: [1, -34] // The point from which the popup should open relative to the iconAnchor
                                          }
                                          );
                            //place marker at the new city
                            L.marker([lat, lng], { icon: redIcon }).addTo(map).bindPopup(L.popup(
                                {
                                  maxWidth:300,
                                  minWidth:60,
                                  autoClose:false,
                                  closeOnClick:false,
                                  content:`${city}`
                                }
                                )).openPopup()

                            //move the map to given city
                            map.setView([lat,lng],13);
                           }
                          catch
                           {
                             alert("something is wrong")
                           }
                        }



    //click on map to get detail of that position
    map.on('click',function(mapEvent)
                    {
                      const lat=mapEvent.latlng.lat
                      const lng=mapEvent.latlng.lng
                      pos_detail(lat,lng)

                    }
                    )  


    //Submit the city form
    cityname.addEventListener('submit',function(e)
                                        {
                                         e.preventDefault()
                                         let inputValue =c_name.value;
                                         c_name.value = ""; 
                                         new_city(inputValue)
                                        }
                             )

  }
  )
}

