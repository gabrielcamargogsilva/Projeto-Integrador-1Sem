        const criticidadeRadios = document.querySelectorAll('input[name="criticidade"]');
        const warningMessage = document.getElementById('warning-message');
        const prioridadeContainer = document.getElementById('prioridade-container');
        const prioridadeSelect = document.getElementById('prioridade');

        const cardMap = {
            baixa: document.getElementById('card-baixa'),
            media: document.getElementById('card-media'),
            alta:  document.getElementById('card-alta'),
        };

        function updateVisibility() {
            const selected = document.querySelector('input[name="criticidade"]:checked').value;

            // Update card checked styles
            Object.entries(cardMap).forEach(([val, card]) => {
                if (val === selected) {
                    card.classList.add('checked');
                } else {
                    card.classList.remove('checked');
                }
            });

            if (selected === 'alta') {
                warningMessage.classList.remove('hidden');
                prioridadeContainer.classList.add('hidden');
                prioridadeSelect.disabled = true;
                prioridadeSelect.value = '';
            } else {
                warningMessage.classList.add('hidden');
                prioridadeContainer.classList.remove('hidden');
                prioridadeSelect.disabled = false;
            }
        }

        criticidadeRadios.forEach(radio => {
            radio.addEventListener('change', updateVisibility);
        });

        updateVisibility();