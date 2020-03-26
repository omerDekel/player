

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.7.2.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


setTimeout(function () {

    $.ajax({
        url: "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867",
        dataType: "jsonp",
        jsonpCallback: "logResults"
    });


}, 5000);


function logResults(json){
    const jsonData = json.data;
    

const steps = jsonData.structure.steps;
var editedSteps = [];
const tooltip = jsonData.tiplates.tip;
//var tipWidth = tooltip.width();
//var tipHeight = tooltip.height();
// let tooltipHtml = "";

// for(let i=0;i<tooltip.length;i++){
//     if(tooltip.charAt(i)!='"'){
//         tooltipHtml+=tooltip.charAt(i);
//     }else{
//         tooltipHtml+="'";
//     }
// }

// $(steps[0].action.selector).append(tooltip);

// $(".popover-content [data-iridize-id]")[0].innerHTML = steps[0].action.contents["#content"];


$("body").append(tooltip);

// $(".popover-content [data-iridize-id]")[0].innerHTML = steps[0].action.contents["#content"];
const tipHeight = 100;
const tipWidth = 300;
//styles
$("div[role=region]")[0].style = "width:" +tipWidth+"px;height:"+ tipHeight+"px;border: 2px solid black;position: relative;z-index:9998 !important; background-color: #477b82;direction: ltr;border-radius: 7px;";
$("button[data-iridize-role=closeBt]")[0].style = "left: 0;position: absolute;border: none;background-color: #477b82;outline:0;cursor:pointer;border-radius: 7px;";

$("[data-iridize-role=nextBt]")[0].style = "text-decoration: none;color: black;outline:0;cursor:pointer;"
$(".prev-btn.default-prev-btn")[0].style = "background-color: #477b82;border: none;outline:0;cursor:pointer;"
$(".prev-btn.default-later-btn")[0].style = "background-color: #477b82;border: none;outline:0;cursor:pointer;";
$(".stFooter")[0].style = "bottom: 0;position: absolute;left: 92px;";
$("div[data-iridize-id=content]")[0].style = "position: absolute;top: 20px;text-align: center;width: 100%;";
$(".steps-count")[0].style = "display:block;";

// $(".steps-count [data-iridize-role=stepCount]")[0].innerText = elementIndex;
// $(".steps-count [data-iridize-role=stepsCount]")[0].innerText = steps.length;
$(".powered-by")[0].style = "display:none;";
let elementIndex = 0;
for (let step of steps) {
    //creating steps array without the last element and not-founded elements
    elementStepQ = $(step.action.selector);
    if (step.id != "eol0" &&elementStepQ[0]) {
            let leftNext = elementStepQ.offset().left;
            let topNext = elementStepQ.offset().top;    
            //let location = steps[elementIndex].action.placement;
            let tipTop = topNext + 10+elementStepQ.height();
            let tipLeft = leftNext;
            if(tipLeft + tipWidth > window.innerWidth) {
                tipLeft = window.innerWidth - (10+tipWidth);
            }
            if(tipTop +tipHeight> window.innerHeight){
                tipTop = window.innerHeight - (10+tipHeight);
            }
        var stepObj = {elementOfStep:elementStepQ,topStep:tipTop,leftStep: tipLeft ,content:step.action.contents["#content"]}
         editedSteps.push(stepObj);
     }
 }

// $("[role=region]").css("left",$(steps[0].action.selector).offset().left)
// $("[role=region]").css("top",$(steps[0].action.selector).offset().top)
setToolTipToNextElement();

function setToolTipToNextElement(){
    if(elementIndex < editedSteps.length){
        /*let nextElement = $(editedSteps[elementIndex].action.selector);
        if(nextElement[0]){
            let leftNext = nextElement.offset().left;
            let topNext = nextElement.offset().top;    
            //let location = steps[elementIndex].action.placement;
            let tipTop = topNext + 10+nextElement.height();
            let tipLeft = leftNext;
            if(tipLeft + tipWidth > window.innerWidth) {
                tipLeft = window.innerWidth - (10+tipWidth);
            }
            if(tipTop +tipHeight> window.innerHeight){
                tipTop = window.innerHeight - (10+tipHeight);
            }*/
        $("[role=region]").css("left",editedSteps[elementIndex].leftStep);
        $("[role=region]").css("top",editedSteps[elementIndex].topStep);

        $(".popover-content [data-iridize-id]")[0].innerHTML = editedSteps[elementIndex].content;
        elementIndex++;
        $(".steps-count [data-iridize-role=stepCount]")[0].innerText = elementIndex;
        $(".steps-count [data-iridize-role=stepsCount]")[0].innerText = editedSteps.length;
        /*}else{
            console.log(" couldnt find " +editedSteps[elementIndex].action.selector);
        }*/
    }else if(elementIndex == editedSteps.length){
        //we got to the last step so close
        $("[role=region]").css("display","none");
    }

}

function setToolTipToPrevElement(){
    debugger
    if( elementIndex >1){
        elementIndex--;
        /*let nextElement = $(editedSteps[elementIndex].action.selector);
        if(nextElement[0]){*/
            /*let leftNext = nextElement.offset().left;
            let topNext = nextElement.offset().top;    
            //let location = steps[elementIndex].action.placement;
            let tipTop = topNext + 10+nextElement.height();
            let tipLeft = leftNext;
            if(tipLeft + tipWidth > window.innerWidth) {
                tipLeft = window.innerWidth - (10+tipWidth);
            }
            if(tipTop +tipHeight> window.innerHeight){
                tipTop = window.innerHeight - (10+tipHeight);
            }
            $("[role=region]").css("left",tipLeft);
            $("[role=region]").css("top",tipTop);

            $(".popover-content [data-iridize-id]")[0].innerHTML = editedSteps[elementIndex].action.contents["#content"];
           $(".steps-count [data-iridize-role=stepCount]")[0].innerText = elementIndex;
           $(".steps-count [data-iridize-role=stepsCount]")[0].innerText = editedSteps.length;*/
           $("[role=region]").css("left",editedSteps[elementIndex].leftStep);
           $("[role=region]").css("top",editedSteps[elementIndex].topStep);
   
           $(".popover-content [data-iridize-id]")[0].innerHTML = editedSteps[elementIndex].content;
           elementIndex++;
           $(".steps-count [data-iridize-role=stepCount]")[0].innerText = elementIndex;
           $(".steps-count [data-iridize-role=stepsCount]")[0].innerText = editedSteps.length;
        /*}else{
            console.log(" couldnt find " +editedSteps[elementIndex].action.selector);
        }*/
    }
}

$(".prev-btn.default-prev-btn").click(setToolTipToPrevElement);
$(".next-btn").click(setToolTipToNextElement);
$("[data-iridize-role=closeBt]").click(function(){
    $("[role=region]").css("display","none");
});

$(".prev-btn.default-later-btn").click(function(){
    $("[role=region]").css("display","none");
    setTimeout(function(){
        $("[role=region]").css("display","block");
    },5000);

})


}
