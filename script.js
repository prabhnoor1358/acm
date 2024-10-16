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
let pwd = undefined;

function changePage(){
    const animation = loginBar.animate(barAnimation,timing);
    if (text.innerText == 'Enter Your Username'){
        username = input.value;
        if (localStorage.getItem(username)){
            animation.finished.then(()=>{
                text.innerText = 'Enter Your Password';
                input.type = 'password';
            })
        }
        else{
            alert("Username not found \nPlease Sign In....");
        }
    }
    else{
        pwd = input.value;
        if (JSON.parse(localStorage.getItem(username)).pwd == pwd){
            location.replace('users.html');
        }
        else{
            alert("Invalid Password !!!");
        }
    }
    input.value='';
};

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    changePage();
});