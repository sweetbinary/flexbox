//flexbox stuff - sweet binary

var attr_style = "";
function init_flexbox_form() {

    //toggle menu collapsing
    $(".js-flexbox-css").on("click", "button", function (event){
        $(".js-article-flexbox").toggleClass("flexbox-collapse-menu");
    });

    //check when menu items are changed
    $(".js-flexbox-form").on("change", "input", function (event) {
        flexbox_form();        
    });
    //clear radio button selection when header is clicked
    $(".js-flexbox-form-col").on("click", "h2", function (event) {        
        $(this).parent().children("p").children("input").prop('checked', false);
        flexbox_form();
    });
    flexbox_form();

    //check when inputs inside cell are changed
    $(".js-flexbox-container").on("input", "input[type='text']", function (event) {
        flexbox_container();
    });
    $(".js-flexbox-container").on("change", "select", function (event) {        
        flexbox_container();
    });
    flexbox_container();

    //change the number of cells    
    $(".js-no-of-cells").change(function() 
    {
        set_cells($(this).val());
    });
    $(".js-no-of-cells").change();

    addDoubleClickELOnInputs();


    /*     
    //doesnt seem to work on selects
    
    $(".js-flexbox-container .flexbox-cell").on("dblclick", "select", function (event) {
        alert("f");
        var input_classes = "." + $(this).attr("class").replace(" ",".");
        var input_value = $(this).val();
        $(input_classes).val(input_value);
        flexbox_container();
    });
    */

}

function flexbox_container() {
    $(".js-flexbox-container .flexbox-cell").each(function () {    

        var style_dump = "";
        var input_for_flex = $(this).children("p").children(".js-input-for-flex").val();        
        var input_for_align_self = $(this).children("p").children(".js-align-self-select").val();
        var input_for_order = $(this).children("p").children(".js-input-for-order").val();
        var input_for_width = $(this).children("p").children(".js-input-for-width").val();
        var input_for_height = $(this).children("p").children(".js-input-for-height").val();
        
        if (input_for_flex != "")
        {
            style_dump+="flex: "+ input_for_flex +"; "            
        }        
        if (input_for_align_self != "0")
        {
            style_dump+=" align-self: "+ input_for_align_self +"; "    
        }
        if (input_for_order != "")
        {
            style_dump+=" order: "+ input_for_order +"; "    
        }  
        if (input_for_width != "")
        {
            style_dump+=" width: "+ input_for_width +"; "    
        } 
        if (input_for_height != "")
        {
            style_dump+=" height: "+ input_for_height +"; "    
        }        

        $(this).attr("style",style_dump);     
        $(this).children(".style-dump").text(style_dump);
    }); 
    //useless_animation();
}

function flexbox_form() {
    
    attr_style = "display: flex; ";
    $(".js-flexbox-form-col").each(function () {        
        var h2 = $(this).find("h2").html();
        var iD = $('input[name=' + h2 + ']:checked').attr("id");
        
        if (iD !== undefined) {
            $(this).addClass("show-close-button");
            attr_style += h2 + ": ";
            attr_style += iD.replace(h2 + "-", "") + "; ";
        }
        else{
            $(this).removeClass("show-close-button");
        }
    }); 

    $(".js-flexbox-container").attr("style", "");
    $(".js-flexbox-container").attr("style", attr_style);
    $(".js-flexbox-css span").text(attr_style);

    //useless_animation();
}

function set_cells(intt){

    var example_string = $(".js-flexbox-cell-example").html();
    var flex_dump = "";

    for (i = 1; i <= intt; i++) {
        flex_dump += example_string.replace("###",i).replace("XXX",makeid());
    } 

    $(".js-flexbox-container").html(flex_dump);
    addDoubleClickELOnInputs();

    //useless_animation();
}

//create a random 5 char length string for id
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function addDoubleClickELOnInputs()
{
    //if you doubleclick on an input/select inside the cell, then pass that attribute to all cells, there are issues with this than need fixin'
    $(".js-flexbox-container .flexbox-cell").on("dblclick", "input[type='text']", function (event) {
        var input_classes = "." + $(this).attr("class").replace(" ",".");
        console.log(input_classes);
        var input_value = $(this).val();
        $(input_classes).val(input_value);
        flexbox_container();
    });   
}





