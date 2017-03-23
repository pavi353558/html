const readline = require('readline');
const fs = require('fs');
var arrayOne=[];
const rl = readline.createInterface({
  input: fs.createReadStream('AgricultureProduction.csv')
});
//Converting CSV file to Array
rl.on('line', (line) => {
    arrayOne.push(line);
})
.on('close', () => {
  out(arrayOne);
  process.exit(0);
});

function out(arrayOne){
    var header = arrayOne[0].split(',');//Retrieving header row from CSV file

    // To avoid Collision while retrieving each row
    for(x=1;x<arrayOne.length;x++){
        arrayOne[x]=arrayOne[x].replace('Annual, Ending mar Of Each Year','Annual- Ending mar Of Each Year');
    }; 

    // Stores each row in arrayOne as a object
    var arrayTwo = [];
    for(i=1;i<arrayOne.length;i++){
        var temp_array = arrayOne[i].split(',');// Stores 'i'th row in temporary array
        var j=0;
        var temp_obj={};
        var test = temp_array.forEach(function(x) {
                temp_obj[header[j]] = x; // Stores each element in array as property/value pair in temp_object
                j++
        }); // End of forEach
        arrayTwo.push(temp_obj);
    } // End of for-loop


	console.log("/*-------------------------------- OILSEED CROPS PRODUCTION IN 2013 --------------------------------------------*/")
	
	// Oilseed Crops Production in year 2013
	var json_plot1=[];
	var production = ' 3-2013';
	var p1=arrayTwo.forEach(function(x)
	{
		var cropName = x['Particulars']; // Stores all crops names as string in cropName
		var match1 = (cropName.match(/Oilseeds /i) || []).length; 
		if(match1>0) // Checks the length of crops which matches the keyword 'Oilseeds'
		{
			var match2 = (cropName.match(/Foodgrains/i) || []).length;	
			var match3 = (cropName.match(/Major Crops/i) || []).length;	
			if(match2 == 0 && match3==0) // Checks for all matches 
			{
				// Stores crop type and production of crop type in temp_obj
				var temp_obj={};
				temp_obj['particulars'] = x['Particulars'].replace('Agricultural Production Oilseeds ',''); 
				temp_obj['value'] = Number(x[production]);
				json_plot1.push(temp_obj); 
			} // End of if statement
		} // End of if statement
	}); // End of forEach
	console.log(json_plot1);
	fs.writeFileSync('OilseedCrop-Production.json',JSON.stringify(json_plot1));
	
	console.log("/*--------------------------------------------- FOODGRAINS PRODUCTION IN 2013 --------------------------------------------*/");
	
	// FoodGrains Production in year 2013
	var json_plot2=[];
	var production = ' 3-2013';
	var p2=arrayTwo.forEach(function(x){
		var cropName = x['Particulars']; // Stores all crops names as string in cropName
		var match1 = (cropName.match(/Foodgrains /i) || []).length; 
		if(match1>0)  // Checks the length of crops which matches the keyword 'Foodgrains'
		{
			var match2 = (cropName.match(/Volume/i) || []).length;	
			var match3 = (cropName.match(/Yield/i) || []).length;	
			var match4 = (cropName.match(/Area/i) || []).length;
			var match5 = (cropName.match(/Production/g) || []).length;
			var match6 = (cropName.match(/Major Crops/i) || []).length;
			if(match2 == 0 && match3==0 && match4==0 && match5==1 && match6==0) // Checks for all matches
			{
				// Stores crop type and production of crop type in temp_obj
				var temp_obj={};
				temp_obj['particulars'] = x['Particulars'].replace('Agricultural Production Foodgrains','');
				temp_obj['value'] = x[production];
				json_plot2.push(temp_obj); 
			} // End of if-statement
		} // End of if-statement
	}); // End of forEach Method
	console.log(json_plot2);
	fs.writeFileSync('FoodGrain-Production.json',JSON.stringify(json_plot2));


	console.log("/*-------------------------------- COMMERCIAL CROPS PRODUCTION --------------------------------------------*/")

	//Commercial Crops Production from 1993 - 2014
	var json_plot3=[];
	var header1 = header.slice(3,header.length); // Slices the header from 1993 - 2014
	for(i=0;i<header1.length;i++)
	{
		var temp_obj = {};
		var sum=0;
		var p3=arrayTwo.forEach(function(x)
		{
			var cropName = x['Particulars']; // Stores all crops names as string in cropName
			var match1 = (cropName.match(/Commercial Crops/i) || []).length;
			if(match1>0) // Checks the length of crops which matches the keyword 'Commercial Crops'
			{
				if(x[header1[i]] == "NA") 
				{
					x[header1[i]] = 0; // if production value is "NA", converts it to 0
				} 
				sum += Number(x[header1[i]]); // Adds the production value of all crops for specified year
			} // End of if-statement
		}); // End of forEach Method
		
		temp_obj['year'] = header1[i].replace(' 3-','');
		temp_obj['value'] = sum ;
		json_plot3.push(temp_obj);
	} // End of for-loop
	console.log(json_plot3)
	fs.writeFileSync('CommercialCropYear-Production.json',JSON.stringify(json_plot3));


	console.log("/*------------------------------- RICE PRODUCTION IN SOUTHERN STATES --------------------------------------------*/");

	// 	Rice Production in Southern states
	var json_plot4=[];
	var header1 = header.slice(3,header.length); // Slices the header from 1993 - 2014
	for(i=0;i<header1.length;i++){
		var obj_p4={};
		obj_p4['year'] = header1[i].replace(' 3-','');
		var p4=arrayTwo.forEach(function(x){
			var cropName = x['Particulars']; // Stores all crops names as string in cropName
			var match1 = (cropName.match(/Rice Yield/g) || []).length;
			if(match1>0) // Checks the length of crops which matches the keyword 'Commercial Crops'
			{
				var match2 = (cropName.match(/Tamil Nadu/i) || []).length;	
				var match3 = (cropName.match(/Kerala/i) || []).length;	
				var match4 = (cropName.match(/Karnataka/i) || []).length;
				var match5 = (cropName.match(/Andhra Pradesh/i) || []).length;
				if(match2 == 1 || match3==1 || match4==1 || match5==1) // Checks all possible matches
				{
					if(x[header1[i]] == "NA"){
						x[header1[i]] = 0; // if production value is "NA", converts it to 0
					} 
					var prop = x['Particulars'].replace('Agricultural Production Foodgrains Rice Yield','');
					obj_p4[prop] = Number(x[header1[i]]);
				} // End of if-statement
			} // End of if-statement
		}); // End of forEach Method
		json_plot4.push(obj_p4) ;
	} // End of for-loop
	console.log(json_plot4);

	fs.writeFileSync('RiceProduction.json',JSON.stringify(json_plot4));
}