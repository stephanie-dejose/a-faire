<?php
  /*
      ./app/vues/tasks/task.php
      Variables disponibles :
          - $task ARRAY(ARRAY(id, content, finished, created_at, updated_at))
   */
?>
<li class="todo" data-id="<?php echo $taskID; ?>">
  <div class="view">
    <input class="toggle" type="checkbox">
    <label><?php echo $content; ?></label>
    <button class="destroy"></button>
  </div>
</li>
