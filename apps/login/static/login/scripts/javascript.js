$(document).ready(function(){
    console.log("testing jquery functionality")

    //initialize odometer for the gold counter
    el = document.querySelector('#odometer')
    var od = new Odometer({
        el: el,
        value:0,
        format:"",
        theme: "slot-machine"
    })

    //This block of code is for the gradient on the action buttons
    var tl = new TimelineMax({yoyo:true, repeat:Infinity});
    tl.fromTo($("#action1"), 1, {background:'linear-gradient(to right, rgb(39,51,57) -200%, rgb(70,91,100))'}, {background:'linear-gradient(to right, rgb(39,51,57) 100%, rgb(70,91,100))'})
    tl.fromTo($("#action2"), 1, {background:'linear-gradient(to right, rgb(39,51,57) -200%, rgb(70,91,100))'}, {background:'linear-gradient(to right, rgb(39,51,57) 100%, rgb(70,91,100))'})
    tl.fromTo($("#action3"), 1, {background:'linear-gradient(to right, rgb(39,51,57) -200%, rgb(70,91,100))'}, {background:'linear-gradient(to right, rgb(39,51,57) 100%, rgb(70,91,100))'})
    tl.fromTo($("#action4"), 1, {background:'linear-gradient(to right, rgb(39,51,57) -200%, rgb(70,91,100))'}, {background:'linear-gradient(to right, rgb(39,51,57) 100%, rgb(70,91,100))'})

    //This block of code is for appending to the action log.
    //get the x/y of the button and the x/y of the last p tag, calculate difference use that for the left and top
    $(".actionButton").click(function(){

        //capture the value of this when it refers to our button, once inside the .get function it becomes the global object
        let _this = this;

        //Ajax get request to server for result of action
        $.get("/process", {"option":$(this).attr("id")},function(response){
            console.log(response)

            //update the gold counter
            od.update(od.value + response.resAmount)

            //append the string to the action log
       
            //Get the top and left relative to window of the button
            start = $(_this).offset()
            //Get the top and left relative to window of the action log
            end = $("#actionLog").offset()
            //Calculate the difference to use as an "offset" for the newly created element
            xStart = start.left - end.left;
            yStart = start.top - end.top;
            var el = $("<p></p>").text(response.resString)
            el.css({
                "position": "relative",
                "left": xStart, 
                "top": yStart, 
                "display":"inline-block",
                "background-color": "rgba(255,255,255,.8)",
                "padding":"5px",
                "box-shadow":"0px 10px 10px -5px rgb(0,0,0)"
            })
            if(response.resStatus == 2){
                el.css({"color":"red"})
            }
            $("#actionLog").prepend($("<br>"))
            $("#actionLog").prepend(el);

            var subTl = new TimelineMax();
            subTl.fromTo(el, 1, {transform: 'scale(0.01)', opacity:0}, {transform: 'scale(1)', opacity:1})
            subTl.to(el,1,{left:"0", top:"0"})
            subTl.to(el, 1, {boxShadow:"0px 0px 0px 0px rgb(0,0,0)", backgroundColor:"rgba(255,255,255,0)"})
         })

    })



})