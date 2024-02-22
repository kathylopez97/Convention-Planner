const eventForm = async (event) => {
  event.preventDefault();
  let eventName = document.getElementById("eventName");
  let eventImage = document.getElementById("eventImage");
  let startDate = document.getElementById("startDate");
  let startTime = document.getElementById("startTime");
  let price = document.getElementById("price");
  let description = document.getElementById("description");

  // encapsulate the event form data in an object
  const formData = new FormData();
  formData.append("eventName", eventName.value);
  formData.append("eventImage", eventImage.files[0]);
  formData.append("startDate", startDate.value);
  formData.append("startTime", startTime.value);
  formData.append("price", price.value);
  formData.append("description", description.value);

  const response = await fetch("/api/event", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    document.location.replace("/homepage");
  } else {
    console.log("ERROR  " + response.status);
    alert("failed to upload image, see console for log");
  }
};

document.querySelector("#event-form").addEventListener("submit", eventForm);
//need to add this to the html page.
//<input type="file" id="eventImage" name="eventImage" accept="image/*">
