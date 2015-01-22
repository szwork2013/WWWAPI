$( document ).ready(function() {


  

$( "form" ).submit(function( event ) {
  console.log('Getting Tokens!!');
  $.post( "/admin/login", function( data ) {
    console.log('Got Token');
    localStorage.setItem('authToken', data.token);
    loadDashboard();
  });
  event.preventDefault();
})

if (localStorage.getItem('authToken')) {
    loadDashboard()
  }


});



function loadDashboard () {

  $.ajax({
    type: 'GET',
    url: '/admin/home',
    headers: {
      'Authorization' : 'Bearer '+ localStorage.getItem('authToken')
    }
  })
  .done(function (data) {
    document.body.innerHTML = data;
  })
  .fail(function (err) {
    var msg = JSON.parse(err.responseText);
    alert(msg.message);
  })
}
