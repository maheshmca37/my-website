let AddedItemAvailable = 1;
let ModifiedQuanity = 0;

function ConfigureItemToDB(event) {
    event.preventDefault(); // Prevents form from submitting

    const itemid = document.getElementById("itemId").value;
    const itemname = document.getElementById("itemName").value;
    const itemtype = document.getElementById("itemType").value;
    const itemcost = document.getElementById("itemCost").value;
    const remarks = document.getElementById("remarks").value;

    addStoreConfigItem(itemid, itemname, itemtype, itemcost, remarks);

    alert("Item Configured Successfully");

    // Reset form to initial state
    document.getElementById("itemConfigForm").reset();
}


async function addStoreConfigItem(itemID, itemName, itemType, itemCost, remarks) {
  const supabaseUrl = 'https://zabwuvdtqclhbuiocdey.supabase.co'; // ✅ Correct URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphYnd1dmR0cWNsaGJ1aW9jZGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDgzNDEsImV4cCI6MjA3MDMyNDM0MX0.T9cgmFpSup1OPwUD5hgEEhVbDfArPdkLaaAKjKlklxU'; // ✅ Full anon key
  //supabase = supabase.createClient(supabaseUrl, supabaseKey); // ✅ Use window

  const { data, error } = await supabase
    .from('storeconfigitems') // ✅ correct table name
    .insert([
      {
        itemid: itemID,         // ✅ match column names exactly
        itemname: itemName,
        itemtype: itemType,
        itemcost: itemCost,
        remarks: remarks
      }
    ]);
}


// storeinventory table
async function addStoreInventory(itemID, itemName, quantity, price, remarks) {
  const supabaseUrl = 'https://zabwuvdtqclhbuiocdey.supabase.co'; // ✅ Correct URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphYnd1dmR0cWNsaGJ1aW9jZGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDgzNDEsImV4cCI6MjA3MDMyNDM0MX0.T9cgmFpSup1OPwUD5hgEEhVbDfArPdkLaaAKjKlklxU'; // ✅ Full anon key
 // supabase = supabase.createClient(supabaseUrl, supabaseKey); // ✅ Use window
  
  const { data, error } = await supabase
    .from('storeinventory') // ✅ correct table name
    .insert([
      {
        itemid: itemID,         // ✅ match column names exactly
        itemname: itemName,
        quantity: quantity,
        price: price,
        remarks: remarks
      }
    ]);

}

//  solditemsfromstore table   
async function SoldItemsFromStoreDaily(itemID, itemName, quantity, price, pdate, ptime, username, remarks) {
    
  const { data, error } = await supabase
    .from('solditemsfromstore') // ✅ correct table name
    .insert([
      {
        itemid: itemID,         // ✅ match column names exactly
        itemname: itemName,
        soldquantity: quantity,
        soldprice: price,
        solddate : pdate,
        soldtime : ptime,
        soldby : username,
        remarks: remarks
      }
    ]);

      // Fetch storeinventory from Supabase
   

    setSoldItemQuantity(Number(itemID), Number(quantity));
    if(AddedItemAvailable == 2){
      updateStoreInventory(Number(itemID), ModifiedQuanity);
    }
     AddedItemAvailable = 1;
}

//
async function setSoldItemQuantity(itemID, quantity) {

  
  // Find the item in the fetched data
                      
  const existingItem = storeInventoryTableData1.find(item => item.itemid === Number(itemID));


  // If item exists, add its quantity to the passed one
  if (existingItem) {
    AddedItemAvailable = 2;
     ModifiedQuanity =  existingItem.quantity - Number(quantity);
  }
  else {
    AddedItemAvailable = 3;
    ModifiedQuanity = quantity;
  }
 
}



// addeditemstostore table
async function addItemstoStoreDaily(itemID, itemName, quantity, price, pdate, ptime, username, remarks) {
  
  const supabaseUrl = 'https://zabwuvdtqclhbuiocdey.supabase.co'; // ✅ Correct URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphYnd1dmR0cWNsaGJ1aW9jZGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDgzNDEsImV4cCI6MjA3MDMyNDM0MX0.T9cgmFpSup1OPwUD5hgEEhVbDfArPdkLaaAKjKlklxU'; // ✅ Full anon key
  //supabase = supabase.createClient(supabaseUrl, supabaseKey); // ✅ Use window
  
  const { data, error } = await supabase
    .from('addeditemstostore') // ✅ correct table name
    .insert([
      {
        itemid: itemID,         // ✅ match column names exactly
        itemname: itemName,
        quantityadded: quantity,
        price: price,
        addeddate : pdate,
        addedtime : ptime,
        addedby : username,
        remarks: remarks
      }
    ]);

      // Fetch storeinventory from Supabase
   

  setAddedItemQuantity(itemID, quantity);
    if(AddedItemAvailable == 2){
      updateStoreInventory(Number(itemID), ModifiedQuanity);
    }
    else {
        addStoreInventory(itemID, itemName, quantity, price, remarks);
    }
  ModifiedQuanity = 0;
}

async function updateStoreInventory(itemID, ModifiedQuanity) {

const supabaseUrl = 'https://zabwuvdtqclhbuiocdey.supabase.co'; // ✅ Correct URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphYnd1dmR0cWNsaGJ1aW9jZGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDgzNDEsImV4cCI6MjA3MDMyNDM0MX0.T9cgmFpSup1OPwUD5hgEEhVbDfArPdkLaaAKjKlklxU'; // ✅ Full anon key
  //delete supabase;
  //supabase = supabase.createClient(supabaseUrl, supabaseKey); // ✅ Use window
  
  const { data, error } = await supabase
    .from('storeinventory')
    .update({ quantity: ModifiedQuanity })
    .eq('itemid', itemID);

  if (error) {
    console.error('Error updating inventory:', error.message);
    return { success: false, error };
  }

  console.log('Inventory updated:', data);
  return { success: true, data };
}

//
async function setAddedItemQuantity(itemID, quantity) {

  const supabaseUrl = 'https://zabwuvdtqclhbuiocdey.supabase.co'; // ✅ Correct URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphYnd1dmR0cWNsaGJ1aW9jZGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDgzNDEsImV4cCI6MjA3MDMyNDM0MX0.T9cgmFpSup1OPwUD5hgEEhVbDfArPdkLaaAKjKlklxU'; // ✅ Full anon key
  //supabase = supabase.createClient(supabaseUrl, supabaseKey); // ✅ Use window
  
  //const { data, error } = await supabase.from('storeinventory').select('*');

  const existingItem = storeInventoryTableData.find(item => item.itemid === Number(itemID));

  // If item exists, add its quantity to the passed one
  if (existingItem) {
    AddedItemAvailable = 2;
     ModifiedQuanity = Number(quantity)+ existingItem.quantity;
  }
  else {
    AddedItemAvailable = 3;
  }
}
