/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const linkList = document.querySelector('.link-list');
const studentList = document.querySelector('.student-list');
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9; // '9' represents number of items displayed per page
   const endIndex = page * 9;
   studentList.innerHTML = '';

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
         studentList.insertAdjacentHTML('beforeEnd', studentItem);
      }
   }
}
showPage(data, 1);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      const numOfPagesButton = 
         `<li>
            <button type="button">${i}</button>
         </li>`;
      linkList.insertAdjacentHTML('beforeEnd', numOfPagesButton);
   }   
   
   document.querySelectorAll('button')[0].className = 'active';
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);  
      }
   });  
}
addPagination(data);



//create search bar
const searchButtonHTML = 
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
document.querySelector('h2').insertAdjacentHTML('afterend', searchButtonHTML);

//create filtering function
function searchFilter(list, searchItem) {
   const searchResults = [];
   searchItem = searchItem.toLowerCase();
   linkList.innerHTML = '';
      
   for (let i = 0; i < list.length; i++) {
      const userFullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
      if (userFullName.includes(searchItem)) {
         searchResults.push(list[i]);
         if (searchResults.length > 0) {
            showPage(searchResults, 1);
            addPagination(searchResults);
            }
         }
         if (searchResults.length === 0) {
            studentList.innerHTML = '<span>No results found.</span>';
            linkList.innerHTML = '';
         }
      }
   }

//add search input functionality
const searchInputField = document.querySelector('.student-search');
const searchInputText = document.querySelector('input');
const searchInputButton = document.querySelector('button');

searchInputField.addEventListener('keyup', (e) => {
   searchFilter(data, searchInputText.value);
});
   
searchInputButton.addEventListener('click', (e) => {
   searchFilter(data, searchInputText.value);
   searchInputText.value = '';
});
