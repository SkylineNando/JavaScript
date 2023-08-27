var currentPage = 1;
var commentsPerPage = 10;
var minimumComments = 30; 

$(document).ready(function () {
  $('#loadMoreButton').click(function () {
    if (!$(this).hasClass('disabled')) {
      currentPage++;
      loadComments(currentPage, true);
    }
  });
});


function loadComments(page, append) {
  var post_id = $('#post_id').val();
  $.ajax({
    type: 'POST',
    url: 'carregar_comentarios.php',
    data: {
      post_id: post_id,
      page: page,
      commentsPerPage: commentsPerPage
    },
    success: function (data) {
      if (append) {
        $('#comentarios').append(data);
      } else {
        $('#comentarios').html(data);
      }


      // Verificar se o número de comentários carregados é maior ou igual à quantidade mínima
      var numLoadedComments = $('#comentarios').children().length;
      if (numLoadedComments >= minimumComments) {
        $('#loadMoreButton').show(); // Mostra o botão
      } else {
        $('#loadMoreButton').hide(); // Oculta o botão
      }

      // Check if no comments were loaded
      if (data.trim() === "") {
        $('#loadMoreButton').hide(); // Hide the button
      }
    }
  });
}
