<?php 
    $model       = (isset($snippet['model'])) ? 'xmodel="'.$snippet['model'].'"' : '';
    $placeholder = (isset($snippet['placeholder'])) ? 'placeholder="'.$snippet['placeholder'].'"' : '';
    $name        = (isset($snippet['name'])) ? 'name="'.$snippet['name'].'"' : '';
    $change      = (isset($snippet['change'])) ? 'xchange="'.$snippet['change'].'"' : '';
    $disabled    = (isset($snippet['is_disabled'])&&$snippet['is_disabled']) ? 'disabled' : '';
    $withBoxShadow = (isset($snippet['with_box_shadows'])&&$snippet['with_box_shadows']) ? 'fieldset__box-shadow' : '';
    $class       = (isset($snippet['class'])) ? $snippet['class'] : '';
    $label       = $snippet['label'] ?? false; 
    $type        = $snippet['type'] ?? 'text';
?>

<fieldset xblock="/Form/Input/Text" class="fieldset__input <?php echo $withBoxShadow; ?> padding-x-7 background-color-primary-extra-light:disabled padding-y-9 text-4 font-weight-300 border-radius-extra-small-2" <?php echo $disabled; ?>>
    <?php if ($label): ?>
        <label class="color-label-gray margin-bottom-5" style="display:block;"><?php echo $label; ?></label>
    <?php endif; ?>
    <input type="<?php echo $type; ?>" class="border-style-none width-24 background-color-transparent <?php echo $class.' "'.$model.' '.$placeholder.' '.$name.' '.$change; ?> />
</fieldset>