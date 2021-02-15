module.exports = {
    calculateDistance,
	sortingByCompany,
	sortByKey
};

//Radius of earth calculation with R is not accurate
var R = 6371000;

// function to calculate the distance in km between 2 points with different coordinates
function calculateDistance(coordinates, meetingCoordinates){
	
	var lat1 = coordinates.lat;
	var lat2 = meetingCoordinates.lat;
						  
	var lon1 = coordinates.lng;
	var lon2 = meetingCoordinates.lng;
	
	// convert to radian
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
	//var theta = ((Math.PI * lon2/180) - (Math.PI * lon1/180))
    var radtheta = Math.PI * theta/180
	
	// apply formula great-cercle distance: (haversine): 
	//radlat1 = lat1 * Math.PI/180 , radla2= lat2 * Math.PI/180, tetha (lon2 - lon1) * Math.PI/180, R= 6371000
	//d = Math.acos(Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2 ) * Math.cos(theta))* R
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
	
// 1.609344 is the number of kilometres in a mile; 60 is the number of minutes in a degree; 1000 is the number of metres in a kilometre; and 1.1515 is the number of statute miles in a nautical mile (thanks, DanM). One nautical mile is the length of one minute of latitude at the equator.
//	dist = toDegrees(acos(dist)) * 60 * 1.1515 * 1.609344 * 1000;
	//km
	dist = dist * 1.609344 

    return dist
}

function sortingByCompany(a, b) {
    return a.organization < b.organization ? -1 : a.organization > b.organization ? 1 : 0;
}

function sortByKey(array, key)
{
	return array.sort(function(a, b)
 	{
  		var x = a[key]; var y = b[key];
  		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 	});
}