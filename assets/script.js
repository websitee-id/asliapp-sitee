document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var chips = document.querySelectorAll('.chip');
    var cards = document.querySelectorAll('.app-card');
    var searchInput = document.getElementById('searchInput');
    var emptyState = document.getElementById('emptyState');
    var activeFilter = 'semua';

    function applyFilters() {
        var term = searchInput ? searchInput.value.trim().toLowerCase() : '';
        var visibleCount = 0;

        cards.forEach(function (card) {
            var matchesCategory = activeFilter === 'semua' || card.dataset.cat === activeFilter;
            var name = card.dataset.name ? card.dataset.name.toLowerCase() : '';
            var matchesSearch = term === '' || name.indexOf(term) !== -1;
            var show = matchesCategory && matchesSearch;
            card.style.display = show ? 'flex' : 'none';
            if (show) visibleCount++;
        });

        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            chips.forEach(function (c) { c.classList.remove('active'); });
            chip.classList.add('active');
            activeFilter = chip.dataset.filter;
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (cards.length) {
        applyFilters();
    }
});
