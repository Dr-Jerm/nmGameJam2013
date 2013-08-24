var images = new Array();

var imageSrcList = new Array();
var imageCounter = 0;  

function LoadImage(_imageSrc)
{
	var img = new Image();
	console.log("loading "+_imageSrc);
	img.onload = LoadImageCallBack(); 
	img.src = "images/"+_imageSrc; 

	images[_imageSrc] = img;
}

function LoadImageCallBack()
{
	imageCounter++; 
	
	if (imageCounter >= imageSrcList.length) 
	{
		console.log("All images loaded.");
		READY = true; 

	}

}

imageSrcList.push("Grumpy-Cat.jpg");
imageSrcList.push("sperm.png");
imageSrcList.push("Egg.png");
imageSrcList.push("BGsecondary001.png");
imageSrcList.push("BGfull001.png");

for (imgsrc in imageSrcList)
{
	LoadImage(imageSrcList[imgsrc]);
}


