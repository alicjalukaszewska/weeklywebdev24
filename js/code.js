
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


function changeTrendingItem () {
	const currentPosition = this.getAttribute("data-pos");
	const currentItemWrapper = document.querySelector('.trendingItems__item');
	currentItemWrapper.style.transform = (`translate3d(${currentPosition}, 0, 0)`);
}

const links = document.querySelectorAll('.chooseItem li');
links.forEach(li => li.addEventListener('click', changeTrendingItem));

