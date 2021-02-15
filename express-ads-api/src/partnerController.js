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
		//inRangePartners.push(partnerController.getInRangePartnersDetails(partner, meetingCoordinates, range));		
	
		offices = partner.offices;
	    inRangeOffices = {offices:[]};
		offices.forEach(function(office) {
			office.contCoordinates = contCoordinates;
			office.contCoordinates.lat = office.coordinates.split(',')[0];
			office.contCoordinates.lng = office.coordinates.split(',')[1];
			office.distance = utils.calculateDistance(office.contCoordinates, meetingCoordinates);

			office.inRangeOffice = 0;
			partner.inRange = 0
			if(office.distance <= range)
			{
				partner.inRange = 1
				office.inRangeOffice = 1;
			    inRangeOffices.offices.push({ 
					"location" : office.location,
					"address"  : office.address,
					"officeInRange" : office.inRangeOffice,
					"distance" : office.distance
				});
				
			}

		})
		if(partner.inRange == 1)
		{   
		   inRangePartners.partners.push({ 
				"companyName" : partner.organization,
				"address"  : partner.customerLocations,
				"inRange" : partner.inRange,
				 inRangeOffices 

			});
		}
	})
	
	
		
//	for (var prop in inRangePartners)
//		  sortedInRangePartnersList.push([prop, inRangePartners[prop]])
//	sortedInRangePartnersList.sort(function(a, b) {return a[1][0].companyName - b[1][0].companyName});
//	inRangePartners=sortedInRangePartnersList;
	
	
//	
//	var sortable = [];
//	for (var prop in $scope.accounts)
//		  sortable.push([prop, $scope.accounts[prop]])
//	sortable.sort(function(a, b) {return a[1][0].accountorder - b[1][0].accountorder});
//	$scope.accounts=sortable;
	
	
//	inRangePartners = utils.sortByKey(inRangePartners, 'companyName');
	
	
//	inRangePartners.sort(function(a, b) {
//    	return a.companyName - b.companyName;
//	});
	
	inRangePartners.partners.sort(function(a, b) {
		return a.companyName < b.companyName ? -1 : a.companyName > b.companyName ? 1 : 0;
	});

	return inRangePartners;
}