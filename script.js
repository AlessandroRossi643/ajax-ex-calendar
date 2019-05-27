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
        'giorni': giorno + " " + meseattuale,
        'giornoiso': giornoattuale.format('YYYY-MM-')+ addzero(i)
      }
      $('#giorni_mesecorrente').append(template(context));
    }
    var mesenumero= giornoattuale.format('M');
    trovaFestivita(mesenumero);
  }

  function addzero(giorno){
    if (giorno<10) {
      return "0" + giorno;
    }
    else {
      return giorno;
    }
  }

  function trovaFestivita(mesescelto){

    $.ajax({
      url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0.",
      method:"GET",
      data:{
        'year': 2018,
        'month': mesescelto - 1
      },
      success: function(data){
        var result= data.response;
        console.log(result);

        for (var i = 0; i < result.length; i++) {
          var datafesta=result[i].date;
          var nomefesta=result[i].name;
        }


        $('li[data-giorno-iso]').each(function(){
          if ($(this).attr('data-giorno-iso')==datafesta) {
            var giornofesta= $(this).text();
            $(this).text(giornofesta+ " "+nomefesta)
            $(this).addClass("red");
          }
        });
      },
      error: function(){
        alert("Ops, qualcosa è andato storto");
      }
    });
  }
});
