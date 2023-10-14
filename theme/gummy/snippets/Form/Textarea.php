<?php 
    $model       = (isset($snippet['model'])) ? 'xmodel="'.$snippet['model'].'"' : '';
    $placeholder = (isset($snippet['placeholder'])) ? 'placeholder="'.$snippet['placeholder'].'"' : '';
    $name        = (isset($snippet['name'])) ? 'name="'.$snippet['name'].'"' : '';
    $change      = (isset($snippet['change'])) ? 'xchange="'.$snippet['change'].'"' : '';
    $disabled    = (isset($snippet['is_disabled'])&&$snippet['is_disabled']) ? 'disabled' : '';
    $withBoxShadow = (isset($snippet['with_box_shadows'])&&$snippet['with_box_shadows']) ? 'fieldset__box-shadow' : '';
    $label       = $snippet['label']; 
    $style      = (isset($snippet['style'])) ? 'xstyle="'.$snippet['style'].'"' : '';
    
    $blockName = '/Form/Input/Textarea';
    if (isset($snippet['block'])) {
        $blockName = $blockName.'/'.$snippet['block'];
    }
?>

<fieldset xblock="<?php echo $blockName; ?>" <?php echo $style; ?> class="fieldset__input <?php echo $withBoxShadow; ?> padding-x-7 background-color-primary-extra-light:disabled padding-y-5 text-4 font-weight-300 border-radius-extra-small-2" <?php echo $disabled; ?>>
    <label class="color-label-gray"><?php echo $label; ?></label>
    <textarea rows="3" class="border-style-none width-24 background-color-transparent color-bored-gray text-3" <?php echo $model.' '.$placeholder.' '.$name.' '.$change; ?>></textarea>
</fieldset>