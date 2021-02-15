module.exports = {
    calculateDistance,
	sortingByCompany,
	sortByKey
};

function calculateDistance(coordinates, meetingCoordinates, unit){
	
	var lat1 = coordinates.lat;
	var lat2 = meetingCoordinates.lat;
						  
	var lon1 = coordinates.lng;
	var lon2 = meetingCoordinates.lng;
	
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
	
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