//Inject javascript into HTML pages from console (thanks to https://gist.github.com/SantoshSrinivas79/69f235e0876a87c53668).
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.7.2.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

class Player {
    constructor() {
        this.steps = [];
        //Steps array after processing .
        this.editedSteps = [];
        //Current element index.
        this.elementIndex = 0;
        this.tipHeight = 100;
        this.tipWidth = 300;
    }

    //Create tooltip followed by the json object.
    play = (json) => {
        const jsonData = json.data;
        this.steps = jsonData.structure.steps;
        const tooltip = jsonData.tiplates.tip;
        //Appending tip to the html.
        $("body").append(tooltip);
        this.setStyles();
        this.setEvenetListeners();
        //Creating steps array with the relevant properties.
        for (let step of this.steps) {
            //creating steps array without the last element and not-founded elements
            let elementStepQ = null;
            // if the jquery returns 2 elements.
            if ($(step.action.selector).length == 2) {
                elementStepQ = $($(step.action.selector).toArray().pop());
            } else {
                elementStepQ = $(step.action.selector);
            }
            if (step.id != "eol0" && (elementStepQ[0])) {
                let leftNext = elementStepQ.offset().left;
                let topNext = elementStepQ.offset().top;
                //calculate the location of left and top of tip 
                let tipTop = topNext + 10 + elementStepQ.height();
                let tipLeft = leftNext;
                if (tipLeft + this.tipWidth > window.innerWidth) {
                    tipLeft = window.innerWidth - (10 + this.tipWidth);
                }
                if (tipTop + this.tipHeight > window.innerHeight) {
                    tipTop = window.innerHeight - (10 + this.tipHeight);
                }
                var stepObj = { elementOfStep: elementStepQ, topStep: tipTop, leftStep: tipLeft, content: step.action.contents["#content"] }
                this.editedSteps.push(stepObj);
            }
        }
        this.updateTootip(this.elementIndex);
    }

    //Set css for the tiptool elements function.
    setStyles = () => {
        //styles
        $("div[role=region]")[0].style = "width:" + this.tipWidth + "px;height:" + this.tipHeight + "px;border: 2px solid black;position: relative;z-index:9998 !important; background-color: #477b82;direction: ltr;border-radius: 7px;";
        $("button[data-iridize-role=closeBt]")[0].style = "left: 0;position: absolute;border: none;background-color: #477b82;outline:0;cursor:pointer;border-radius: 7px;";
        $("[data-iridize-role=nextBt]")[0].style = "text-decoration: none;color: black;outline:0;cursor:pointer;"
        $(".prev-btn.default-prev-btn")[0].style = "background-color: #477b82;border: none;outline:0;cursor:pointer;"
        $(".prev-btn.default-later-btn")[0].style = "background-color: #477b82;border: none;outline:0;cursor:pointer;";
        $(".stFooter")[0].style = "bottom: 0;position: absolute;left: 92px;";
        $("div[data-iridize-id=content]")[0].style = "position: absolute;top: 20px;text-align: center;width: 100%;";
        $(".steps-count")[0].style = "display:block;";
        $(".powered-by")[0].style = "display:none;";
    }

    //Add event listeners
    setEvenetListeners = () => {
        $(".prev-btn.default-prev-btn").click(this.setToolTipToPrevElement);
        $(".next-btn").click(this.setToolTipToNextElement);
        $("[data-iridize-role=closeBt]").click(this.close);
        $(".prev-btn.default-later-btn").click(this.remindeMeLater);
    }

    //Set the tool position, step number and the content according to given index. 
    updateTootip = (index) => {
        $("[role=region]").css("left", this.editedSteps[index].leftStep);
        $("[role=region]").css("top", this.editedSteps[index].topStep);
        $(".popover-content [data-iridize-id]")[0].innerHTML = this.editedSteps[index].content;
        $(".steps-count [data-iridize-role=stepCount]")[0].innerText = (index + 1);
        $(".steps-count [data-iridize-role=stepsCount]")[0].innerText = this.editedSteps.length;
    }

    //Set the tool tip to the next step.
    setToolTipToNextElement = () => {
        if (this.elementIndex + 1 < this.editedSteps.length) {
            this.updateTootip(this.elementIndex + 1);
            this.elementIndex++;
        } else {
            //we got to the last step so close
            this.close();
        }
    }

    //Set the tool tip to the previous step.
    setToolTipToPrevElement = () => {
        if (this.elementIndex - 1 >= 0) {
            this.updateTootip(this.elementIndex - 1);
            this.elementIndex--;
        }
    }

    //Display the tool toop after 5 seconds.
    remindeMeLater = () => {
        $("[role=region]").css("display", "none");
        setTimeout(function () {
            $("[role=region]").css("display", "block");
        }, 5000);
    }

    //Stop display the tooltip.
    close = () => {
        $("[role=region]").css("display", "none");
    }

}

setTimeout(function () {
    const url = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";
    //Take out the json object from an endpoint to get a json guide.
    $.ajax({
        url,
        dataType: "jsonp",
        jsonpCallback: "playGuide"
    });
}, 5000);

//The function that passes as a callback parameter
function playGuide(json) {
    const player = new Player();
    player.play(json);
}

