$(document).ready(function(){
  var source=$('#template_calendar').html();
  var template=Handlebars.compile(source);

  var mindate=moment("2018-01-01");
  var maxdate=moment("2018-12-01");

  var dataattuale=moment("2018-01-01")
  generaMese(dataattuale);

  $('.next').click(function(){
    console.log(dataattuale.format('MMMM'))

    if (dataattuale.isSameOrAfter(maxdate)) {
      $(this).attr("disabled",true);
    }
    else {
      dataattuale.add(1,'months');
      generaMese(dataattuale);
      $(this).attr("disabled",false);
    }
  });

  $('.prev').click(function(){
    console.log(dataattuale.format('MMMM'))

    if (dataattuale.isSameOrBefore(mindate)) {
      $(this).attr("disabled",true);
    }
    else {
      dataattuale.subtract(1,'months');
      generaMese(dataattuale);
      $(this).attr("disabled",false);
    }
  });



  function generaMese(giornoattuale){

    $('#giorni_mesecorrente').html('');
    var meseattuale=giornoattuale.format('MMMM');
    var annoattuale=giornoattuale.format('YYYY');

    var giorniMese= giornoattuale.daysInMonth();
    $('#mese_corrente').text(meseattuale + " " + annoattuale);

    for (var i = 1; i <= giorniMese; i++) {
      var giorno= i;
      var context={
        'giorni': giorno + " " + meseattuale
      }
      $('#giorni_mesecorrente').append(template(context));
    }
  }


});
