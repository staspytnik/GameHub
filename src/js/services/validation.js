import {formatData} from "./formatData.js";
import {postGameData} from "./firebase-db.js";
import {addCard} from "../library.js";

export class FormValidator {
    static FIRST_GAME_YEAR = 1972;
    static CURRENT_YEAR = new Date().getFullYear();

    constructor(form) {
        this.form = form;
        this.fields = [
            ...form.querySelectorAll('input, textarea, select')
        ];

        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit);

        this.fields.forEach(field => {
            field.addEventListener('input', () => {
                this.validateField(field);
            });

            field.addEventListener('change', () => {
                this.validateField(field);
            });
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (!this.validate()) {
            return;
        }

        console.log('Form is valid');

        const cardData = formatData(this.form)
        postGameData(cardData).then(data => {
            addCard(cardData)
        })
    };

    validate() {
        let isValid = true;

        this.fields.forEach(field => {
            if (!field.required) {
                return;
            }

            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        if (!field.required) {
            return true;
        }

        const error = this.getError(field);

        if (error) {
            this.showError(field, error);
            return false;
        }

        this.removeError(field);

        return true;
    }

    getError(field) {
        const value = field.value.trim();

        if (field.type === 'radio') {
            const group = this.form.querySelectorAll(
                `input[name="${CSS.escape(field.name)}"]`
            );

            const isChecked = [...group].some(
                radio => radio.checked
            );

            if (!isChecked) {
                return 'Оберіть один із варіантів';
            }

            return null;
        }

        if (field.type === 'checkbox') {
            if (!field.checked) {
                return 'Це поле обовʼязкове';
            }

            return null;
        }

        if (field.tagName === 'SELECT') {
            if (!field.value) {
                return 'Оберіть значення';
            }

            return null;
        }

        if (!value) {
            return 'Це поле обовʼязкове';
        }

        const minLength = field.getAttribute('minlength');

        if (
            minLength &&
            value.length < Number(minLength)
        ) {
            return `Мінімальна довжина — ${minLength} символи`;
        }

        const validation = field.dataset.validation;

        if (validation === 'game-year') {
            const year = Number(value);

            if (
                !Number.isInteger(year) ||
                year < FormValidator.FIRST_GAME_YEAR
            ) {
                return `Рік повинен бути більшим за ${FormValidator.FIRST_GAME_YEAR}`;
            }

            if (
                !Number.isInteger(year) ||
                year > FormValidator.CURRENT_YEAR
            ) {
                return `Рік повинен бути меншим за ${FormValidator.CURRENT_YEAR}`;
            }
        }

        return null;
    }

    showError(field, message) {
        const container = field.closest('.modal-window__field');

        if (!container) return

        let errorElement = container.querySelector('.form-error');

        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'form-error';
            container.append(errorElement);
        }

        errorElement.textContent = message;
        field.classList.add('invalid');
    }

    removeError(field) {
        const container = field.closest('.modal-window__field');
        if (!container) return

        const errorElement = container.querySelector('.form-error');

        errorElement?.remove();
        field.classList.remove('invalid');
    }
}