<?php
/*
    ./app/routeurs/tasksRouteur.php
    Routeur des Tasks
 */

include_once '../app/controleurs/tasksControleur.php';
use \App\Controleurs\Tasks;

  switch ($_GET['tasks']):
    /*
    AJOUT D'UNE NOUVELLE TÂCHE
    PATTERN: tasks/add
    URL: index.php?tasks=add
    CTRL: tasksControleur
    ACTION: addAction
    */
    case 'add':
    Tasks\addAction($connexion, $_POST['content']);
    break;

    /*
    SUPPRESSION D'UNE TÂCHE
    PATTERN: tasks/delete/{id}
    URL: index.php?tasks=delete&id=x
    CTRL: tasksControleur
    ACTION: deleteAction
    */
    case 'delete':
    Tasks\deleteAction($connexion, $_GET['id']);
    break;

    /*
    EDITION D'UNE TÂCHE : edit
    PATTERN: tasks/edit/{id}
    URL: index.php?tasks=edit&id=x
    CTRL: tasksControleur
    ACTION: editAction
    */
    case 'edit':
    Tasks\editAction($connexion, [
      'id'       => $_GET['id'],
      'content'  => $_POST['content']
    ]);
    break;

    /*
    EDITION D'UNE TÂCHE : toggleFinish
    PATTERN: tasks/toggleFinish/{id}
    URL: index.php?tasks=toggleFinish&id=x
    CTRL: tasksControleur
    ACTION: toggleFinishAction
    */
   case 'toggleFinish':
   Tasks\toggleFinishAction($connexion, [
     'id'       => $_GET['id'],
     'finished' => $_POST['finished']
   ]);
   break;

  endswitch;
