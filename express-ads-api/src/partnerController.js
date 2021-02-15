var utils = require('./utils.js');

module.exports = {
    getInRangePartnersDetails
};

function getInRangePartnersDetails(partners, meetingCoordinates, range) { 
	var offices = null;
	var inRangePartners = {partners: []};
	var inRangeOffices = {offices:[]};
	var contCoordinates = {lat: 0, lng: 0};
	var sortedInRangePartnersList = [];
	
	
	partners.forEach(function(partner){	
		
		offices = partner.offices;
	    inRangeOffices = {offices:[]};
		offices.forEach(function(office) {
			office.contCoordinates = contCoordinates;
			office.contCoordinates.lat = office.coordinates.split(',')[0];
			office.contCoordinates.lng = office.coordinates.split(',')[1];
			
			//calculate distance between starbuck london coordinates and the offices coordinates
			office.distance = utils.calculateDistance(office.contCoordinates, meetingCoordinates);

			office.inRangeOffice = 0;
			partner.inRange = 0
			
			// push the offices details that are in range
			if(office.distance <= range)
			{
				partner.inRange = 1
				office.inRangeOffice = 1;
			    inRangeOffices.offices.push({ 
					"location" : office.location,
					"address"  : office.address,
					//"officeInRange" : office.inRangeOffice,
					"distance" : office.distance
				});
				
			}

		})
		// push the details of partners that are in range (Company Name, address and the above offices)
		if(partner.inRange == 1)
		{   
		   inRangePartners.partners.push({ 
				"companyName" : partner.organization,
				"address"  : partner.customerLocations,
				//"inRange" : partner.inRange,
				 inRangeOffices 

			});
		}
	})
	
	//sort output by Company Name ascending
	inRangePartners.partners.sort(function(a, b) {
		return a.companyName < b.companyName ? -1 : a.companyName > b.companyName ? 1 : 0;
	});

	return inRangePartners;
}