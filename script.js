$(document).ready(function(){

  var template_calendar=$('#template_calendar').html();
  var template_function=Handlebars.compile(template_calendar)

  var date = '2018-01-01';
  var moment_date = moment(date);

  var mese= moment_date.format("MMMM");
  var anno= moment_date.format("YYYY")
  var mese_anno= mese+' '+anno;

  var giorni=moment_date.daysInMonth();
  console.log(giorni);

  for (var i = 1; i <= giorni.length; i++) {

  }
  console.log(giorno)

  var placeholder={
    'mese': mese_anno
  }

  var html=template_function(placeholder);
  $('.container_mesi').append(html);

});
