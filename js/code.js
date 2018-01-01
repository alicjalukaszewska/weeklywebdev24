
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

