/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var lat = prompt("Latitude");
var long = prompt("Longitude");

const geocoder = new google.maps.Geocoder();

var latlng = new google.maps.LatLng(lat, long);
var typeId = google.maps.MapTypeId.ROADMAP;
var mapOptions =
        {
            center: latlng,
            zoom: 3,
            mapTypeId: typeId
        };

var map;
function initiaize()
{
    
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, mapOptions);
};


google.maps.event.addDomListener(window, 'load', initiaize);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let latnew = lat;
let longnew = long;

let north;
let east;
let south;
let west;
let antipodl;
function button1()
{
    longnew = Math.random() * -180.0 + 180.0;
    latnew = Math.random() * -90.0 + 90.0;
    latlng = new google.maps.LatLng(latnew, longnew);
    map.panTo(latlng);

    north = google.maps.geometry.spherical.computeOffset(latlng, 500000, 0);
    east = google.maps.geometry.spherical.computeOffset(latlng, 500000, 90);
    south = google.maps.geometry.spherical.computeOffset(latlng, 500000, 180);
    west = google.maps.geometry.spherical.computeOffset(latlng, 500000, -90);

    let locations = [latlng, north, east, south, west];
    let title = ["center", "north", "east", "south", "west"]
    let markers = [];

    for (let i = 0; i < locations.length; i++)
    {
        markers.push(new google.maps.Marker(
                {
                    position: locations[i],
                    map: map,
                    title: title[i],
                    icon: {
                        url: i == 0 ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    }
                }));

    }

    for (let i = 0; i<markers.length; i++)
    {
        if (i != 0)
        {
            putmarker(i, latlng, 250000);
        }
    }

    function putmarker(num, latlng, n)
    {
        google.maps.event.addListener(markers[num], "click", function () {

            let value = getvalue(markers[num].title);
           
            let newlocation = google.maps.geometry.spherical.computeOffset(latlng, n, value);
            
            map.panTo(newlocation);
            
            new google.maps.Marker(
                {
                    position: newlocation,
                    map: map,
                    title: 'I am here',
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                    }
                });
        });
        
    }
    
    google.maps.event.addListener(markers[0], "click", function () {
        let antipod;
        console.log(markers[0].getPosition().lat());
        if (markers[0].getPosition().lng() <= 0)
        {
            antipod = new google.maps.LatLng(-markers[0].getPosition().lat(), markers[0].getPosition().lng()+180);
        }
        else 
        {
            antipod = new google.maps.LatLng(-markers[0].getPosition().lat(), markers[0].getPosition().lng()-180);
        }
        
        map.panTo(antipod);
        
        new google.maps.Marker(
                {
                    position: antipod,
                    map: map,
                    title: 'I am here',
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    }
                });
                
       
       north = google.maps.geometry.spherical.computeOffset(antipod, 300000, 0);
       east = google.maps.geometry.spherical.computeOffset(antipod, 300000, 90);
       south = google.maps.geometry.spherical.computeOffset(antipod, 300000, 180);
       west = google.maps.geometry.spherical.computeOffset(antipod, 300000, -90);
       
       
       var locations2 = [antipod, north, east, south, west];
        var title2 = ["center", "north", "east", "south", "west"]
        markers = [];
       
       for (var i = 0; i < locations2.length; i++)
        {
            markers.push(new google.maps.Marker(
                    {
                        position: locations2[i],
                        map: map,
                        title: title2[i],
                        icon: {
                            url: i == 0 ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                        }
                    }));

        }
        
        for (let i = 0; i<markers.length; i++)
        {
            if (i != 0)
            {
                putmarker(i,antipod, 150000);
            }
        }
    });
        

}


function getvalue(title)
{
    if (title === "south")
    {
        return 180;
    } 
    else if (title == "east")
    {
        return 90;
    } 
    else if (title == "north")
    {
        return 0;
    } 
    else if (title == "west")
    {
        return 270;
    }
}

function button2()
{
    if (latlng == null){
        return;
    }
    var area = new google.maps.MVCArray();
    
    var polygon = new google.maps.Polygon({
        path: area,
        strokeColor: "#b2b2b2",
        strokeOpacity: 0.7,
        storkeWeight: 6,
        fillColor: "#b2b2b2",
        fillOpacity: 0.5
    });
    
    polygon.setMap(map);
    
    var path = polygon.getPath();
    path.push(north);
    path.push(east);
    path.push(south);
    path.push(west);
    
    google.maps.event.addListener(polygon, 'mouseout', function(){
        polygon.setOptions(
                {
                    fillColor: "#b2b2b2",
                    strokeColor: "#b2b2b2"
                })
    });
    
    google.maps.event.addListener(polygon, 'mouseover', function(){
        polygon.setOptions(
                {
                    fillColor: "#f85f5a",
                    strokeColor: "#acf468"
                })
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function button3()
{
    const listener = function(e){
        latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
       
    
        map.panTo(latlng);

        marker1 = new google.maps.Marker(
                        {
                            position: latlng,
                            map: map,
                            title: "user position",
                            icon: {
                                url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png' 
                            }
                        });

        distance200 = google.maps.geometry.spherical.computeOffset(latlng, 200000, 90);
        map.panTo(distance200);

        marker2 = new google.maps.Marker(
                        {
                            position: distance200,
                            map: map,
                            title: "200km away",
                            icon: {
                                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                            }
                        });

        let centerpoint = google.maps.geometry.spherical.computeOffset(latlng, 100000, 90);

        let circle = new google.maps.Circle({
            strokeColor: "purple",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "purple",
            fillOpacity: 0.35,
            map,
            center: centerpoint,
            radius: 100000
        });

        google.maps.event.addListener(circle, 'click', function(){


           for(let i = 0; i<10; i++)
           {
               let degree = Math.random()*360
               let perimeter = google.maps.geometry.spherical.computeOffset(centerpoint, 100000, degree);

               new google.maps.Marker(
                        {
                            position: perimeter,
                            map: map,
                            title: "10 markers",
                            icon: {
                                url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
                            }
                        });
           }

        });
       google.maps.event.clearListeners(map,"click", listener) 
    }
    
    google.maps.event.addListener(map, "click", listener)
    
    
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function button4()
{
    
    longnew = Math.random() * -180.0 + 180.0;
    latnew = Math.random() * -90.0 + 90.0;
    latlng = new google.maps.LatLng(latnew, longnew);
    map.panTo(latlng);

    north = google.maps.geometry.spherical.computeOffset(latlng, 150000, 45);
    east = google.maps.geometry.spherical.computeOffset(latlng, 150000, -45);
    south = google.maps.geometry.spherical.computeOffset(latlng, 150000, 135);
    west = google.maps.geometry.spherical.computeOffset(latlng, 150000, -135);
    
    let positions = [latlng, north, east, south, west];

    for (var i = 0; i<5; i++)
    {
        let content;
        let marker = new google.maps.Marker(
        {
            position: positions[i],
            map: map,
            title: "10 markers",
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
            }
        });
        
        let infoWindow;
        geocoder.geocode({location: marker.position}, (results, status) => {
            if (status === "OK"){
               let script = document.createElement('script')
                script.setAttribute('src', `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.position.lat()},${marker.position.lng()}&key=AIzaSyAy6THN8bti_fmZ679zo925wc1ta7sL8uc`);
                document.head.appendChild(script);
                infoWindow = new google.maps.InfoWindow({
                content: `<div style="color: black">
                                <h3> Information </h3>
                                <p> Address: ${results[0].formatted_address} </p>
                                <p> Lat: ${marker.position.lat()} </p>
                                <p> Lng: ${marker.position.lng()} </p>
                                <p> ID: ${results[0].place_id} </p>
                          </div>`
                });
            }
        })
        
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
        })
    }
    
    
    let rectangle = new google.maps.Rectangle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        bounds: {
          north: north.lat(),
          south: south.lat(),
          east: google.maps.geometry.spherical.computeOffset(latlng, 150000, 45).lng(),
          west: west.lng(),
        },
  });
 
  for (var i = 0; i<3; i++)
  {
      let degree = Math.random()*360
      
      let distance = Math.random()*110000
      
      let perimeter = google.maps.geometry.spherical.computeOffset(latlng, distance, degree);
           
        let marker = new google.maps.Marker(
             {
                 position: perimeter,
                 map: map,
                 title: "3 markers",
                 icon: {
                     url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                 }
             });
             
        let infowindow = new google.maps.InfoWindow({
            content: '<div style="blue"> markers within square </div>'
        });
             
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        })
  }
  
  
  
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let boo = false;
let path;

function button5()
{
  const heatmap = new google.maps.visualization.HeatmapLayer
  
  let markers = [];
  
  
  const mouseclick = function(e){
      path.push(e.latLng)
      polygon.setPath(path)
      polygon.setMap(map)
      google.maps.event.addListener(polygon, "mouseover", () => {
          
          //.map loop
          const lat = polygon.getPath()[Object.keys(polygon.getPath())[0]].map(points => points.lat()).sort()
          const lng = polygon.getPath()[Object.keys(polygon.getPath())[0]].map(points => points.lng()).sort()

          
          if (path.length == 2)
          {
              return;
          }

          let count = 0
          
          while (count <=100)
          {
              let randomlat = Math.random()*(lat[lat.length-1])+lat[0]
              let randomlng = Math.random()*(lng[lng.length-1])+lng[0]
              
              latlng = new google.maps.LatLng(randomlat, randomlng)
              if (google.maps.geometry.poly.containsLocation(latlng, polygon))
              {
                markers.push(new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: "3 markers",
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    }
                }))
                
                polygon.setOptions({
                    strokeColor: "blue",
                    fillColor: "red"
                })
                
                count++ 
              }
          }
          const markerposition = markers.map(a => a.position)
          heatmap.setData(markerposition)
          heatmap.setMap(map)
      })
      
      google.maps.event.addListener(polygon, "mouseout", () => {
          for (let i = 0; i<markers.length; i++)
          {
              markers[i].setMap(null);
          }
          
          markers = [];
          
          polygon.setOptions({
            strokeColor: "red",
            fillColor: "blue"
        });
        
         heatmap.setMap(null)
        heatmap.setData([])
      });
      
  };
  
  if (boo)
  {
      google.maps.event.clearListeners(map, "click", mouseclick)
      boo = false;
      return;
  }
  
  
    
  let areapolygon = new google.maps.MVCArray();
  let areapolyline = new google.maps.MVCArray();
    
    let polygon = new google.maps.Polygon({
        path: areapolygon,
        strokeColor: "red",
        strokeOpacity: 0.7,
        storkeWeight: 6,
        fillColor: "blue",
        fillOpacity: 0.5
    });
    
    
    let polyline = new google.maps.Polyline({
        path: areapolyline,
        strokeColor: "blue",
        strokeOpacity: 0.7,
        storkeWeight: 6,
        fillColor: "red",
        fillOpacity: 0.5
    })
    
    path = polyline.getPath();
    
    polyline.setMap(map);
    
    google.maps.event.addListener(map, "click", mouseclick)


     boo = true;

     



}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function button6()
{
   if (map.overlayMapTypes.length > 0) 
   {
       map.overlayMapTypes.clear()
       return;
   }
    let latlng = new google.maps.LatLng(0, 0);
    map.panTo(latlng)
    let weatherlayers = ["precipitation_new", "wind_new", "clouds_new", "pressure_new"]

    for (let i = 0; i< weatherlayers.length; i++)
    {
        let imagetype = new google.maps.ImageMapType({
            getTileUrl: function(coordinate, zoom){
                return `https://tile.openweathermap.org/map/${weatherlayers[i]}/${zoom}/${coordinate.x}/${coordinate.y}.png?appid=0248c1cd6eb4ee5a641801f30fc92a97`
            }, 
            tileSize: new google.maps.Size(256, 256)
        })
        map.overlayMapTypes.push(imagetype)
    }
    
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let transporttype = document.getElementById("transporttype")
function button7()
{
    let latlngsource;
    let clickarray = []
    const listener = function(e){
        latlngsource = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
        clickarray.push(latlngsource)
        
         if (clickarray.length == 2)
         {
             google.maps.event.clearListeners(map, "click", listener)
             
             map.panTo(clickarray[0]);
             
             transporttype.style.display = "block"
             
             //choose route
             let transportmodes = transporttype.querySelectorAll("input")
             transportmodes.forEach(mode => {
                 mode.addEventListener("input", function(){
                     if (mode.checked)
                     {
                         
                         let request = {
                             origin: clickarray[0],
                             destination: clickarray[1],
                             provideRouteAlternatives: true, 
                             travelMode: google.maps.TravelMode[mode.value]
                         }
                         
                         let directionService = new google.maps.DirectionsService()
                         let directionRenderer = new google.maps.DirectionsRenderer({
                             polylineOptions: {
                                 strokeColor: polylinecolour(mode.value)
                                 
                             }
                         })
                         
                         directionRenderer.setMap(map)
                         directionService.route(request, function(result, status) {
                             if (status == "OK")
                             {
                                 directionRenderer.setDirections(result)
                                
                                
                                
                                 for (let m of result.routes[0].legs[0].steps)
                                 {
                                     
                                     let div = document.createElement("div")
                                        div.innerHTML = `<div style="color: black">
                                                <p class="info">  </p>
                                                <div class="image" style="width: 150px; height: 150px;">

                                                </div>
                                          </div>`
                                     
                                     let marker = new google.maps.Marker(
                                        {
                                            position: m.start_location,
                                            map: map,
                                            title: "user position",
                                            icon: {
                                                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' 
                                            }
                                        });
                                        
                                        let infoWindow = new google.maps.InfoWindow({
                                            content: div
                                        });
                                        
                                        
                                        infoWindow.content.querySelector(".info").innerHTML = m.instructions
                                          
                                         new google.maps.StreetViewPanorama(infoWindow.content.querySelector(".image"), {
                                             position: m.start_location, 
                                             pov: {
                                                 heading: 34,
                                                 pitch: 10
                                             }
                                         })
                                         
                                         google.maps.event.addListener(marker, 'click', function() {
                                            infoWindow.open(map, marker);
                                        })
                                        
                                 }
                             }
                         })
                         
                     }
                 })
             })
             
            function polylinecolour(mode)
            {
                if (mode == "WALKING")
                {
                    return "red"
                }
                else if (mode == "DRIVING")
                {
                    return "blue"
                }
                else if (mode == "TRANSIT")
                {
                    return "purple"
                }
                else
                {
                    return "yellow"
                }
            }
             
            for (let i = 0; i <clickarray.length; i++)
            {
                new google.maps.Marker(
                {
                    position: clickarray[i],
                    map: map,
                    title: "user position",
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png' 
                    }
                });
            }
            
           
            
           
            
            
         }
    }
    
    google.maps.event.addListener(map, "click", listener)
    
   
    
    
    
    
}