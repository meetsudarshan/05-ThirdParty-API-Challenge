// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var savedEvents = {}; // Initialize savedEvents variable

  function todayDate() {
    var today = dayjs();
    var dayCount = today.date();
    var dayExtn;

    if (dayCount >= 11 && dayCount <= 13) {
      dayExtn = "th"; // Set day extension to "th" for 11th, 12th, and 13th
    } else if (dayCount % 10 === 1) {
      dayExtn = "st"; // Set day extension to "st" for numbers ending in 1
    } else if (dayCount % 10 === 2) {
      dayExtn = "nd"; // Set day extension to "nd" for numbers ending in 2
    } else if (dayCount % 10 === 3) {
      dayExtn = "rd"; // Set day extension to "rd" for numbers ending in 3
    } else {
      dayExtn = "th"; // Set day extension to "th" for all other numbers
    }

    var formattedDate = today.format("dddd, MMMM ") + dayCount + dayExtn;
    $("#currentDay").text(formattedDate); // Set the formatted date as text for the element with id "currentDay"
  }

  function lookTime() {
    var currentHour = dayjs().format("H"); // Get the current hour in 24-hour format
    $(".time-block").each(function() {
      var currentTime = parseInt($(this).attr("id").split("-")[1]); // Get the hour value from the id of each time block
      $(this).removeClass("past present future"); // Remove all the time block classes

      if (currentTime < currentHour) {

    // Add "past" class if the time block is in the past
        $(this).addClass("past"); 
      } else if (currentTime == currentHour) {
       
       // Add "present" class if the time block is the current hour
        $(this).addClass("present"); 
      } else {

        // Add "future" class if the time block is in the future
        $(this).addClass("future"); 
      }
    });
  }

  function saveEvent() {

    // Get the id of the parent element (time block)
    var timeBlockId = $(this).parent().attr("id"); 

    // Get the value of the description input field
    var description = $(this).siblings(".description").val(); 

    // Save the description in the savedEvents object using the time block id as the key
    savedEvents[timeBlockId] = description; 

    // Save the description in the local storage using the time block id as the key
    localStorage.setItem(timeBlockId, description); 
  }

  function retrieveSavedEvents() {

    // Get the id of each time block
    $(".time-block").each(function() {
      var timeBlockId = $(this).attr("id"); 

      // Get the description value from the local storage using the time block id as the key
      var description = localStorage.getItem(timeBlockId); 

      if (description) {

        // Save the description in the savedEvents object
        savedEvents[timeBlockId] = description; 

        // Set the value of the description input field to the retrieved description
        $(this).find(".description").val(description); 
      }
    });
  }


  // Call the todayDate function to display the current date
  todayDate(); 
 
 // Call the lookTime function to update the time block colors based on the current hour
  lookTime(); 
  
  // Call the retrieveSavedEvents function to retrieve and display saved events from local storage
  retrieveSavedEvents(); 

  // Attach the saveEvent function to the click event of all elements with the "saveBtn" class
  $(".saveBtn").on("click", saveEvent); 
});

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.



