window.onload = function(){
  console.log('window loaded');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = function(){
    if(request.status === 200){
      jsonString = request.responseText;
      countries = JSON.parse(jsonString);
    }
    filterCountries();
    selectCountry();
    main();
  }
  request.send(null);
}


function main(){
  // filterHandleClick();
  countryHandleClick();
}

function filterHandleClick(){
  var button = document.getElementById('filter-button');
  button.onclick = function(){
    var region = document.getElementById('selector').value;
    // selectCountry(region);
  }
}

function countryHandleClick(){
  var button = document.getElementById('country-button');
  button.onclick = function(){
    var selected = document.getElementById('filter').value;
    showCountryData(selected);
  }
}

function filterCountries(){
  var allRegions = [];
  var form = document.getElementById('form');
  var filterDropDown = document.createElement('select');
  filterDropDown.setAttribute('id', 'filter');
  countries.forEach(function(country){
    allRegions.push(country.region);
  })

  var uniqueRegions = allRegions.filter(function(elem, pos) {
    return allRegions.indexOf(elem) == pos;
  });

  uniqueRegions.forEach(function(region){
    var regionObject = document.createElement('option');

    regionObject.innerHTML = region;

    filterDropDown.appendChild(regionObject);
    form.appendChild(filterDropDown);
  })
}

function selectCountry(region){
  var region = document.getElementById('filter').value;

  var form = document.getElementById('form');
  
  var dropDown = document.createElement('select');
  dropDown.setAttribute('id', 'selector');

  countries.forEach(function(country){
    if(country.region === region){
    var countryObject = document.createElement('option');

    countryObject.innerHTML = country.name;

    dropDown.appendChild(countryObject);
    form.appendChild(dropDown);
  }
  })
}

function showCountryData(selected){
  var ul = document.getElementById('country-list');
  if(ul.childNodes[0]){
    ul.removeChild(ul.childNodes[0])
  }
  countries.forEach(function(country){
    if(selected === country.name){
      var li = document.createElement('li');
      li.setAttribute('id', 'foundCountry')
      li.innerHTML = 'Name: ' + country.name + ' Capital: ' + country.capital + ' Population: ' + country.population;
      ul.appendChild(li);
      borderCountries(country);
    }
  })
}

function borderCountries(country){
 var borders = country.borders;
 var li = document.getElementById('foundCountry');

 borders.forEach(function(border){

  countries.forEach(function(country){
    if(country.alpha3Code === border){
      var p = document.createElement('p');
      p.innerHTML = country.name;
      li.appendChild(p);
    }

  })

})
}




