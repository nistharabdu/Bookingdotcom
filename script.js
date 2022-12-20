import { hotels } from "./hotels.js";

// Load Hotels
processHotels(hotels);
var resultsCount = document.querySelector('.results-count-data');
resultsCount.innerHTML = hotels.length;

// filter events
var ratingInput = document.querySelectorAll('input[name=rating]');
ratingInput.forEach(element => {
    element.addEventListener('click',function(){
        var rating = this.value;
        if(this.checked){
            var filteredHotels = hotels.filter( function(ele){
                return ele.rating == rating;
            })
            processHotels(filteredHotels);
        }
        else{
            processHotels(hotels);
        }
    })
});

var reviewScoreInput = document.querySelectorAll('input[name=reviewScore]');
reviewScoreInput.forEach(element => {
    element.addEventListener('click',function(){
        var reviewScore = this.value;
        if(this.checked){
            var filteredHotels = hotels.filter( function(ele){
                return ele.reviewRating >= reviewScore;
            })
            processHotels(filteredHotels);
        }
        else{
            processHotels(hotels);
        }
    })
});

var lowestPrice = document.querySelector('.top-filter__each--lowest-price');
lowestPrice.addEventListener('click',function(){
    var hotelListsToSort = [...hotels];
    if(lowestPrice.classList.contains("active")){
        lowestPrice.classList.remove("active");
        processHotels(hotels);
    }
    else{
        lowestPrice.classList.add("active");
        var filteredHotels = hotelListsToSort.sort( function(a,b){
            return a.price - b.price;
        })
        processHotels(filteredHotels);
    }
});

// Search Hotels
var  submitBtn = document.querySelector('.form-submit-btn');
submitBtn.addEventListener('click',function(e){
    e.preventDefault();
    var searchInput = document.querySelector('input[name=place]').value.toLocaleLowerCase();
    var filteredHotels = hotels.filter( function(ele){
        return ele.name.toLocaleLowerCase().indexOf(searchInput) > -1;
    });
    processHotels(filteredHotels);
});


// Process hotels
function processHotels(hotels){
    var hotelListDiv = document.querySelector('.hotel-lists');
    var hotelListsDivs = '';
    hotels.map(function(eachHotel){
        hotelListsDivs += loadHotel(eachHotel);
    });
    hotelListDiv.innerHTML = hotelListsDivs;
}

function loadRating(ratingNumber){
    var ratingIconDiv= "";
    var ratingIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#feba02" width="12" height="12"><path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path></svg>';
    for (let i = 0; i < ratingNumber; i++) {
        ratingIconDiv += ratingIcon;
    }
    return ratingIconDiv;
}

function loadHotel(hotel){
    var eachHotelHTML = `
        <div class="flex hotel-lists__each my-3 p-4">
            <div class="hotel-lists__each__image">
                <img src="${hotel.image}" alt="">
            </div>
            <div class="hotel-lists__each__content flex-1 pl-3 pr-0">
                <div class="flex ">
                    <div class="hotel-lists__each__content__descp pr-3">
                        <div class="flex hotel-lists__each__title items-center mb-0">
                            <div class="font-bold">
                                <h3>${hotel.name}</h3>
                            </div>
                            <div class="flex align-center hotel-lists__each__rating pl-3">
                                ${loadRating(hotel.rating)}
                            </div>
                        </div>
                        <div class="flex items-center hotel-lists__each__location mb-3">
                            <div class="hotel-lists__each__location__icon">
                                <svg class="bk-icon -iconset-geo_pin" height="20" role="presentation" width="20" viewBox="0 0 128 128" aria-hidden="true" focusable="false"><path d="M98.5 42.5a34.5 34.5 0 1 0-64.3 17.2L64 120l29.8-60.3a34.2 34.2 0 0 0 4.7-17.2zM64 59.7a17.2 17.2 0 1 1 17-17 17.2 17.2 0 0 1-17 17z"></path></svg>
                            </div>
                            <div class="hotel-lists__each__location__name">
                                ${hotel.location}
                            </div>
                        </div>
                        <div class="hotel-lists__each__address mb-3">
                            ${hotel.descp}
                        </div>
                        <div class="hotel-lists__each__more-link">Show more</div>
                    </div>
                    <div class="hotel-lists__each__content__price flex-none flex justify-between flex-col">
                        <div class="flex hotel-lists__each__review  items-center">
                            <div class="hotel-lists__each__review__content">
                                <div class="hotel-lists__each__review__text font-bold">${hotel.reviewTitle}</div>
                                <div class="hotel-lists__each__review__number">${hotel.reviewNumbers.toLocaleString('en-US')} reviews</div>
                            </div>
                            <div class="hotel-lists__each__review__badge ml-2">
                                <div class="flex items-center justify-center hotel-lists__each__review__number__content font-bold">
                                    ${hotel.reviewRating}
                                </div>
                            </div>
                        </div>
                        <div class="hotel-lists__each__price mb-3">
                            <div>Price from</div>
                            <div><span class="font-bold">AED ${hotel.price}</span></div>
                            <div>per night</div>
                        </div>
                    </div>
                </div>
                <div class="hotel-lists__each__button flex justify-end">
                    <button class="btn btn--blue">Check availability</button>
                </div>
            </div>
        </div>`;
    return eachHotelHTML;
}