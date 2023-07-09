const input = document.getElementById("input");
const Rotate = document.getElementById("rotate");
const triangleField = document.getElementById("triangleField");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    drawTriangle();
    Rotate.style.display = 'flex';
  }
});

Rotate.addEventListener("click", rotateTriangle);

function drawTriangle() {

  let size = input.value;

  let triangle = "";
  for (let i = 0; i < size; i++) {

      triangle += "&nbsp;".repeat(size - i - 1) + "*".repeat(i + 1) + "<br>";

    }

  triangleField.innerHTML = triangle;
}


function rotateTriangle() {

  let triangle = triangleField.innerHTML.split("<br>").filter(Boolean);

  let rotatedTriangle = triangle.reverse().map((row) => {
      return  row.replace(" ", "&nbsp;*");
  }).join("<br>");

  triangleField.innerHTML = rotatedTriangle;
}