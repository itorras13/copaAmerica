$(document).ready(function(){
    text = "Choose a Team";
    var index = 0;
    var finalists = [];
  $('.semi_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    index = finalists.indexOf(prevValue);
    if (index > -1) {
        finalists.splice(index, 1);
    }
    var value = $(this).val();
    finalists.push(value);
    finalists.sort();
    $(this).data('previous',value);
    var s1 = $("#s1").children("option").filter(":selected").text();
    var s2 = $("#s2").children("option").filter(":selected").text();
    var s3 = $("#s3").children("option").filter(":selected").text();
    var s4 = $("#s4").children("option").filter(":selected").text();
    if (s1!=text&&s2!=text&&s3!=text&&s4!=text) {
        $('.fin_select')
            .find('option')
            .remove()
            .end()
            .append('<option disabled selected value style="display: none">Choose a Team</option>')
        ;
        for (var i = 0; i < finalists.length; ++i) {
            $('#third_place').append($("<option></option>")
                        .attr("value",finalists[i])
                        .text(finalists[i])); 
        }
        $('#fin1').append($("<option></option>").attr("value",s1).text(s1));
        $('#fin1').append($("<option></option>").attr("value",s2).text(s2));
        $('#fin2').append($("<option></option>").attr("value",s3).text(s3));
        $('#fin2').append($("<option></option>").attr("value",s4).text(s4));
    }
  });
  $('.fin_select').on('change', function(event ) {
    var prevValue = $(this).data('previous');
    $('#third_place').not(this).find('option[value="'+prevValue+'"]').show();
    var value = $(this).val();
    $(this).data('previous',value);
    $('#third_place').not(this).find('option[value="'+value+'"]').hide();
    var fin1 = $("#fin1").children("option").filter(":selected").text();
    var fin2 = $("#fin2").children("option").filter(":selected").text();
    if (fin1!=text&&fin2!=text) {  
        $('.champs_select')
            .find('option')
            .remove()
            .end()
            .append('<option disabled selected value style="display: none">Choose a Team</option>')
        ;
        $('#champion').append($("<option></option>").attr("value",fin1).text(fin1));
        $('#champion').append($("<option></option>").attr("value",fin2).text(fin2));
    }
  });
});