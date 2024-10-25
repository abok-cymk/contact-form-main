document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const inputs = {
        firstname: document.getElementById('firstname'),
        lastname: document.getElementById('lastname'),
        email: document.getElementById('email'),
        message: document.getElementById('message'),
        consent: document.getElementById('consent'),
        queryTypes: document.querySelectorAll('input[name="query"]')
    };

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to show error message and style
    const showError = (element, message) => {
        const errorMessage = element.parentElement.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'block';
            element.style.borderColor = 'hsl(0, 66%, 54%)';
        }
    };

    // Function to hide error message and style
    const hideError = (element) => {
        const errorMessages = element.parentElement.parentElement.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.style.display = 'none');
        element.style.borderColor = 'hsl(169, 88%, 22%)';
    };

    // Function to validate email
    const validateEmail = (email) => {
        if (!email.value) {
            email.parentElement.querySelector('#valid-email').style.display = 'none';
            showError(email);
            return false;
        } else if (!emailRegex.test(email.value)) {
            hideError(email);
            email.parentElement.querySelector('#valid-email').style.display = 'block';
            email.style.borderColor = 'hsl(0, 66%, 54%)';
            return false;
        } else {
            email.parentElement.querySelector('#valid-email').style.display = 'none';
            hideError(email);
            return true;
        }
    };

    // Function to validate query type selection
    const validateQueryType = () => {
        let selected = false;
        inputs.queryTypes.forEach(radio => {
            if (radio.checked) selected = true;
        });
        
        const queryContainer = document.querySelector('.query-container');
        const errorMessage = queryContainer.parentElement.querySelector('.error-message');
        
        if (!selected) {
            errorMessage.style.display = 'block';
            queryContainer.querySelectorAll('.query-type').forEach(qt => {
                qt.style.borderColor = 'hsl(0, 66%, 54%)';
            });
        } else {
            errorMessage.style.display = 'none';
            queryContainer.querySelectorAll('.query-type').forEach(qt => {
                qt.style.borderColor = 'hsl(169, 88%, 22%)';
            });
        }
        return selected;
    };

    // Function to validate consent
    const validateConsent = () => {
        const errorMessage = inputs.consent.parentElement.parentElement.parentElement.querySelector('.error-message');
        const checkboxBorder = inputs.consent.parentElement;
        
        if (!inputs.consent.checked) {
            errorMessage.style.display = 'block';
            checkboxBorder.style.borderColor = 'hsl(0, 66%, 54%)';
            return false;
        } else {
            errorMessage.style.display = 'none';
            checkboxBorder.style.borderColor = 'hsl(169, 88%, 22%)';
            return true;
        }
    };

    // Add input event listeners for real-time validation
    inputs.firstname.addEventListener('input', () => {
        if (inputs.firstname.value) hideError(inputs.firstname);
        else showError(inputs.firstname);
    });

    inputs.lastname.addEventListener('input', () => {
        if (inputs.lastname.value) hideError(inputs.lastname);
        else showError(inputs.lastname);
    });

    inputs.email.addEventListener('input', () => {
        validateEmail(inputs.email);
    });

    inputs.message.addEventListener('input', () => {
        if (inputs.message.value) hideError(inputs.message);
        else showError(inputs.message);
    });

    inputs.queryTypes.forEach(radio => {
        radio.addEventListener('change', validateQueryType);
    });

    inputs.consent.addEventListener('change', validateConsent);

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;

        if (!inputs.firstname.value) {
            showError(inputs.firstname);
            isValid = false;
        }

        if (!inputs.lastname.value) {
            showError(inputs.lastname);
            isValid = false;
        }

        if (!validateEmail(inputs.email)) {
            isValid = false;
        }

        if (!validateQueryType()) {
            isValid = false;
        }

        if (!inputs.message.value) {
            showError(inputs.message);
            isValid = false;
        }

        if (!validateConsent()) {
            isValid = false;
        }

        // If all validations pass, show success message
        if (isValid) {
            const successMessage = document.getElementById('success');
            successMessage.style.display = 'block';
            form.reset();

            // Reset all border colors
            Object.values(inputs).forEach(input => {
                if (input.length === undefined) {  // Single element
                    input.style.borderColor = '';
                }
            });
            document.querySelectorAll('.query-type').forEach(qt => {
                qt.style.borderColor = '';
            });
            inputs.consent.parentElement.style.borderColor = '';

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
});