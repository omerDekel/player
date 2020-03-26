var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.7.2.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

class Player {

    constructor() {
        this.steps = [];
        this.editedSteps = [];
        this.elementIndex = 0;
        this.tipHeight = 100;
        this.tipWidth = 300;
    }

    play = (json) => {

        const jsonData = json.data;
        this.steps = jsonData.structure.steps;
        const tooltip = jsonData.tiplates.tip;

        $("body").append(tooltip);

        this.setStyles();
        this.setEvenetListeners();

        for (let step of this.steps) {
            //creating steps array without the last element and not-founded elements
            let elementStepQ = null;
            if ($(step.action.selector).length == 2) {
                elementStepQ = $($(step.action.selector).toArray().pop());
            } else {
                elementStepQ = $(step.action.selector);
            }
            if (step.id != "eol0" && (elementStepQ[0])) {
                let leftNext = elementStepQ.offset().left;
                let topNext = elementStepQ.offset().top;
                //calculate the loction of left and top of tip
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

    setEvenetListeners = () => {
        //Add event listeners
        $(".prev-btn.default-prev-btn").click(this.setToolTipToPrevElement);
        $(".next-btn").click(this.setToolTipToNextElement);
        $("[data-iridize-role=closeBt]").click(this.close);
        $(".prev-btn.default-later-btn").click(this.remindeMeLater);
    }

    updateTootip = (index) => {
        $("[role=region]").css("left", this.editedSteps[index].leftStep);
        $("[role=region]").css("top", this.editedSteps[index].topStep);
        $(".popover-content [data-iridize-id]")[0].innerHTML = this.editedSteps[index].content;
        $(".steps-count [data-iridize-role=stepCount]")[0].innerText = (index + 1);
        $(".steps-count [data-iridize-role=stepsCount]")[0].innerText = this.editedSteps.length;
    }

    setToolTipToNextElement = () => {
        if (this.elementIndex + 1 < this.editedSteps.length) {
            this.updateTootip(this.elementIndex + 1);
            this.elementIndex++;
        } else {
            //we got to the last step so close
            this.close();
        }
    }

    setToolTipToPrevElement = () => {
        if (this.elementIndex - 1 >= 0) {
            this.updateTootip(this.elementIndex - 1);
            this.elementIndex--;
        }
    }

    remindeMeLater = () => {
        $("[role=region]").css("display", "none");
        setTimeout(function () {
            $("[role=region]").css("display", "block");
        }, 5000);
    }

    close = () => {
        $("[role=region]").css("display", "none");
    }

}


setTimeout(function () {

    const url = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";

    $.ajax({
        url,
        dataType: "jsonp",
        jsonpCallback: "playGuide"
    });


}, 5000);


function playGuide(json) {
    const player = new Player();
    player.play(json);
}

