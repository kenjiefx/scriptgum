<header>
    <h4 class="text-7 font-weight-500 color-bored-gray"><?php echo $snippet['title']; ?></h4>
    <?php if (isset($snippet['subtitle'])): ?>
        <p class="margin-top--2 color-bored-gray font-weight-300 text-3">
            <?php echo $snippet['subtitle']; ?>
        </p>
    <?php endif; ?>
</header>