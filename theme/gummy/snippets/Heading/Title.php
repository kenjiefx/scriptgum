<header>
    <h1 class="text-19 font-weight-bold letter-spacing--2 color-bored-gray"><?php echo $snippet['title']; ?></h1>
    <?php if (isset($snippet['subtitle'])): ?>
        <p class="margin-top-1 color-bored-gray font-weight-300 text-4">
            <?php echo $snippet['subtitle']; ?>
        </p>
    <?php endif; ?>
</header>