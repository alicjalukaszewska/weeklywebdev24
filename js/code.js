(function(){
'use strict';

/* Fixed navbar styling */

function changeMenu() {
	const menu = document.querySelector('.top-menu');
	if (window.scrollY == 0){
		menu.classList.remove('scrolled');
	} else {
		menu.classList.add('scrolled');
	}
}

window.addEventListener('scroll', changeMenu);


/* Trending Items slider */

const links = document.querySelectorAll('.chooseItem button');
const trendingItemSection = document.querySelector('.trendingItems');
const offsetContentDiv = document.querySelector('.trendingItems__itemsContainer');
const content = document.querySelectorAll('.content');
const currentItemWrapper = document.querySelector('.trendingItems__item');
let active = document.querySelector('.chooseItem button.active');
let showItem;

function resetActiveItem () {
	currentItemWrapper.style.transform = "translateX(0)";
	active.classList.remove('active');
	active = links[0];
	active.classList.add('active');
}

//change position depending of screen size
function getItemPosition () {
	//if user resize or reload site reset active item
	resetActiveItem();
	//get width of container
	const currentWidth = offsetContentDiv.offsetWidth;
	//set new width to items
	content.forEach(item => {
		item.style.width =`${currentWidth}px`;
	})
	//change content position
	for(let i = 0; i < links.length; i++) {
		let position = currentWidth * i;
		links[i].dataset.pos = `-${position}px`;
	} 
}

//onclick change visible item
function changeTrendingItem () {
	active = this;
	links.forEach(link => link.classList.remove('active'));
	this.classList.add('active');
	const currentPosition = this.getAttribute("data-pos");
	currentItemWrapper.style.transform = (`translateX(${currentPosition})`);
}

//change visible item every few seconds
function changeItemInTime () {
	let lastItem = links[links.length - 1];
	let firstItem = links[0];
	//if lastItem return to first
	if (active === lastItem) {
		active = firstItem;
	} else {
		active = active.nextElementSibling;
	}
	active.classList.remove('active');
	active.click();	
}

window.addEventListener('load', getItemPosition);
window.addEventListener('resize', getItemPosition);

links.forEach(li => li.addEventListener('click', changeTrendingItem));

trendingItemSection.addEventListener('mouseover', function() {
	clearInterval(showItem);
	showItem = 0;
})

trendingItemSection.addEventListener('mouseout', function() {
	showItem = setInterval(changeItemInTime, 5000);
})


/* Blog slider */

const prevPost = document.querySelector('#prevPost');
const nextPost = document.querySelector('#nextPost');
const itemBlog = document.querySelectorAll('.fromBlog__item');
const blogWrapper = document.querySelector('.fromBlog__blog');

function getBlogWrapperWidth () {
	let allItemsWidth = getBlogItemWidth() * itemBlog.length;
	blogWrapper.style.width = `${allItemsWidth}px`;
}

function getBlogItemWidth() {
	const wrapperSize = document.querySelector('.fromBlog__container').offsetWidth;
	let itemWidth = wrapperSize;
	if (window.innerWidth >= 920){
		itemWidth = wrapperSize / 2;
	}
	itemBlog.forEach(note => note.style.width = itemWidth + 'px')
	return itemWidth;
}

function disableArrow (arrow, secondArrow) {
	arrow.disable = true;
	arrow.classList.add('disable');
	secondArrow.addEventListener('click', changeBlogItem);
}

//get current translateX value
function getCurrentTranslateX () {
	let getTranslateX = window.getComputedStyle(blogWrapper);
	let matrix = new WebKitCSSMatrix(getTranslateX.webkitTransform);
	return matrix.m41;
}

function changeBlogItem () {
	//prevent user to click arrows during transition
	prevPost.removeEventListener('click', changeBlogItem);
	nextPost.removeEventListener('click', changeBlogItem);
	//get width of blog items
	let width = -(getBlogItemWidth());
	let currentX = getCurrentTranslateX();
	//check which arrow was clicked
	if (this.id == 'nextPost'){
		//stop on last item
		if (currentX == width * (itemBlog.length - 1)) {
			disableArrow(this, prevPost);
			return;
		}
		prevPost.classList.remove('disable');
		blogWrapper.style.transform = (`translateX(${currentX + width}px)`);
	} else {
		//stop on first item
		if (currentX === 0) {
			disableArrow(this, nextPost);
			return;
		}
		nextPost.classList.remove('disable');
		blogWrapper.style.transform = (`translateX(${currentX - width}px)`);
	}
	//let user click arrows again after transition
	blogWrapper.addEventListener('transitionend', () => {
		prevPost.addEventListener('click', changeBlogItem);
		nextPost.addEventListener('click', changeBlogItem);
	})
}

window.addEventListener('load', () => { 
		getBlogWrapperWidth();
		getBlogItemWidth();
});
window.addEventListener('resize', () => { 
		getBlogWrapperWidth();
		getBlogItemWidth();
});

prevPost.addEventListener('click', changeBlogItem);
nextPost.addEventListener('click', changeBlogItem);

/* dropdown menu */

const dropdownBtn = document.querySelector('#nav-icon');
const menu = document.querySelector('nav.dropdown');

dropdownBtn.addEventListener('click', () => menu.classList.toggle('dropped'));
dropdownBtn.addEventListener('click', () => dropdownBtn.classList.toggle('open'));

//hide dropdown when window is wider than 920px
let screenMediaQuery = window.matchMedia("only screen and (min-width: 920px)");
screenMediaQuery.addListener(screenTest);

function screenTest (e) {
	if (e.matches){
		menu.classList.remove('dropped');
	}
}


}());