<header>
    <h4 class="text-5 letter-spacing--1"><?php echo $snippet['title']; ?></h4>
    <?php if (isset($snippet['subtitle'])): ?>
        <p class="margin-top--2 color-bored-gray font-weight-300 text-3">
            <?php echo $snippet['subtitle']; ?>
        </p>
    <?php endif; ?>
</header>