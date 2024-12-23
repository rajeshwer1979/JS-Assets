function Button() {

    //private vars
    var container;
    var title;
    var icon;

    var _title = "Submit";
    var _icon = "assets/default.png";
    var _bgColor = "#fc0";


    function initialize() {

        //create element
        container = document.createElement('div');
        title = document.createElement('span');
        icon = document.createElement('img');
        icon.setAttribute('width', 24);
        icon.setAttribute('height', 24);

        //append child
        container.appendChild(title);
        container.appendChild(icon);

        //evetns
        container.addEventListener("mouseover", onOver);
        container.addEventListener("mouseout", onOut);
        container.addEventListener("click", onClick);

    }

    function style() {
        // adding class
        container.className = "button";
    }

    function update() {
        // adding to document
        title.innerHTML = _title;
        icon.src = _icon;
        container.style.backgroundColor = _bgColor;
    } 

    //event response
    function onOver(event) {
        container.style.backgroundColor = "#333333";
    }
    function onOut(event) {
        container.style.backgroundColor = _bgColor;
    }

    function onClick(event) {
        container.style.backgroundColor = "#666666";
    }

    //setters methods
    this.setTitle = function (k) {
        _title = k;
        update();
    }

    this.setIcon = function (k) {
        _icon = k;
        update();
    }

    this.setBgColor = function (k) {
        _bgColor = k;
        update();
    }
    this.setStyle = function (k) {
        container.setAttribute("style", k);
    }

    this.render = function (k) {
        k.appendChild(container);
    }

    //call the core methods once 
    initialize();
    style();
    update();

}

