
//Show transparent background under menu
function changeMenu() {
	const menu = document.querySelector('.top-menu');
	if (window.scrollY == 0){
		menu.classList.remove('scrolled');
	} else {
		menu.classList.add('scrolled');
	}
}

window.addEventListener('scroll', changeMenu);

//change style of active element

const element = document.querySelectorAll('li');
function changeActive() {
	element.forEach(li => li.classList.remove('active'));
	this.classList.add('active');
}

element.forEach(li => li.addEventListener('click', changeActive));

// Trending Items slider

const links = document.querySelectorAll('.chooseItem li');
const trendingItemSection = document.querySelector('.trendingItems');
let active = document.querySelector('.chooseItem li.active');
const content = document.querySelector('.content');
let showItem;

function getBlogItemWidth() {
	const wrapperSize = document.querySelector('.fromBlog').offsetWidth;
	const itemWidth = wrapperSize / 2;
	const itemBlog = document.querySelectorAll('.fromBlog__item');
	itemBlog.forEach(note => note.style.width = itemWidth + 'px')
	return itemWidth;
}

//change position depending of screen size
function getItemPosition () {
	for(let i = 0; i < links.length; i++) {
		const currentWidth = content.offsetWidth;
		const position = currentWidth * i;
		links[i].dataset.pos = `-${position}px`;
	} 
}

//onclick change visible item
function changeTrendingItem () {
	active = this;
	const currentPosition = this.getAttribute("data-pos");
	const currentItemWrapper = document.querySelector('.trendingItems__item');
	currentItemWrapper.style.transform = (`translate3d(${currentPosition}, 0, 0)`);
}

//change visible item every few seconds
function changeItemInTime () {
	let lastItem = document.querySelector('.chooseItem').lastElementChild;
	let firstItem = document.querySelector('.chooseItem').firstElementChild;
	//if lastItem return to first
	if (active === lastItem) {
		firstItem.classList.add('active');
		active = firstItem;
	} else {
		active.nextElementSibling.classList.add('active');
		active = active.nextElementSibling;
	}
	active.classList.remove('active');
	active.click();	
}


window.addEventListener('load', () => { 
		getItemPosition();
		getBlogItemWidth();
	});
window.addEventListener('resize', getItemPosition);
links.forEach(li => li.addEventListener('click', changeTrendingItem));

trendingItemSection.addEventListener('mouseover', function() {
	clearInterval(showItem);
	showItem = 0;
})

trendingItemSection.addEventListener('mouseout', function() {
	showItem = setInterval(changeItemInTime, 5000);
})

