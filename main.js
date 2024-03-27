let form = document.getElementById("form");
let input = document.getElementById("input");
let errorText = document.getElementById("errorText");
let studentsListContainer = document.getElementById("studentsListContainer");
let button = document.getElementById("button");
let clearButton = document.getElementById("clearAll");
const winnerDisplayElement = document.querySelector(".winnerDialogue");

let studentsArray = [];
let buttonMethod = "add";
var student;
var studentID;
var luckyStudent;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (formValidation()) {
    if (buttonMethod === "add") {
      studentsArray.push({
        id: Math.random(),
        studentName: input.value,
      });
      displayStudents();

      input.value = "";
    } else if (buttonMethod === "edit") {
      editStudent();
      displayStudents();
    }

    input.focus();
  }
});

let formValidation = () => {
  if (input.value === "") {
    errorText.innerText = "Please input name before adding.";
    errorText.style.transform = "translateY(0)";

    setTimeout(() => {
      errorText.style.transform = "translateY(200px)";
    }, 3000);
    return false;
  } else {
    errorText.style.transform = "translateY(200px)";
    return true;
  }
};

const randomizerValidation = () => {
  if (studentsArray.length == 0) {
    errorText.innerText = "Cannot randomize empty list!";
    errorText.style.transform = "translateY(0)";
    setTimeout(() => {
      errorText.style.transform = "translateY(200px)";
    }, 3000);
    return false;
  } else if (studentsArray.length < 4) {
    errorText.innerText =
      "The list must contain at least 4 students before randomizing!";
    errorText.style.transform = "translateY(0)";
    setTimeout(() => {
      errorText.style.transform = "translateY(200px)";
    }, 3000);
    return false;
  } else {
    return true;
  }
};

let displayStudents = () => {
  studentsListContainer.innerHTML = "";

  studentsArray.forEach((element) => {
    studentsListContainer.innerHTML += `
        <div>
            <pre>${element.studentName}</pre>
            <span id="${element.id}" class="options">
                <i onClick="editStudent(this)" class="fas fa-edit"></i>
                <i onClick="deleteStudent(this)" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `;
  });

  if (studentsArray.length !== 0) {
    clearButton.style.transform = "translateY(0)";
  } else {
    clearButton.style.transform = "translateY(200px)";
  }
};

let deleteStudent = (e) => {
  studentID = e.parentElement.id;
  let deleteStudent = studentsArray.findIndex(
    (element) => element.id == studentID
  );

  input.value = "";

  studentsArray.splice(deleteStudent, 1);
  displayStudents();
};

let editStudent = (e) => {
  if (buttonMethod === "add") {
    student = e.parentElement.parentElement;
    studentID = e.parentElement.id;
    // postID = Number(postID);

    let editStudentName = studentsArray.find(
      (element) => element.id == studentID
    ).studentName;
    input.value = editStudentName;

    student.classList.add("editActive");

    buttonMethod = "edit";
    button.innerHTML = `
        <span>
            <i class="fas fa-edit"></i>
            <span>Edit</span>
        </span>
        `;
  } else if (buttonMethod === "edit") {
    let editStudentIndex = studentsArray.findIndex(
      (element) => element.id == studentID
    );
    studentsArray.splice(editStudentIndex, 1, {
      id: studentID,
      studentName: input.value,
    });

    student.classList.remove("editActive");

    buttonMethod = "add";
    button.innerHTML = `
        <span>
            <i class="fas fa-plus"></i>
            <span>Add</span>
        </span>
        `;
    input.value = "";
  }
};

let clearAll = () => {
  studentsArray.length = 0;
  input.value = "";

  console.log("test");
  displayStudents();
};

const randomizer_Animation = () => {
  if (randomizerValidation()) {
    let randomizer_AnimationInterval = () => {
      let animate = 0;
      let nameAnimate = Math.floor(Math.random() * studentsArray.length);

      winnerDisplayElement.innerHTML = `
                <h3>Lucky Student</h3>
                <span>
                    ${studentsArray[nameAnimate].studentName}
                </span>
                `;
      animate++;
      if (animate == studentsArray.length) animate = 0;
    };
    randomizer_AnimationInterval = setInterval(
      randomizer_AnimationInterval,
      100
    );

    setTimeout(() => {
      clearInterval(randomizer_AnimationInterval);
    }, 1000);
  }
};
