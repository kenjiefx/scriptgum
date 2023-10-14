<header>
    <h5 class="text-3 letter-spacing--1 font-weight-400"><?php echo $snippet['title']; ?></h5>
    <?php if (isset($snippet['subtitle'])): ?>
        <p class="margin-top--2 color-bored-gray font-weight-300 text-1">
            <?php echo $snippet['subtitle']; ?>
        </p>
    <?php endif; ?>
</header>