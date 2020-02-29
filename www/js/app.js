/*
  ./app/app.js
*/
$(function(){

  /*========================
  AJOUT D'UNE NOUVELLE TÂCHE
  ========================*/
  $('header').on('keyup', '.new-todo', function(e){
    if(e.keyCode == 13) {
    e.preventDefault();
    $.ajax({
      url: 'tasks/add',
      data: {
          content: $(this).val(),
      },
      method: 'post',
      context: this
    })
     .done(function(reponsePHP){
       $('.todo-list').prepend(reponsePHP)
                 .find('li:first')
                 .hide()
                 .slideDown();
                 updateTasks();
     // Vide le champs après l'envoi
       $(this).val('');
     })
     .fail(function(e){
       console.log(e);
     });
    }
  })

  /*============================
  EDITION D'UNE TÂCHE - PARTIE 1
  ============================*/
  $('.todo-list').on('dblclick','.todo',function(e){
    e.preventDefault();
    let elementTexte = $(this).closest('li').find('label');
    let contenu = elementTexte.text();
    elementTexte.html('<input type="text"/>')
                .find('input')
                .val(contenu);
  });

  /*==================================
  EDITION D'UNE TÂCHE: PARTIE 2 (edit)
  ==================================*/
  $('.todo-list').on('keyup', '.todo', function(e){
    if(e.keyCode == 13) {
    let contenu = $(this).closest('li').find('label input').val();
    e.preventDefault();
    $.ajax({
        url: 'tasks/edit/' + $(this).closest('li').attr('data-id'),
        data: {
          content: contenu
        },
        method: 'post',
        context: this
      })
      .done(function(reponsePHP){
        $(this).closest('li').find('label').html(contenu);
      })
      .fail(function(e){
        console.log(e);
      });
    }
  });

  /*===============================
  FINIR UNE TÂCHE: toggleFinish
  ===============================*/
  $('.todo-list').on('click', '.toggle', function(){
    if ($(this).attr('checked') == 'checked') {
      $(this).removeAttr('checked');
      $.ajax({
          url: 'tasks/toggleFinish/' + $(this).closest('li').attr('data-id'),
          data: {
            finished: 0
          },
          method: 'post',
          context: this
        })
        .done(function(reponsePHP){
          $(this).closest('li').removeClass('completed');
          updateTasks();
        })
        .fail(function(e){
          console.log(e);
        });
    }
      else {
        $(this).attr('checked', 'checked');
        $.ajax({
            url: 'tasks/toggleFinish/' + $(this).closest('li').attr('data-id'),
            data: {
              finished: 1
            },
            method: 'post',
            context: this
          })
          .done(function(reponsePHP){
            $(this).closest('li').addClass('completed');
            updateTasks();
          })
          .fail(function(e){
            console.log(e);
          });
      }
  });

  /*========================
  SUPPRESSION D'UNE TÂCHE
  ========================*/
  $('.todo-list').on('click','.destroy', function(e){
    e.preventDefault();
    if(confirm("Etes-vous certain de vouloir supprimer cette tâche ?")) {
      $.ajax({
        url: 'tasks/delete/' + $(this).closest('li').attr('data-id'),
        context: this
      })
      .done(function(reponsePHP){
        $(this).closest('li').slideUp(function(){
        $(this).remove();
        updateTasks();
        });
      })
      .fail(function(){
        console.log(e);
      });
    }
  });

  /*================================
  BONUS - NOMBRE DE TÂCHES RESTANTES
  ================================*/
  function updateTasks(){
    let nbreTaches = $('.todo-list li:not(.completed)').length;
    $('.todo-count strong').text(nbreTaches);
  }

  /*=======================
  BONUS - FILTRE DES TÂCHES
  =========================*/

  $('.all').click(function(){
    $('.todo').slideDown();
  })

  $('.active').click(function(){
    $('.todo.completed').slideUp();
    $('.todo:not(.completed)').slideDown();
  })

  $('a.completed').click(function(){
    $('.todo:not(.completed)').slideUp();
    $('.todo.completed').slideDown();

  })
});
