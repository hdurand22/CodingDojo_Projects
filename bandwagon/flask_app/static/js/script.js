// Show registration pane
function showUserReg() {
    let regForm =   
    `<form id="user_registration" onsubmit = "event.preventDefault(); handleUserRegistration(this);">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">First Name: </label>
            <input type="text" name="first_name" class="form-control" id="exampleFormControlInput1">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Last Name: </label>
            <input type="text" name="last_name" class="form-control" id="exampleFormControlInput1">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email: </label>
            <input type="email" name="email" class="form-control" id="exampleFormControlInput1">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Password: </label>
            <input type="password" name="password" class="form-control" id="exampleFormControlInput1">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Confirm Password: </label>
            <input type="password" name="confirm_password" class="form-control" id="exampleFormControlInput1">
        </div>
        <button class="btn btn-primary btn-lg">Register</button>
    </form>`;
    document.getElementById('registration-popup').innerHTML = regForm; 
    
}

// user registration handler

const handleUserRegistration = (e)  => {
    // let myForm = document.getElementById('user-registration');
    // myForm.onsubmit = function(e) {
    //     e.preventDefault();

    console.log("e: ", e);

    let form = new FormData(e);

    fetch('http://localhost:5000/register', {method: 'POST', body: form})
        .then(response => response.json())
        .then(data => console.log('data: ',data))
    
        .catch(err)
}

const handleLogin = (e) => {
    console.log("e: ", e);

    let form = new FormData(e);

    fetch('http://localhost:5000/login', {method: 'POST', body: form})
        .then(response => response.json())
        .then(data => console.log('data: ',data))
    
        .catch(err)
}