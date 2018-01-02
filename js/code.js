
function changeMenu() {
	const menu = document.querySelector('.top-menu');
	if (window.scrollY == 0){
		menu.classList.remove('scrolled');
	} else {
		menu.classList.add('scrolled');
	}
}

function changeActive() {
	element.forEach(li => li.classList.remove('active'));
	this.classList.add('active');
}


const element = document.querySelectorAll('li');
element.forEach(li => li.addEventListener('click', changeActive));
window.addEventListener('scroll', changeMenu);

function getItemPosition () {
	for(let i = 0; i < links.length; i++) {
		const currentWidth = document.querySelector('.content').offsetWidth;
		const position = currentWidth * i;
		links[i].dataset.pos = `-${position}px`;
	} 
};

function changeTrendingItem () {
	const currentPosition = this.getAttribute("data-pos");
	const currentItemWrapper = document.querySelector('.trendingItems__item');
	currentItemWrapper.style.transform = (`translate3d(${currentPosition}, 0, 0)`);
}

const links = document.querySelectorAll('.chooseItem li');
links.forEach(li => li.addEventListener('click', changeTrendingItem));


function changeItemInTime () {
	let lastItem = document.querySelector('.chooseItem').lastChild;
	let firtsItem = document.querySelector('.chooseItem').firtsChild;
	setInterval(function(){
		links.forEach(li => {
			let active = li.classList.contains('active');
			if (active && li !== lastItem) {
				li.nextElementSibling.classList.add('active');
				li.nextElementSibling.click();							
			}
			if (li.classList.contains('active') && li !== firstItem) {
				li.previousElementSibling.classList.add('active');
				li.previousElementSibling.click();							
			}
			li.classList.remove('active');
		});
	}, 1000);
}

window.addEventListener('load', getItemPosition);
window.addEventListener('resize', getItemPosition);
window.addEventListener('load', changeItemInTime);