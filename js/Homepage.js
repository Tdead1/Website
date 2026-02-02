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

function CardDisplayModification(aCardNumber, anElementID)
{
	if(elementMouseIsOver.id == anElementID && clicked == true)
	{
		infoSlides[aCardNumber].style.display = "block";
		openSlide = aCardNumber;
	}
	else if ((!(elementMouseIsOver == infoSlides[aCardNumber] || elementMouseIsOver.parentNode == infoSlides[aCardNumber]) && clicked == true) || openSlide != aCardNumber)
	{
		infoSlides[aCardNumber].style.display = "none";
	}
}

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
		
		CardDisplayModification(0, "cardDivision");
		CardDisplayModification(1, "cardWarlords");
		CardDisplayModification(2, "cardAvatar");
		CardDisplayModification(3, "cardBioside");
		CardDisplayModification(4, "cardShatteredLights");
		CardDisplayModification(5, "cardBabooms");
		CardDisplayModification(6, "cardTiframe");
		CardDisplayModification(7, "cardUnannounced");
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