document.addEventListener("DOMContentLoaded", function() {
    // Load saved items from local storage
    var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    displaySavedItems(savedItems);
  });
  
  function saveAndDisplay() {
    var userInput = document.getElementById("userInput").value;
    var currentDate = new Date().toLocaleString();
    var displayArea = document.getElementById("displayArea");
    
    if (userInput.trim() !== "") {
      var newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
        <p>${currentDate} - ${userInput}</p>
        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
      `;
      displayArea.appendChild(newItem);
  
      // Save item to local storage
      var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
      savedItems.push({ date: currentDate, text: userInput });
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
    } else {
      alert("Please enter some text.");
    }
  }
  
  function displaySavedItems(savedItems) {
    var displayArea = document.getElementById("displayArea");
    savedItems.forEach(function(item) {
      var newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
        <p>${item.date} - ${item.text}</p>
        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
      `;
      displayArea.appendChild(newItem);
    });
  }
  
  function deleteItem(button) {
    var item = button.parentNode;
    var displayArea = document.getElementById("displayArea");
    displayArea.removeChild(item);
  
    // Remove item from local storage
    var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    var text = item.querySelector("p").textContent.split(" - ")[1];
    savedItems = savedItems.filter(function(savedItem) {
      return savedItem.text !== text;
    });
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }
  