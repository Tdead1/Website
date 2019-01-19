document.addEventListener('mousemove', funcOnMouseUpdate, false);
document.addEventListener('click', funcOnMouseClicked, false);

var clicked = false;
var openSlide = -1;
var maxScale = 340;
var minScale = 254;
var cards;
var infoSlides;
var mouseX = 0;
var mouseY = 0;


function Init()
{
	cards = document.getElementsByClassName("card");
	infoSlides = document.getElementsByClassName('informationSlide'); 
	window.setInterval(Update, 16);
	
	// set initial values
	funcOnMouseUpdate();
}	
function Update()
{
	elementMouseIsOver = document.elementFromPoint(mouseX, mouseY);
	
	for(i = 0; i < cards.length; i++)
	{
		if(elementMouseIsOver == cards[i])
		{
			funcScaleImageUp(cards[i]);
		}
		else
		{
			funcScaleImageDown(cards[i]);
		}
	}

	if(elementMouseIsOver != null)
	{
		// card 0 BIOSIDE
		if(elementMouseIsOver.id == "cardBioside" && clicked == true)
		{
			infoSlides[0].style.display = "block";
			document.getElementById("videoBioside").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
			openSlide = 0;
		}
		else if ((!(elementMouseIsOver == infoSlides[0] || elementMouseIsOver.parentNode == infoSlides[0]) && clicked == true) || openSlide != 0)
		{
			//openSlide = -1;
			document.getElementById("videoBioside").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			infoSlides[0].style.display = "none";
		}
		
		// card 1 TIFRAME
		if(elementMouseIsOver.id == "cardTiframe" && clicked == true)
		{
			openSlide = 1;
			document.getElementById("videoTiFrame").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
			infoSlides[1].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[1] || elementMouseIsOver.parentNode == infoSlides[1]) && clicked == true)  || openSlide != 1)
		{
			//infoSlides[0].style.right = "-50vw"
			document.getElementById("videoTiFrame").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			infoSlides[1].style.display = "none";
			//openSlide = -1;
		}
		
		// card 2 BaBooms?
		if(elementMouseIsOver.id == "cardBabooms" && clicked == true)
		{
			openSlide = 2;
			infoSlides[2].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[2] || elementMouseIsOver.parentNode == infoSlides[2]) && clicked == true)  || openSlide != 2)
		{
			//infoSlides[0].style.right = "-50vw"
			infoSlides[2].style.display = "none";
			//openSlide = -1;
		}
		/*
		// card 3 Morbid?
		if(elementMouseIsOver.id == "card3" && clicked == true)
		{
			openSlide = 3;
			infoSlides[3].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[3] || elementMouseIsOver.parentNode == infoSlides[3]) && clicked == true)  || openSlide != 3)
		{
			//infoSlides[0].style.right = "-50vw"
			infoSlides[3].style.display = "none";
			//openSlide = -1;
		}
		
		// card 4 MMO framework?
		if(elementMouseIsOver.id == "card4" && clicked == true)
		{
			openSlide = 4;
			infoSlides[4].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[4] || elementMouseIsOver.parentNode == infoSlides[4]) && clicked == true)  || openSlide != 4)
		{
			//infoSlides[0].style.right = "-50vw"
			infoSlides[4].style.display = "none";
			//openSlide = -1;
		}
		*/
	}
	
	clicked = false;
}
function funcScaleImageUp(img)
{
	var imgSize = parseInt(256);
	img.style.zIndex  = 2;
	imgSize = parseInt(window.getComputedStyle(img).getPropertyValue("height"));
	imgSize = imgSize + 10;
	img.style.height = Math.max(minScale, Math.min(parseFloat(imgSize), maxScale)) + "px";
}

function funcScaleImageDown(img)
{
	var imgSize = parseInt(256);
	img.style.zIndex = 1;
	imgSize = parseInt(window.getComputedStyle(img).getPropertyValue("height"));
	imgSize = imgSize - 10;
	img.style.height = Math.max(minScale, Math.min(parseFloat(imgSize), maxScale)) + "px";
}

function funcOnMouseClicked() {
	clicked = true;		
}

function funcOnMouseUpdate(currentElement)
{
	if(currentElement != null)
	{
		mouseX = currentElement.clientX;
		mouseY = currentElement.clientY;
	}
}		