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
		if(elementMouseIsOver.classList.contains("closeImage") && clicked == true)
		{
			openSlide = -1;
		}
		// card 0 BIOSIDE
		if(elementMouseIsOver.id == "cardBioside" && clicked == true)
		{
			infoSlides[0].style.display = "block";
			openSlide = 0;
		}
		else if ((!(elementMouseIsOver == infoSlides[0] || elementMouseIsOver.parentNode == infoSlides[0]) && clicked == true) || openSlide != 0)
		{
			document.getElementById("videoBioside").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			infoSlides[0].style.display = "none";
		}
		
		// card 1 Shattered Lights
		if(elementMouseIsOver.id == "cardShatteredLights" && clicked == true)
		{
			openSlide = 1;
			infoSlides[1].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[1] || elementMouseIsOver.parentNode == infoSlides[1]) && clicked == true)  || openSlide != 1)
		{
			infoSlides[1].style.display = "none";
			document.getElementById("videoShatteredLights").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		}
		
		// card 2 BaBooms
		if(elementMouseIsOver.id == "cardBabooms" && clicked == true)
		{
			openSlide = 2;
			infoSlides[2].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[2] || elementMouseIsOver.parentNode == infoSlides[2]) && clicked == true)  || openSlide != 2)
		{
			infoSlides[2].style.display = "none";
		}
		
		
		// card 1 TIFRAME
		if(elementMouseIsOver.id == "cardTiframe" && clicked == true)
		{
			openSlide = 3;
			infoSlides[3].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[3] || elementMouseIsOver.parentNode == infoSlides[3]) && clicked == true)  || openSlide != 3)
		{
			document.getElementById("videoTiFrame").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			infoSlides[3].style.display = "none";
		}
		
		
		
		// card 4 Gamejams
		if(elementMouseIsOver.id == "cardGameJams" && clicked == true)
		{
			openSlide = 4;
			infoSlides[4].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[4] || elementMouseIsOver.parentNode == infoSlides[4]) && clicked == true)  || openSlide != 4)
		{
			infoSlides[4].style.display = "none";
		}
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