(function(){const target = document.querySelector('main span')
const textArr = ['Web-Developer', 'Front-end-developer', 'Programmer', 'freelancer']
let index = 0;
let index2 = 0;

function typing(){
    if(index2<textArr[index].length){
        target.innerHTML += textArr[index][index2++]
        setTimeout(typing, 100)
    }else{
        setTimeout(erase, 1000)
    }
}
function erase(){
    if(index2 > 0){
        target.innerHTML = textArr[index].slice(0,--index2);
        setTimeout(erase, 50)
    }else{
        index = (index+1) % textArr.length;
        setTimeout(typing, 200)
    }
}
typing();
})();

const header = document.querySelector('header');
window.addEventListener('scroll', function(){
    if(window.scrollY > 0){
        header.classList.add("active");
    }else{
        header.classList.remove("active")
    }
})

const btnclk = document.querySelector('button')
const mainlc = document.querySelector('main').offsetTop
const sec1lc = document.querySelector('#about').offsetTop
const sec2lc = document.querySelector('#features').offsetTop
const sec3lc = document.querySelector('#portfolio').offsetTop
const sec4lc = document.querySelector('#contact').offsetTop
btnclk.onclick = function(){
    window.scrollTo({top:mainlc, behavior:"smooth"});
}
const btnclk2 = document.querySelector('ul button')
btnclk2.onclick = function(){
    window.scrollTo({top:sec1lc, behavior:"smooth"});
}
const btnclk3 = document.querySelector('#mjbtn')
btnclk3.onclick = function(){
    window.scrollTo({top:sec2lc, behavior:"smooth"});
}
const btnclk4 = document.querySelector('#ftbtn')
btnclk4.onclick = function(){
    window.scrollTo({top:sec3lc, behavior:"smooth"});
}
const btnclk5 = document.querySelector('#ctbtn')
btnclk5.onclick = function(){
    window.scrollTo({top:sec4lc, behavior:"smooth"});
}