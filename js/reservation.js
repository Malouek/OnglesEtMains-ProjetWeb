class BookingCalendar {
	constructor() {
		this.currentDate = new Date();
		this.selectedDate = null;
		this.selectedTime = null;
		this.monthNames = [
			'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
			'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
		];
		this.dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
		
		this.init();
	}

	init() {
		this.renderCalendar();
		this.bindEvents();
		this.initCategorySelect();
	}

	bindEvents() {
		document.getElementById('prevMonth').addEventListener('click', () => {
			this.currentDate.setMonth(this.currentDate.getMonth() - 1);
			this.renderCalendar();
		});

		document.getElementById('nextMonth').addEventListener('click', () => {
			this.currentDate.setMonth(this.currentDate.getMonth() + 1);
			this.renderCalendar();
		});

		// Time slot selection
		document.querySelectorAll('.time-slot').forEach(slot => {
			slot.addEventListener('click', () => {
				document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
				slot.classList.add('selected');
				this.selectedTime = slot.dataset.time;
			});
		});

		// Form submission
		document.getElementById('bookingForm').addEventListener('submit', (e) => {
			e.preventDefault();
			this.handleFormSubmit();
		});
	}

	renderCalendar() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth();
		
		document.getElementById('currentMonth').textContent = `${this.monthNames[month]} ${year}`;
		const grid = document.getElementById('calendarGrid');
		grid.innerHTML = '';

		this.dayNames.forEach(day => {
			const dayHeader = document.createElement('div');
			dayHeader.classList.add('calendar-day-header');
			dayHeader.textContent = day;
			grid.appendChild(dayHeader);
		});

		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const today = new Date();

		for (let i = 0; i < firstDay; i++) {
			const emptyDay = document.createElement('div');
			emptyDay.classList.add('calendar-day');
			grid.appendChild(emptyDay);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const dayButton = document.createElement('button');
			dayButton.classList.add('calendar-day');
			dayButton.textContent = day;
			
			const dayDate = new Date(year, month, day);
			
			if (dayDate < today.setHours(0, 0, 0, 0)) {
				dayButton.classList.add('disabled');
				dayButton.disabled = true;
			} else {
				dayButton.addEventListener('click', () => {
					document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
					dayButton.classList.add('selected');
					this.selectedDate = new Date(year, month, day);
					this.updateSelectedDateDisplay();
				});
			}

			grid.appendChild(dayButton);
		}
	}

	updateSelectedDateDisplay() {
		if (this.selectedDate) {
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			const dateString = this.selectedDate.toLocaleDateString('fr-FR', options);
			document.getElementById('selectedDateText').textContent = dateString;
			document.getElementById('selectedDateDisplay').style.display = 'block';
		}
	}

	handleFormSubmit() {
		if (!this.selectedDate) {
			alert('Veuillez sélectionner une date.');
			return;
		}

		if (!this.selectedTime) {
			alert('Veuillez sélectionner une heure.');
			return;
		}

		const form = document.getElementById('bookingForm');
		const formData = new FormData(form);

		formData.set('selectedDate', this.selectedDate.toISOString().split('T')[0]);
		formData.set('selectedTime', this.selectedTime);

		fetch('backend/php/booking.php', {
			method: 'POST',
			body: formData
		})
		.then(response => response.text())
		.then(message => {
			alert(message);
			form.reset();
			document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
			document.querySelectorAll('.time-slot.selected').forEach(s => s.classList.remove('selected'));
			document.getElementById('selectedDateDisplay').style.display = 'none';
			this.selectedDate = null;
			this.selectedTime = null;
		})
		.catch(error => {
			console.error('Erreur:', error);
			alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
		});
	}

	initCategorySelect() {
		const categorySelect = document.getElementById('categorie');
		const prestationSelect = document.getElementById('service');

		if (!categorySelect || !prestationSelect) return;

		categorySelect.addEventListener('change', () => {
			const catId = categorySelect.value;
			if (!catId) {
				prestationSelect.innerHTML = '<option value="">Choisir une prestation</option>';
				return;
			}

			// === Correction ici : paramètre GET doit être categorie_id ===
			fetch(`backend/php/getPrestations.php?categorie_id=${catId}`)
				.then(response => response.json())
				.then(data => {
					prestationSelect.innerHTML = '<option value="">Choisir une prestation</option>';
					data.forEach(prestation => {
						const option = document.createElement('option');
						option.value = prestation.id_prestation;
						option.textContent = prestation.nom_prestation;
						prestationSelect.appendChild(option);
					});
				})
				.catch(error => console.error('Erreur récupération prestations :', error));
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new BookingCalendar();
});

