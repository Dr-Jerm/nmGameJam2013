var images = new Array();

var imageSrcList = new Array();
var imageCounter = 0;  

function LoadImage(_imageSrc)
{
	var img = new Image();
	console.log("loading "+_imageSrc);
	img.onload = LoadImageCallBack(); 
	img.src = "images/"+_imageSrc; 
	img.map = THREE.ImageUtils.loadTexture(img.src);

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
imageSrcList.push("newEggMain.png");
imageSrcList.push("newEggOuterRing1.png");
imageSrcList.push("newEggInsidePartBig.png");
imageSrcList.push("newEggInsidePartSml.png");
imageSrcList.push("newEggInsidePartSml2.png");
imageSrcList.push("BGsecondary001.png");
imageSrcList.push("BGfull001.png");

imageSrcList.push("particulate001.png");
imageSrcList.push("particulate002.png");
imageSrcList.push("particulate003.png");

// imageSrcList.push("particulars002.png");
// imageSrcList.push("particulars003.png");
// imageSrcList.push("particulars004.png");
// imageSrcList.push("particulars005.png");
// imageSrcList.push("particulars006.png");
// imageSrcList.push("particulars007.png");
// imageSrcList.push("particulars008.png");

for (imgsrc in imageSrcList)
{
	LoadImage(imageSrcList[imgsrc]);
}


