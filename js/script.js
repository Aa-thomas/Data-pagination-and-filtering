/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


//Reference variable for all student items
const studentItemList = document.querySelector('.student-list');

//Reference variable for pagination buttons
const linkList = document.querySelector('.link-list');

/*
* Create the `showPage` function
* This function will create and insert/append the elements needed to display a "page" of nine students
* @param {array} 'list' - An array of objects containing student information
* @param {number} 'page' - the current group of objects to be displayed from 'list' parameter
*/
function showPage(list, page) {
   //Start of current page
   const startIndex = (page * 9) - 9; // '9' represents number of items displayed per page
   
   //End of current page
   const endIndex = page * 9;

   //Clear HTML inside 'studentList' so that all items are removed and only updated items are displayed
   studentItemList.innerHTML = '';

   //Loop through 'list' and only display items with an index between 'startIndex' and 'endIndex'
   for (let i = 0; i < list.length; i++) {
      if (i < endIndex && i >= startIndex) {
         const studentItem =
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
                  <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>`;
         //Display items inside 'studentItemList' element at 'beforeend' position
         studentItemList.insertAdjacentHTML('beforeEnd', studentItem);
      }
   }
}
//Call function
showPage(data, 1);

/*
* Create the `addPagination` function
* This function will create and insert/append the elements needed for the pagination buttons
* @param {array} 'list' - Pagination buttons will be created according to length of this array
*/
function addPagination(list) {
   //Number of pages to be made
   const numOfPages = Math.ceil(list.length / 9);

   //Clear HTML inside 'linkList' so that all pagination buttons are removed and only updated buttons are displayed
   linkList.innerHTML = '';

   //Create pagination button element
   for (let i = 1; i <= numOfPages; i++) {
      const pageButton = 
         `<li>
            <button type="button">${i}</button>
         </li>`;
      //Display pagination button element
      linkList.insertAdjacentHTML('beforeEnd', pageButton);
   }   
   
   //Set the first pagination button to be active when page loads
   document.querySelectorAll('button')[0].className = 'active';

   //Add click event listener to pagination buttons
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         //Remove 'active' class from current button
         document.querySelector('.active').className = '';
         //Add 'active' class to clicked button
         e.target.className = 'active';
         //Update page
         showPage(list, e.target.textContent);  
      }
   });  
}
//Call function
addPagination(data);

//Create search bar
const searchInputBarHTML = 
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
//Display the search bar inside '.header' element at 'beforeend' position  
document.querySelector('.header').insertAdjacentHTML('beforeend', searchInputBarHTML);
 
/* Create filtering function
* This function will filter student profiles and display only those that contain the users search query
* @param {Array} 'list' - An array in which the search will take place
* @param {String} 'searchQuery' - The users input inside the search bar
*/
function searchFilter(list, searchQuery) {
   // An empty array where search results will be pushed to
   const searchResults = [];
   
   //Convert users search query to lowercase so that search can be case insensitive
   searchQuery = searchQuery.toLowerCase();
   
   //Reset pagination buttons so that number of buttons will change according to number of search results
   linkList.innerHTML = '';
   
   //Loop through 'list'
   for (let i = 0; i < list.length; i++) {
      //Create string containing the students first and last names and convert to lowercase
      const studentFullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
      
      //Push results into searchResults array
      if (studentFullName.includes(searchQuery)) {
         searchResults.push(list[i]);
         
         //Display results only if there are 1 or more items in searchResults array
         if (searchResults.length > 0) {
            showPage(searchResults, 1);
            addPagination(searchResults);
            
         }
         //Display error message by replacing 'studentList' HTML with selected message
         if (searchResults.length === 0) {
            studentItemList.innerHTML = '<span>No results found.</span>';
            //Remove pagination buttons 
            linkList.innerHTML = '';
         }
      }
   }
}   


//Create variables to reference event listeners for 'click' and 'keyup' functionality
const searchInputBar = document.querySelector('.student-search');
const searchInputText = document.querySelector('input');
const searchInputButton = document.querySelector('button');

//Add 'click' functionality to searchInputButton
searchInputButton.addEventListener('click', () => {
   searchFilter(data, searchInputText.value);
   searchInputText.value = '';
});

//Add 'keyup' functionality so that search results update on each keystroke
searchInputBar.addEventListener('keyup', (e) => {
   searchFilter(data, searchInputText.value);
   //Search when enter key(13) is pressed
   if (e.keycode === 13) {
      searchInputButton.click();
   }
});

