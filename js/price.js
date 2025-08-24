function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
        }

        function openModal(serviceType) {
            const modal = document.getElementById('modal-' + serviceType);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.transition = 'opacity 0.3s ease';
                modal.style.opacity = '1';
            }, 10);
        }

        function closeModal(serviceType) {
            const modal = document.getElementById('modal-' + serviceType);
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Fermer le modal si on clique à l'extérieur
        window.onclick = function(event) {
            const modals = ['soins', 'maquillage', 'ongles', 'epilation'];
            modals.forEach(function(type) {
                const modal = document.getElementById('modal-' + type);
                if (event.target === modal) {
                    closeModal(type);
                }
            });
        }

        // Fermer avec la touche Échap
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const modals = ['soins', 'maquillage', 'ongles', 'epilation'];
                modals.forEach(function(type) {
                    const modal = document.getElementById('modal-' + type);
                    if (modal.style.display === 'block') {
                        closeModal(type);
                    }
                });
            }
        });

        // Fermer menu mobile en cliquant ailleurs
        document.addEventListener('click', function(event) {
            const mobileNav = document.getElementById('mobileNav');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (!toggle.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.style.display = 'none';
            }
        });