

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

const tooltip = jsonData.tiplates.tip;

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
let elementIndex = 0;
// for (let step of steps) {
//     if (step.action.type === "tip") {
//         const target = step.action.selector;
//         debugger;
//         $(target)[0].title = step.action.contents["#content"];
//     }
// }

$("body").append(tooltip);

$(".popover-content [data-iridize-id]")[0].innerHTML = steps[0].action.contents["#content"];

//styles
$("div[role=region]")[0].style = "width: 300px;height: 100px;border: 2px solid black;position: absolute;";
$("button[data-iridize-role=closeBt]")[0].style = "left: 0;position: absolute;";
$(".stFooter")[0].style = "bottom: 0;position: absolute;left: 105px;";
$("div[data-iridize-id=content]")[0].style = "position: absolute;top: 30px;left: 80px;";
$(".steps-count")[0].style = "display:none;";
$(".powered-by")[0].style = "display:none;";


$("[role=region]").css("left",$(steps[0].action.selector).position().left)
$("[role=region]").css("top",$(steps[0].action.selector).position().top)


function setToolTipToNextElement(){
    if( elementIndex >= 0 && elementIndex < steps.length && $(steps[elementIndex + 1].action.selector)[0]){
        $(".popover-content [data-iridize-id]")[0].innerHTML = steps[elementIndex+1].action.contents["#content"];

        // $(steps[elementIndex + 1].action.selector).parent().append($(steps[elementIndex].action.selector).parent().find("[role=region]").detach());
        $("[role=region]").css("left",$(steps[elementIndex + 1].action.selector).position().left)
        $("[role=region]").css("top",$(steps[elementIndex + 1].action.selector).position().top)
    }
    elementIndex++;

}

function setToolTipToPrevElement(){
    if(elementIndex<steps.length && elementIndex>0 && $(steps[elementIndex-1].action.selector)[0]){
        
        $(".popover-content [data-iridize-id]")[0].innerHTML = steps[elementIndex-1].action.contents["#content"];
        // $(steps[elementIndex-1].action.selector).parent().append($(steps[elementIndex].action.selector).parent().find("[role=region]").detach());

        $("[role=region]").css("left",$(steps[elementIndex-1].action.selector).position().left)
        $("[role=region]").css("top",$(steps[elementIndex-1].action.selector).position().top)
    }
    elementIndex--;
}

$(".prev-btn.default-prev-btn").click(setToolTipToPrevElement);

$(".next-btn").click(setToolTipToNextElement);

$("[data-iridize-role=closeBt]").click(function(){
    $("[role=region]").css("display","none");
});


}
  




  
