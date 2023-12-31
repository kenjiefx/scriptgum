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
    $blockName   = (isset($snippet['block_name'])) ? $snippet['block_name'].'/Form/Input/Text/' :'/Form/Input/Text';
    $fieldClass  = (isset($snippet['fieldset_class'])) ? $snippet['fieldset_class'] : '';
    $inputId     = (isset($snippet['id'])) ? 'id="'.$snippet['id'].'"' : '';

    $disabledValue = '';
    if (isset($snippet['disabled_attr_value'])) {
        $disabledValue = 'disabled="'.$snippet['disabled_attr_value'].'"';
    }
?>

<fieldset xblock="<?php echo $blockName; ?>" class="fieldset__input <?php echo $withBoxShadow.' '.$fieldClass; ?> padding-x-7 background-color-extra-gray:disabled padding-y-9 text-4 font-weight-300 border-radius-extra-small-2" <?php echo $disabled; ?> <?php echo $disabledValue; ?>>
    <?php if ($label): ?>
        <label class="color-label-gray margin-bottom-5" style="display:block;"><?php echo $label; ?></label>
    <?php endif; ?>
    <input <?php echo $inputId; ?> type="<?php echo $type; ?>" class="border-style-none width-24 background-color-transparent <?php echo $class.' "'.$model.' '.$placeholder.' '.$name.' '.$change; ?> />
</fieldset>