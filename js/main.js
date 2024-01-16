/*sign up code*/
let userNameInput = document.getElementById('nameInput');
let userEmailInput = document.getElementById('emailInput');
let userPasswordInput = document.getElementById('passwordInput');
let signInEmailInput =document.querySelector('#signin-email-Input');
let signInPasswordInput =document.querySelector('#signin-password-Input');
let welcomePage = document.querySelector('.welcome');
let group =document.querySelector('.group');
let helloUser=document.querySelector('.welcome h1');
let redirect =document.querySelector('.redirect');
let signupForm=document.querySelector('.signup .group');
let usersInfo;
if(localStorage.getItem('users') !=null){
    usersInfo = JSON.parse(localStorage.getItem('users'));
}
else
{
    usersInfo=[];
}

function getUserData(){

    document.getElementById('alert').innerHTML=''
    if(userEmailInput.value=='' || userNameInput.value ==''||userPasswordInput.value=='')
    {
        document.getElementById('alert').innerHTML='please fill all inputs'
        return;
    }
    let valid=validatEmail();
    if(valid==false)
    {
        document.getElementById('alert').innerHTML='Invalid Email'
        return;
    }

    if(localStorage.getItem('users') !=null){
        let found =checkSignupEmail();
        if(found==true){
            document.getElementById('alert').innerHTML='you signup with this email before'
        }
        else{
                let userData ={
                name:userNameInput.value,
                email:userEmailInput.value,
                password:userPasswordInput.value
            }
            usersInfo.push(userData);
            clearForm();
            localStorage.setItem('users' ,JSON.stringify(usersInfo));
            redirect.classList.replace('d-none' , 'd-flex');
            signupForm.classList.add('d-none');
        }
    }
    else{
        let userData ={
            name:userNameInput.value,
            email:userEmailInput.value,
            password:userPasswordInput.value
        }
        usersInfo.push(userData);
        clearForm();
        localStorage.setItem('users' ,JSON.stringify(usersInfo));
        redirect.classList.replace('d-none' , 'd-flex');
        signupForm.classList.add('d-none');
    }

}




function checkSignupEmail(){
    for(let i=0 ;i<usersInfo.length;i++)
    {
        if(userEmailInput.value==usersInfo[i].email){
            return true;
        }
    }
    return false;
}

function clearForm(){
    userEmailInput.value=""
    userNameInput.value=""
    userPasswordInput.value=""
}


/* log in coooode */

function signIn(){
    document.getElementById('alert').innerHTML=''
    if(signInEmailInput.value=='' || signInPasswordInput=='')
    {
        document.getElementById('alert').innerHTML='please fill all inputs'
        return;
    }
    let approve=checkSigninEmail();
    if(approve==true)
    {
        group.classList.add('d-none');
        welcomePage.classList.remove('d-none');
        helloUser.innerHTML=`welcome`
    }
    else
    {
        document.getElementById('alert').innerHTML='Invalid Email or password';
    }
}

function checkSigninEmail(){
    for(let i=0 ;i<usersInfo.length;i++){
        if(signInEmailInput.value==usersInfo[i].email && signInPasswordInput.value==usersInfo[i].password)
        {
            return true;
        }
    }
    return false;
}

/* validation*/

function validatEmail(){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(userEmailInput.value.match(emailRegex)){
        return true;
    }
    return false;
}