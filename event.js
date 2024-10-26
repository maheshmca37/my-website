let rawItemsListConfig = [];
let menuItemsList = [];
let rawItemsListforTotal = [];
let ssnBtnsStatus = '0';
let SelectedMenuItemsList = [];
let peopleCount = 0;
let eventdate = '';
let eventname = '';
let eventvenue = '';
let eventphone = '0';

let lunchconfigshownstatus = '0';
let breakfastconfigshownstatus = '0';
let dinnerconfigshownstatus = '0';
let snacksconfigshownstatus = '0';


function loadRawItemsForMenuItems() {
  fetch('./menuitems.json')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      // Iterate over each category in the JSON data
      for (const category in data) {
        if (data.hasOwnProperty(category)) {
          const items = data[category];
          
          // Add each item to the menuItemsList
          items.forEach(item => {
            menuItemsList.push({
              category: category,
              item: item.item,
              qty: item.qty,
              units: item.units
            });
          });
        }
      }
      
      // Optionally, log the menuItemsList to verify the results
      console.log('Menu Items List:', menuItemsList);
    })
    .catch(error => {
      console.error('Error fetching the JSON data:', error);
    });
}

// Call the function to load and process the menu items
loadRawItemsForMenuItems();



document.addEventListener('DOMContentLoaded', (event) => {
  // Get all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Add change event listener to each checkbox
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          handleCheckboxChange(this);
      });
  });
});

function handleCheckboxChange(checkbox) {
  const isChecked = checkbox.checked;
  const name = checkbox.id;
  if (isChecked) {
      //alert(`${name} checkbox is selected!`);
  } else {
     // alert(`${name} checkbox is deselected!`);
  }
}




document.getElementById("config-item").onclick = showItemCofig;
document.getElementById("add-event").onclick = loadEventConfig;

document.getElementById("confirmevent-btn").onclick = setMealSessionData;


document.getElementById("lunch-btn").onclick = showLunchItemsForm;
document.getElementById("breakfast-btn").onclick = showBreakfastItemsForm;
document.getElementById("snacks-btn").onclick = showSnacksItemsForm;
document.getElementById("dinner-btn").onclick = showDinnerItemsForm;

document.getElementById("menu-final-btn").onclick = setSelectedMenuItems;

const lunchItemsContainer = document.getElementById('lunch-items');
const breakfasttemsContainer = document.getElementById('breakfast-items');
const snackstemsContainer = document.getElementById('snacks-items');
const dinnerItemsContainer = document.getElementById('dinner-items');

const lbtn = document.getElementById("session-capt");



function showLunchItemsForm(){

  lbtn.innerHTML="ADD ITEMS FOR LUNCH";
  
  loadlunchMenuData();
  lunchconfigshownstatus = '1';
  breakfasttemsContainer.style.display = 'none'; 
  dinnerItemsContainer.style.display ='none';
  lunchItemsContainer.style.display = 'block'; // Show the section

}


  async function loadlunchMenuData() {
    try {

      if (lunchconfigshownstatus == '1') 
          exit;

      const response = await fetch('menuData.json');
      const data = await response.json();


      if (lunchItemsContainer) {
        lunchItemsContainer.style.display = 'block'; // Show the section

        // Clear any existing content
        //lunchItemsContainer.innerHTML = '';

        // Create collapsible sections for each category
        Object.keys(data['lunch-items']).forEach(category => {
          // Create the collapsible label
          const label = document.createElement('div');
          label.className = 'collapsible';
          label.textContent = category.replace(/-/g, ' ').toUpperCase(); // Format category name

          // Create the content container for items
          const content = document.createElement('div');
          content.className = 'content';

          // Add items to the content
          data['lunch-items'][category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<label>
              <img src="${item.image}" class="item-image">
              <input type="checkbox" id="${item.name}"+ onchange="togglePeopleCount(this, 'pc-${item.name}')"> ${item.name}
            </label>
            <input type="number" id="pc-${item.name}" placeholder="No. of people" style="width: 50px;"> <br><br>`;
            content.appendChild(itemDiv);
          });

          // Append label and content to the main container
          lunchItemsContainer.appendChild(label);
          lunchItemsContainer.appendChild(content);

          // Add click event to toggle the content visibility
          label.addEventListener('click', function() {
            if (content.style.display === 'block') {
              content.style.display = 'none';
            } else {
              content.style.display = 'block';
            }
          });
        });
      } else {
        console.error('Lunch items container not found.');
      }
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  }


  async function loadlDinnerMenuData() {
    try {

      if (dinnerconfigshownstatus == '1') 
          exit;

      const response = await fetch('menuData.json');
      const data = await response.json();


      if (dinnerItemsContainer) {
        dinnerItemsContainer.style.display = 'block'; // Show the section

        // Clear any existing content
        //lunchItemsContainer.innerHTML = '';

        // Create collapsible sections for each category
        Object.keys(data['dinner-items']).forEach(category => {
          // Create the collapsible label
          const label = document.createElement('div');
          label.className = 'collapsible';
          label.textContent = category.replace(/-/g, ' ').toUpperCase(); // Format category name

          // Create the content container for items
          const content = document.createElement('div');
          content.className = 'content';

          // Add items to the content
          data['dinner-items'][category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<label>
              <img src="${item.image}" class="item-image">
              <input type="checkbox" id="${item.name}"+ onchange="togglePeopleCount(this, 'pc-${item.name}')"> ${item.name}
            </label>
            <input type="number" id="pc-${item.name}" placeholder="No. of people" style="width: 50px;"> <br><br>`;
            content.appendChild(itemDiv);
          });

          // Append label and content to the main container
          dinnerItemsContainer.appendChild(label);
          dinnerItemsContainer.appendChild(content);

          // Add click event to toggle the content visibility
          label.addEventListener('click', function() {
            if (content.style.display === 'block') {
              content.style.display = 'none';
            } else {
              content.style.display = 'block';
            }
          });
        });
      } else {
        console.error('Dinner items container not found.');
      }
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  }


  async function loadBreakfastMenuData() {
    try {

      
      if (breakfastconfigshownstatus == '1') 
        exit;

      const response = await fetch('menuData.json');
      const data = await response.json();


      if (breakfasttemsContainer) {
            breakfasttemsContainer.style.display = 'block'; // Show the section

        // Clear any existing content
        //lunchItemsContainer.innerHTML = '';

        // Create collapsible sections for each category
        Object.keys(data['breakfast-items']).forEach(category => {
          // Create the collapsible label
          const label = document.createElement('div');
          label.className = 'collapsible';
          label.textContent = category.replace(/-/g, ' ').toUpperCase(); // Format category name

          // Create the content container for items
          const content = document.createElement('div');
          content.className = 'content';

          // Add items to the content
          data['breakfast-items'][category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<label>
              <img src="${item.image}" class="item-image">
              <input type="checkbox" id="${item.name}"+"_b" onchange="togglePeopleCount(this, 'pc-${item.name}')"> ${item.name}
            </label>
            <input type="number" id="pc-${item.name}" placeholder="No. of people" style="width: 50px;"> <br><br>`;
            content.appendChild(itemDiv);
          });

          // Append label and content to the main container
          breakfasttemsContainer.appendChild(label);
          breakfasttemsContainer.appendChild(content);

          // Add click event to toggle the content visibility
          label.addEventListener('click', function() {
            if (content.style.display === 'block') {
              content.style.display = 'none';
            } else {
              content.style.display = 'block';
            }
          });
        });
      } else {
        console.error('breakfast items container not found.');
      }
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  }

  
  async function loadsnacksMenuData() {
    try {
      const response = await fetch('menuData.json');
      const data = await response.json();


      if (lunchItemsContainer) {
        lunchItemsContainer.style.display = 'block'; // Show the section

        // Clear any existing content
        lunchItemsContainer.innerHTML = '';

        // Create collapsible sections for each category
        Object.keys(data['lunch-items']).forEach(category => {
          // Create the collapsible label
          const label = document.createElement('div');
          label.className = 'collapsible';
          label.textContent = category.replace(/-/g, ' ').toUpperCase(); // Format category name

          // Create the content container for items
          const content = document.createElement('div');
          content.className = 'content';

          // Add items to the content
          data['lunch-items'][category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<label>
              <img src="${item.image}" class="item-image">
              <input type="checkbox" onchange="togglePeopleCount(this, 'pc-${item.name.replace(/ /g, "_")}_l')"> ${item.name}
            </label>
            <input type="number" id="pc-${item.name.replace(/ /g, "_")}_l" placeholder="No. of people" style="width: 50px;"> <br><br>`;
            content.appendChild(itemDiv);
          });

          // Append label and content to the main container
          lunchItemsContainer.appendChild(label);
          lunchItemsContainer.appendChild(content);

          // Add click event to toggle the content visibility
          label.addEventListener('click', function() {
            if (content.style.display === 'block') {
              content.style.display = 'none';
            } else {
              content.style.display = 'block';
            }
          });
        });
      } else {
        console.error('Lunch items container not found.');
      }
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  }

  

function showBreakfastItemsForm(){
  

  lbtn.innerHTML="ADD ITEMS FOR BREAKFAST";
  

  loadBreakfastMenuData();
  breakfastconfigshownstatus = '1';
  lunchItemsContainer.style.display = 'none'; 
  dinnerItemsContainer.style.display= 'none';
  breakfasttemsContainer.style.display = 'block'; // Show the section
}

function showSnacksItemsForm(){
  document.getElementById("lunch-items").style.display = "none";
  document.getElementById("breakfast-items").style.display = "none";
  document.getElementById("snack-items").style.display = "block";
  document.getElementById("dinner-items").style.display = "none";

  const lbtn = document.getElementById("session-capt");
  lbtn.style.display = 'block';
  lbtn.innerHTML="ADD ITEMS FOR SNACKS";

        
}

function showDinnerItemsForm(){
  
  lbtn.innerHTML="ADD ITEMS FOR DINNER";
  
  loadlDinnerMenuData();
  dinnerconfigshownstatus = '1';
  breakfasttemsContainer.style.display = 'none'; 
  lunchItemsContainer.style.display = 'none'; // Show the section
  dinnerItemsContainer.style.display = 'block';

        
}

function setSelectedMenuItems(){
  // Use confirm to show a dialog with Yes and No options
  const userConfirmed = confirm("Please check the all Menu Items Selection \n Are you sure to Download Raw Items List?");

  // Check the user's response
  if (!userConfirmed) {
      return; // Exit the function if the user clicked "No"
  }

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const itemMap = new Map();

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
        const checkboxId = checkbox.id;
        const inputId = `pc-${checkboxId}`;
        const inputField = document.querySelector(`#${inputId}`);
        const pcount = inputField ? parseInt(inputField.value, 10) : 0;

         // Get the base item name by removing the prefix (the part before the first underscore)
         const baseId = checkboxId.substring(checkboxId.indexOf('_') + 1); // Removes the prefix (l_ or d_)
 
        // If the item already exists in the map, add to the existing count
        if (itemMap.has(baseId)) {
            itemMap.set(baseId, itemMap.get(baseId) + pcount);
        } else {
            // Otherwise, set the initial count
            itemMap.set(baseId, pcount);
        }
    }
});

// Convert the map to the desired array format
const SelectedMenuItemsList = Array.from(itemMap, ([iname, pcount]) => ({ iname, pcount }));

//console.log(SelectedMenuItemsList);


  const result = calculateItemQuantities(SelectedMenuItemsList, menuItemsList);
  generatePDF(result,SelectedMenuItemsList);
  setDbDetails();
}


function calculateItemQuantities(selectedMenuItems, menuItems) {
  const itemSummary = {};

  // Loop through each selected menu item
  selectedMenuItems.forEach(menuItem => {
      const itemName = menuItem.iname; // Menu item name
      const pcount = menuItem.pcount; // Portion count
      
      const ingredients =  [];
      let j=0;
      // Get ingredients for the selected menu item
      for (let i = 0; i < menuItems.length; i++) {
      
        if (menuItems[i].category == itemName) {
           ingredients[j] = menuItems[i];
           j = j + 1 ;
        }
      }

          // Ensure ingredients is an array and has items
          if (ingredients.length > 0) {
              // Loop through the ingredients
                for (let i=0 ; i<ingredients.length;i++){
                  const qty = (parseFloat(ingredients[i].qty) * pcount)/50; // Multiply qty by pcount
                  const unit = ingredients[i].units;
                  const ingredientName = ingredients[i].item;

                  // Add or update the item in the summary
                  if (itemSummary[ingredientName]) {
                      itemSummary[ingredientName].qty += qty;
                  } else {
                      itemSummary[ingredientName] = { qty, unit };
                  }
                }

          
          }
      
  });

  // Convert the summary to the desired list format
  const result = Object.keys(itemSummary).map(item => ({
      item,
      qty: itemSummary[item].qty,
      unit: itemSummary[item].unit
  }));

  return result;
}

function setDbDetails(){
  
  const firebaseConfig = {
    apiKey: "AIzaSyAdwlJCdrMnKC_Pa4Lrtaq2yct8x3IC-ps",
    authDomain: "myexam-1987.firebaseapp.com",
    projectId: "myexam-1987",
    storageBucket: "myexam-1987.appspot.com",
    messagingSenderId: "50845302692",
    appId: "1:50845302692:web:324cae25843d6d7fba8b31",
    measurementId: "G-5BGSTMV6NT"
  };
  
firebase.initializeApp(firebaseConfig);
   // Get a reference to the database service
const database = firebase.database();

// Reference to the "users" node in your database
const usersRef = database.ref('EVENTS');

const currentDate = new Date();
const dateString = currentDate.toISOString(); // This will give you a string in ISO format
//console.log(dateString);

// Example data to be inserted
const userData = {
  Event : eventname,
  Venue : eventvenue,
  Phone : eventphone,
  Time : dateString
};

// Push data to Firebase Realtime Database under "users" node
  usersRef.push(userData);

}


function generatePDF(rawItemsListConfig, SelectedMenuItemsList) {
  // Prepare the content for the PDF
  const content = [];

  // Define the table structure for selected items
  const selectedItemsTableBody = [
    // Table headers for selected items
    [
      { text: 'SNO', style: 'tableHeader' },
      { text: 'Item Name', style: 'tableHeader' },
      { text: 'People Count', style: 'tableHeader' }
    ]
  ];

  SelectedMenuItemsList.forEach((item, index) => {
    selectedItemsTableBody.push([
      { text: (index + 1).toString(), style: 'tableData' },
      { text: item.iname, style: 'tableData' },
      { text: item.pcount.toString(), style: 'tableData' }
    ]);
  });

  // Define the table structure for raw items
  const tableBody = [
    // Table headers for raw items
    [
      { text: 'SNO', style: 'tableHeader' },
      { text: 'Name', style: 'tableHeader' },
      { text: 'Quantity', style: 'tableHeader' },
      { text: 'Units', style: 'tableHeader' }
    ]
  ];

 for (let index = 0; index < rawItemsListConfig.length; index++){
    const itemName = rawItemsListConfig[index].item;
    const updatedQty = rawItemsListConfig[index].qty;

    const updatedUnit =   rawItemsListConfig[index].unit;


    tableBody.push([
      { text: (index + 1).toString(), style: 'tableData' },
      { text: itemName, style: 'tableData' },
      { text: updatedQty.toString(), style: 'tableData' },
      { text:updatedUnit.toString(), style: 'tableData' }
    ]);

  }
  // Define the document definition with both tables
  const docDefinition = { 
    content: [
      { text: 'EVENT DETAILS', fontSize: 19, bold: true, margin: [0, 7] },
      { text: 'EVENT DATE: '+eventdate, fontSize: 19, bold: true, margin: [0, 7]},
      { text: 'EVENT NAME: '+eventname, fontSize: 19, bold: true, margin: [0, 7] },
      { text: 'VENUE: '+eventvenue, fontSize: 19, bold: true, margin: [0, 7]},
      { text: 'PHONE: '+eventphone, fontSize: 19, bold: true, margin: [0, 7]},
      { text: '', margin: [0, 30] }, // Adds some space
      { text: 'Selected Menu Items',fontSize: 18, bold: true, margin: [0, 10] }, 
      { text: '', margin: [0, 8] }, // Adds some space
      {
        table: {
          headerRows: 1,
          body: selectedItemsTableBody
        },
        layout: 'lightHorizontalLines' // Optional: adds horizontal lines
      },
      { text: '', margin: [0, 20] }, // Adds some space
      { text: 'Item List', fontSize: 18, bold: true, margin: [0, 20] },
      {
        table: {
          headerRows: 1,
          body: tableBody
        },
        layout: 'lightHorizontalLines' // Optional: adds horizontal lines
      }
    ]
  };

  // Generate and download the PDF
  pdfMake.createPdf(docDefinition).download('items_list.pdf');
}



function setMealSessionData(){
  
  const eventAddForm = document.querySelector('.event-add');
  eventAddForm.style.display = 'none'; // Show the form
  

  
  const bfbtn = document.getElementById("breakfast-btn");
  bfbtn.style.display='inline';
  
  const lunchbtn = document.getElementById("lunch-btn");
  lunchbtn.style.display='inline';
  
  const snacksbtn = document.getElementById("snacks-btn");
  snacksbtn.style.display='inline';
  
  const dinnerbtn = document.getElementById("dinner-btn");
  dinnerbtn.style.display='inline';

  const menufinalbtn = document.getElementById("menu-final-btn");
  menufinalbtn.style.display='inline';


  ssnBtnsStatus =1;

  setDefaultPeopleCountToAllMenus();
}



function togglePeopleCount(checkbox, inputId) {
  const input = document.getElementById(inputId);
  const peopleCount = document.getElementById('total-people-count').value;

  if (checkbox.checked) {
      input.value = peopleCount; // Set input value to peopleCount if checked
  } else {
      input.value = 0; // Reset input value to 0 if unchecked
  }
}


function setDefaultPeopleCountToAllMenus() {
  // Get the value from the PeopleCountcb input field
  peopleCount = document.getElementById('total-people-count').value;
  eventdate = document.getElementById('event-date').value;
  eventname = document.getElementById('event-name').value;
  eventvenue = document.getElementById('event-venue').value;
  eventphone = document.getElementById('phone-no').value;

  // Store this value in a variable
  const defaultValue = 0;

  // Get all input fields with type number
  const numberInputs = document.querySelectorAll('input[type="number"]');

  // Loop through each input field and set the default value
  numberInputs.forEach(input => {
      if (input.id !== 'total-people-count') {
          input.value = defaultValue;
      }
  });
}


hideSessionMenuButtons();
function hideSessionMenuButtons(){
  
  if (ssnBtnsStatus==1) {
     setMealSessionData();
  }
  else {
  const bfbtn = document.getElementById("breakfast-btn");
  bfbtn.style.display='none';
  
  const lunchbtn = document.getElementById("lunch-btn");
  lunchbtn.style.display='none';
  
  const snacksbtn = document.getElementById("snacks-btn");
  snacksbtn.style.display='none';
  
  const dinnerbtn = document.getElementById("dinner-btn");
  dinnerbtn.style.display='none';

  const menufinalbtn = document.getElementById("menu-final-btn");
  menufinalbtn.style.display='none';


}

}



function showItemCofig(){
  
  const chickenBiryaniItems = menuItemsList[mainItems[0]];
  showtxt = chickenBiryaniItems[0].iid;
  alert(showtxt);
}

function setEventFormVisibility(vvalue){
  const eventAddForm = document.querySelector('.event-add');
  if(vvalue==1){
  eventAddForm.style.display = 'block'; // Show the form
  }
  else {
    eventAddForm.style.display = 'none'; // Show the form  
  }

  const formElements = document.querySelectorAll('#evnt-addform input, #evnt-addform textarea');
  formElements.forEach(element => {
      element.disabled = false; // Enable each form field
  });
  
  
}

function loadEventConfig(){

  const eventAddForm = document.querySelector('.event-add');
  eventAddForm.style.display = 'block'; // Show the form
   
}





