// Khai báo mảng dữ liệu gồm nhiều đối tượng sinh viên
let arrStudents = JSON.parse(localStorage.getItem("arrStudents")) || [];

//Biến toàn cục để biết lúc nào thêm mới học viên, cập nhật học viên
let action = "Create";

function readData() {
  //1. Truy cập vào tbody có id là listStudents
  let listStudents = document.getElementById("listStudents");
  //2. render dữ liệu từ arrStudents lên tbody có id là listStudents
  //xóa thông tin trong giao diện bảng trước khi render dữ liệu
  listStudents.innerHTML = "";
  //lặp qua mảng để lấy dữ liệu render ra bảng
  arrStudents.forEach((student, index) => {
    listStudents.innerHTML += `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${student.studentId}</td>
                      <td>${student.fullName}</td>
                      <td>${student.email}</td>
                      <th>${student.phone}</th>
                      <th>${student.address}</th>
                      <th>${student.sex}</th>
                      <th>
                          <a id="saveBtn" href="#" onclick="initUpdate('${
                            student.studentId
                          }')">Cập nhật</a>
                          <a href="javascript:deleteStudent('${
                            student.studentId
                          }')">Xóa</a>
                      </th>
                  </tr>
          `;
  });
}

function createNewStudent() {
  //1. Lấy dữ liệu form -> newStudent Object
  let newStudent = getData();
  //2. Thêm newStudent vào arrStudents
  arrStudents.push(newStudent);
  //3. render lại dữ liệu lên table
  readData();
  //4. thêm dữ liệu vào local storage
  localStorage.setItem("arrStudents", JSON.stringify(arrStudents));
  //5. reset dữ liệu trên form
  clearForm();
}

//truy cập vào nút lưu trên form
let submit = document.getElementById("submit");
//gắn sự kiện onclick cho nút lưu
submit.addEventListener("click", function () {
  if (action == "Create") {
    createNewStudent();
  } else {
    //Cập nhật sinh viên
    updateStudent();
  }
});

//target: lấy được thông tin sinh viên cần cập nhật và hiển thị trên form
function initUpdate(studentId) {
  // 1. Lấy thông sinh viên theo mã sinh viên (chỉ số sinh viên trong mảng arrStudents)
  let indexUpdate = getIndexStudentById(studentId); //Chỉ số phần tử sinh viên cần cập nhật
  // 2. Hiển thị thông tin cũ lên form để người dùng chỉnh sửa
  if (indexUpdate >= 0) {
    document.getElementById("studentId").value =
      arrStudents[indexUpdate].studentId;
    document.getElementById("fullName").value =
      arrStudents[indexUpdate].fullName;
    document.getElementById("email").value = arrStudents[indexUpdate].email;
    document.getElementById("phone").value = arrStudents[indexUpdate].phone;
    document.getElementById("address").value = arrStudents[indexUpdate].address;
    if (arrStudents[indexUpdate].sex === "Nam") {
      document.getElementById("male").checked = true;
    } else {
      document.getElementById("female").checked = true;
    }
  }
  //3. Không cho phép sửa mã sinh viên trên form khi cập nhật - readonly
  document.getElementById("studentId").readOnly = true;
  //4. Chuyển action thành update
  action = "Update";
}

//target: cập nhật thông tin sinh viên và hiển thị lại trên table
function updateStudent() {
  // 1. Lấy thông tin sinh viên trên form
  let studentUpdate = getData();
  // 2. Cập nhật thông tin sinh viên vào arrStudents
  let indexUpdate = getIndexStudentById(studentUpdate.studentId);
  arrStudents[indexUpdate] = studentUpdate;
  // 3. Lưu mảng vào local storage
  localStorage.setItem("arrStudents", JSON.stringify(arrStudents));
  // 4. render dữ liệu lại trên form
  readData();
  // 5. Xóa dữ liệu trên form
  clearForm();
  // 6. Bật lại studentID với readonly = false;
  document.getElementById("studentId").readonly = false;
  // 7. Đặt lại action = Create
  action = "Create";
}

//Xóa sinh viên
function deleteStudent(studentId) {
  // 1. Xóa sinh viên trong arrStudent
  let indexDelete = getIndexStudentById(studentId);
  arrStudents.splice(indexDelete, 1);
  //2. Lưu mảng vào local storage
  localStorage.setItem("arrStudents", JSON.stringify(arrStudents));
  // 3. render lại dữ liệu trên table
  readData();
}

function getIndexStudentById(studentId) {
  //Duyệt các phần tử trong mảng arrStudents theo chỉ số index
  // return arrStudents.findIndex((student) => {
  //   return student.studentId == studentId;
  // });
  let index = arrStudents.findIndex((student, index) => {
    return student.studentId == studentId;
  });
  return index;
  //Trả về chỉ số phần tử sinh viên trong mảng
}

//reset dữ liệu đã nhập trên form
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("male").checked = false;
  document.getElementById("female").checked = false;
}

//lấy thông tin sinh viên trên form và trả về đối tượng sinh viên đó
function getData() {
  let studentId = document.getElementById("studentId").value;
  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let sex = document.querySelector("input[type='radio']:checked").value;
  let student = { studentId, fullName, email, phone, address, sex };
  return student;
}

//Khi trình duyệt load xong giao diện, lấy dữ liệu từ mảng arrStudents hiển thị trên table
window.onload = readData();
