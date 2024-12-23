function ListItem() {

	var container;
	var imageContainer;
	var contentContainer;
	var buttonContainer;
	var title;
	var description;
	var replyButton;
	var editButton;
	var tempImage;
	var preloader;


	//private settables
	var _title = "Title";
	var _description = "Description";
	var _image = "images/1.jpg"


	function initialize() {

		container = document.createElement("div");
		imageContainer = document.createElement("div");
		contentContainer = document.createElement("div");
		buttonContainer = document.createElement("div");
		title = document.createElement("h1");
		description = document.createElement("p");
		contentContainer.appendChild(title);
		contentContainer.appendChild(description);
		contentContainer.appendChild(buttonContainer);
		container.appendChild(imageContainer);
		container.appendChild(contentContainer);


		replyButton = new Button();
		editButton = new Button();

		//methods 
		replyButton.setStyle("float:right");
		editButton.setStyle("float:right");

		replyButton.setTitle("Reply");
		replyButton.setBgColor("#f00");
		editButton.setBgColor("#369");
		editButton.setTitle("Edit");


		replyButton.render(buttonContainer);
		editButton.render(buttonContainer);

		var dummy = document.createElement("div");
		dummy.setAttribute("style", "clear:both");
		container.appendChild(dummy);


		preloader = document.createElement("img");
		preloader.src = "assets/preloader.gif";
		preloader.setAttribute("width", 20);
		imageContainer.appendChild(preloader);


		//window.addEventListener("resize", onResize);

		//for loading
		tempImage = document.createElement("img");


	}

	function style() {
		container.className = "list-item";
		imageContainer.className = "image";
		contentContainer.className = "content";
	}
	function update() {
		title.innerHTML = _title;
		description.innerHTML = _description;
		tempImage.src = _image;
		preloader.style.display = "block";
		tempImage.onload = function () {
			preloader.style.display = "none";
			imageContainer.style.backgroundImage = "url(" + _image + ")";
		}
	}

	//call once
	initialize();
	style();
	update();
	this.setTitle = function (k) {
		_title = k;
		update();
	}

	this.setDescription = function (k) {
		_description = k;
		update();
	}

	this.setImage = function (k) {
		_image = k;
		update();

	} 

	function onResize(event) {
		contentContainer.style.width = (container.clientWidth - imageContainer.clientWidth - 30) + "px";
	}

	this.render = function (k) {
		k.appendChild(container);
		contentContainer.style.width = (container.clientWidth - imageContainer.clientWidth - 30) + "px";
		}

	

}