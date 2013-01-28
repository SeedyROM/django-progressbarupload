$(document).ready(function(){
  uuid = $('#progressBar').data('progress_bar_uuid');
  // form submission
  $('form').submit(function(){
    // Prevent multiple submits
    if ($.data(this, 'submitted')) return false;
    // Append X-Progress-ID uuid form action
    this.action += (this.action.indexOf('?') == -1 ? '?' : '&') + 'X-Progress-ID=' + uuid;
    $('#progressBar').removeAttr('hidden');
    // Update progress bar
    function update_progress_info() {
      $.getJSON(upload_progress_url+'?X-Progress-ID='+uuid, {'X-Progress-ID': uuid}, function(data, status){
        if(data){
          var progress = parseInt(data.uploaded, 10)/parseInt(data.length, 10)*100;
          $('#progressBar').attr('value', progress);
        }
        window.setTimeout(update_progress_info, 20);
      });
    }
    window.setTimeout(update_progress_info, 20);
    $.data(this, 'submitted', true); // mark form as submitted.
  });
});