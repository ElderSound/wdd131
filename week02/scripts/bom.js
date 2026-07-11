const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");

    li.textContent = input.value;

    deleteButton.id = "close-button";
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("aria-label", "Remove chapter");

    deleteButton.addEventListener("click", function () {
      list.removeChild(li);
      input.focus();
    });

    li.append(deleteButton);
    list.append(li);

    input.value = "";
    input.focus();

  } else {
    alert("Please enter a chapter.");
    input.focus();
  }
});


