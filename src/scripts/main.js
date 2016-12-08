// CONSULTATION MODAL IN FIRST SECTION
// Show and hidden of consultation modal by click
var fsActivity_consultation = document.getElementsByClassName('fs-activity__consultation');
var getConsultationModal_back = document.getElementsByClassName('get-consultation-modal__back')[0];
var getConsultationModal = document.getElementsByClassName('get-consultation-modal')[0];
var getConsultationModal_closeIcon = document.getElementsByClassName('get-consultation-modal__close-icon')[0];

for (var i = 0; i < fsActivity_consultation.length; i++) {
	fsActivity_consultation[i].addEventListener('click', showModal);
}

function showModal() {
	getConsultationModal_back.style.display = "block";	
	getConsultationModal_back.addEventListener('click', closeModal, true);
}
function closeModal(e) {
	if (e.target === getConsultationModal_back || e.target === getConsultationModal_closeIcon) {
		getConsultationModal_back.style.display = "none";
	}
}

// ROTATING OF ELEMENTS IN SECOND SECTION
// Front and back sides of current hovered and post hovered elements 
// are stored in variables.
// Each front side of elements gets mouseover eventlistener, which 
// initiate sequence of requestAnimationFrame functions.
var ssActivity = document.getElementsByClassName('ss-activity');
var ssActivityBackSide = document.getElementsByClassName('ss-activity-back-side');
var hoveredElementFront;
var hoveredElementBack;
var postHoveredElementFront;
var postHoveredElementBack;
var hoveredElementFrontAngle = 0;
var hoveredElementBackAngle = 270;
var postHoveredElementFrontAngle;
var postHoveredElementBackAngle;
var hoveredElementIndex;
var angleStep = 10;

for (var i = 0; i < ssActivity.length; i++) {
	addMouseoverListener(i);
}
function addMouseoverListener(k) {
	ssActivity[k].addEventListener('mouseover', function() {
		makePostHovered(k);
		makeHovered(k);
	});
}

function makeHovered(l) {
	hoveredElementIndex = l;
	hoveredElementFront = ssActivity[l];
	hoveredElementBack = ssActivityBackSide[l];
	requestAnimationFrame(rotateFront);	
}

function rotateFront(){
	if (hoveredElementFrontAngle <= 90) {
		hoveredElementFront.style.transform = "rotateY(" + hoveredElementFrontAngle + "deg)";
		hoveredElementFrontAngle += angleStep;
		requestAnimationFrame(rotateFront);
	} else {
		hoveredElementBackAngle = 270;
		requestAnimationFrame(rotateBack);
	}
}
function rotateBack(){
	if (hoveredElementBackAngle <= 360) {
		hoveredElementBack.style.transform = "rotateY(" + hoveredElementBackAngle + "deg)";
		hoveredElementBackAngle += angleStep;
		requestAnimationFrame(rotateBack);
	}		
}

function makePostHovered(m) {
	// Precaution for first case of mouseover,
	// when there is no post hovered elements and function call 
	// in result of repeat mouseover on the same element.	 
	if (hoveredElementIndex !== m && hoveredElementFront) {
		if (postHoveredElementFront) {	
			postHoveredElementBack.style.transform = "rotateY(270deg)";
			postHoveredElementFront.style.transform = "rotateY(0deg)";	
		}
		postHoveredElementFront = hoveredElementFront;
		postHoveredElementBack = hoveredElementBack;
		postHoveredElementFrontAngle = hoveredElementFrontAngle - angleStep;
		postHoveredElementBackAngle = hoveredElementBackAngle - angleStep;
		hoveredElementFrontAngle = 0;
		hoveredElementBackAngle = 370;
		requestAnimationFrame(rotatePostHoveredBack);		
	}
}
function rotatePostHoveredBack(){
	if (postHoveredElementBackAngle >= 270) {
		postHoveredElementBack.style.transform = "rotateY(" + postHoveredElementBackAngle + "deg)";
		postHoveredElementBackAngle -= angleStep;
		requestAnimationFrame(rotatePostHoveredBack);
	} else {
		requestAnimationFrame(rotatePostHoveredFront);
	}
}
function rotatePostHoveredFront(){
	if (postHoveredElementFrontAngle >= 0) {
		postHoveredElementFront.style.transform = "rotateY(" + postHoveredElementFrontAngle + "deg)";
		postHoveredElementFrontAngle -= angleStep;
		requestAnimationFrame(rotatePostHoveredFront);
	}		
}

// CASES SLIDER IN THIRD SECTION
// Infinite slider is controlled by click on corresponding arrows
var casesContainerWindow = document.getElementsByClassName('cases-container-window')[0];
var casesContainerFull = document.getElementsByClassName('cases-container-full')[0];
var caseElement = document.getElementsByClassName('case');
var ts_arrowLeft = document.getElementsByClassName('ts__arrow-left')[0];
var ts_arrowRight = document.getElementsByClassName('ts__arrow-right')[0];

var moveDistance;
if (window.innerWidth < 480) {
	var amountCaseElementsShown = 1;
	var moveStep = 280;
} else if (window.innerWidth < 1040) {
	amountCaseElementsShown = 1;
	moveStep = 426;
} else {
	amountCaseElementsShown = 2;
	moveStep = 450;
}
var moveCounter = -amountCaseElementsShown;
var caseElementLength = caseElement.length;
var casesAmount = caseElementLength + 2 * amountCaseElementsShown;
casesContainerFull.style.width = moveStep * casesAmount + "px";

var firstFalseElement = caseElement[0].cloneNode(true);
var secondFalseElement = caseElement[1].cloneNode(true);
var prelastFalseElement = caseElement[caseElement.length-2].cloneNode(true);
var lastFalseElement = caseElement[caseElement.length-1].cloneNode(true);
casesContainerFull.insertBefore(lastFalseElement, caseElement[0]);
casesContainerFull.appendChild(firstFalseElement);
if (window.innerWidth >= 1040) {
	casesContainerFull.insertBefore(prelastFalseElement, lastFalseElement);
	casesContainerFull.appendChild(secondFalseElement);
}

moveCaseContainer(moveCounter);	
function moveCaseContainer(counter) {
	moveDistance = counter * moveStep;
	casesContainerFull.style.transform = "translate(" + moveDistance + "px)";
} 

ts_arrowLeft.addEventListener('click', moveCaseContainerLeft);
function moveCaseContainerLeft() {
		casesContainerFull.style.transition = "transform .3s ease .2s";
		moveCounter++;
		moveCaseContainer(moveCounter);
}
ts_arrowRight.addEventListener('click', moveCaseContainerRight);
function moveCaseContainerRight() {
	casesContainerFull.style.transition = "transform .3s ease .2s";
	moveCounter--;
	moveCaseContainer(moveCounter);	
}
// conditional correction to make slider infinite
casesContainerFull.addEventListener('transitionend', shiftContainer);
var turnPoint1 = caseElementLength + 1;
var turnPoint2 = caseElementLength;
function shiftContainer() {
	if (moveCounter === -turnPoint1) {
		casesContainerFull.style.transition = "no";
		moveCounter = -1;
		moveCaseContainer(moveCounter);	
	} else if (moveCounter === 0) {
		casesContainerFull.style.transition = "no";
		moveCounter = -turnPoint2;
		moveCaseContainer(moveCounter);	
	}
}




