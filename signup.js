let text = document.querySelector('#text');
let input = document.querySelector('#input');
let btn = document.querySelector('#loginbarbtn');
let loginBar = document.querySelector('#loginbar');

const timing = {
    duration: 2000,
    iterations: 1,
};

const barAnimation = [
    { background: "linear-gradient(90deg, #1a73e8 0%, #fff 0%)" },
    { background: "linear-gradient(90deg, #fff 0%, #1a73e8 20%, #fff 40%)" },
    { background: "linear-gradient(90deg, #fff 0%, #1a73e8 40%, #fff 60%)" },
    { background: "linear-gradient(90deg, #fff 0%, #1a73e8 60%, #fff 80%)" },
    { background: "linear-gradient(90deg, #fff 0%, #1a73e8 80%, #fff 100%)" }
];

let username=undefined;
let name = undefined;
let email = undefined;
let pwd = undefined;

function changePage(){
    const animation = loginBar.animate(barAnimation,timing);
    if (text.innerText == 'Enter Your Name') {
        name = input.value;
        animation.finished.then(()=>{
            text.innerText = 'Choose your Username';
        })
    }
    else if (text.innerText == 'Choose your Username'){
        username = input.value;
        animation.finished.then(()=>{
            text.innerText = 'Enter your Email';
            input.type = 'email';
        })
    }
    else if (text.innerText == 'Enter your Email'){
        email = input.value;
        animation.finished.then(()=>{
            text.innerText = 'Enter your Password';
            input.type = 'password';
        })
    }
    else{
        pwd = input.value;
        location.replace('users.html')
    }
    input.value='';
};

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    changePage();
    const attrs = {
        name : name,
        email: email,
        pwd: pwd
    }    
    localStorage.setItem(username,JSON.stringify(attrs));

});



