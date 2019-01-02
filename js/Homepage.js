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
		if(elementMouseIsOver.id == "cardBioside" && clicked == true)
		{
			infoSlides[0].style.display = "block";
			document.getElementById("videoBioside").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
			openSlide = 0;
		}
		else if ((!(elementMouseIsOver == infoSlides[0] || elementMouseIsOver.parentNode == infoSlides[0]) && clicked == true) || openSlide != 0)
		{
			//openSlide = -1;
			document.getElementById("videoBioside").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
			infoSlides[0].style.display = "none";
		}
		
		if(elementMouseIsOver.id == "cardTiframe" && clicked == true)
		{
			openSlide = 1;
			infoSlides[1].style.display = "block";
		}
		else if ((!(elementMouseIsOver == infoSlides[1] || elementMouseIsOver.parentNode == infoSlides[1]) && clicked == true)  || openSlide != 1)
		{
			//infoSlides[0].style.right = "-50vw"
			infoSlides[1].style.display = "none";
			//openSlide = -1;
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