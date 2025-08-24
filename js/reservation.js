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
		
		// Update month display
		document.getElementById('currentMonth').textContent = 
			`${this.monthNames[month]} ${year}`;

		// Clear calendar grid
		const grid = document.getElementById('calendarGrid');
		grid.innerHTML = '';

		// Add day headers
		this.dayNames.forEach(day => {
			const dayHeader = document.createElement('div');
			dayHeader.classList.add('calendar-day-header');
			dayHeader.textContent = day;
			grid.appendChild(dayHeader);
		});

		// Get first day of month and number of days
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const today = new Date();

		// Add empty cells for days before month starts
		for (let i = 0; i < firstDay; i++) {
			const emptyDay = document.createElement('div');
			emptyDay.classList.add('calendar-day');
			grid.appendChild(emptyDay);
		}

		// Add days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const dayButton = document.createElement('button');
			dayButton.classList.add('calendar-day');
			dayButton.textContent = day;
			
			const dayDate = new Date(year, month, day);
			
			// Disable past dates
			if (dayDate < today.setHours(0, 0, 0, 0)) {
				dayButton.classList.add('disabled');
				dayButton.disabled = true;
			} else {
				dayButton.addEventListener('click', () => {
					document.querySelectorAll('.calendar-day.selected').forEach(d => 
						d.classList.remove('selected'));
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
			const options = { 
				weekday: 'long', 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			};
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

		const formData = new FormData(document.getElementById('bookingForm'));
		const data = Object.fromEntries(formData);
		
		// Add selected date and time
		data.date = this.selectedDate.toLocaleDateString('fr-FR');
		data.time = this.selectedTime;

		// Here you would typically send the data to your server
		console.log('Booking data:', data);
		
		alert(`Merci ${data.firstName} ! Votre rendez-vous pour le ${data.date} à ${data.time} a été enregistré. Nous vous contacterons rapidement pour confirmer.`);
		
		// Reset form
		document.getElementById('bookingForm').reset();
		document.querySelectorAll('.calendar-day.selected').forEach(d => 
			d.classList.remove('selected'));
		document.querySelectorAll('.time-slot.selected').forEach(s => 
			s.classList.remove('selected'));
		document.getElementById('selectedDateDisplay').style.display = 'none';
		this.selectedDate = null;
		this.selectedTime = null;
	}
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
	new BookingCalendar();
});