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


function loadmenuitems() {
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
              qty: item.qty
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
loadmenuitems();



loadrawItemsListConfig();
function loadrawItemsListConfig(){

     fetch('./rawitems.json')
       .then(res => {
          return res.json();
       })
       .then(data  => {
        data.forEach(user => {
            rawItemsListConfig = data;
             
        }); 
       })
        .catch(error => console.logerror());
        
};


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


function showLunchItemsForm(){
  document.getElementById("lunch-items").style.display = "block";
  document.getElementById("breakfast-items").style.display = "none";
  document.getElementById("snack-items").style.display = "none";
  document.getElementById("dinner-items").style.display = "none";

  const lbtn = document.getElementById("session-capt");
  lbtn.style.display = 'block';
  lbtn.innerHTML="ADD ITEMS FOR LUNCH";

}

function showBreakfastItemsForm(){
  document.getElementById("breakfast-items").style.display = "block";
  document.getElementById("lunch-items").style.display = "none";
  document.getElementById("snack-items").style.display = "none";
  document.getElementById("dinner-items").style.display = "none";

  const lbtn = document.getElementById("session-capt");
  lbtn.style.display = 'block';
  lbtn.innerHTML="ADD ITEMS FOR BREAKFAST";


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
  document.getElementById("breakfast-items").style.display = "none";
  document.getElementById("lunch-items").style.display = "none";
  document.getElementById("snack-items").style.display = "none";
  document.getElementById("dinner-items").style.display = "block";

  const lbtn = document.getElementById("session-capt");
  lbtn.style.display = 'block';
  lbtn.innerHTML="ADD ITEMS FOR DINNER";

        
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

          // Extract the part before '@' in the checkboxId
          const baseId = checkboxId.split('_')[0];

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
   SelectedMenuItemsList = Array.from(itemMap, ([iname, pcount]) => ({ iname, pcount }));

  const result = aggregateRawItems(SelectedMenuItemsList, menuItemsList);
  generatePDF(result,SelectedMenuItemsList);
  setDbDetails();
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



// Helper function to get item name and quantity in proper format
const getItemDetails = (itemName) => {
  const item = rawItemsListConfig.find(r => r.name.includes(itemName));
  return item ? { id: item.id, name: item.name, qty: parseFloat(item.qty) } : null;
};

// Function to aggregate raw items based on selected menu items
const aggregateRawItems = (selectedMenuItems, menuItemsList) => {
  const aggregatedItems = {};

  selectedMenuItems.forEach(({ iname, pcount }) => {
      // Filter menuItemsList to find items matching the selected category
      const filteredItems = menuItemsList.filter(({ category }) => category === iname);

      filteredItems.forEach(({ item, qty }) => {
          const itemDetail = getItemDetails(item);
          if (itemDetail) {
             // const totalQty = parseFloat((qty/50)) * pcount;
             const totalQty = Math.ceil(parseFloat((qty / 50)) * pcount);

              if (aggregatedItems[itemDetail.name]) {
                  aggregatedItems[itemDetail.name] += totalQty;
              } else {
                  aggregatedItems[itemDetail.name] = totalQty;
              }
          }
      });
  });

  // Update rawitems array
  rawItemsListConfig.forEach(item => {
      if (aggregatedItems[item.name]) {
          item.qty = aggregatedItems[item.name].toString();
      }
  });

  return rawItemsListConfig;
};

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
      { text: 'Quantity', style: 'tableHeader' }
    ]
  ];

  rawItemsListConfig.forEach((item, index) => {
    const nameMatch = item.name.match(/(.+?)\s*\(.+?\)/);
    const itemName = nameMatch ? nameMatch[1].trim() : item.name; 
    const qtyAddition = nameMatch ? item.name.match(/\((.+?)\)/)[1] : ''; 
    
    const updatedQty = item.qty + "  (" + (qtyAddition ? ` ${qtyAddition}` : '') + ")";

    tableBody.push([
      { text: (index + 1).toString(), style: 'tableData' },
      { text: itemName, style: 'tableData' },
      { text: updatedQty.toString(), style: 'tableData' }
    ]);
  });

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





