document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();
        if (!validateForm()) {
            return;
        }
        const agreementCheckbox = document.getElementById('agreement');
        if (!agreementCheckbox.checked) {
            window.alert('กรุณายอมรับเงื่อนไข');
            return;
        }
        form.submit();
    });
});

function validateForm() {
    let isValid = true;
    const form = document.querySelector('form');

    if (!validateFullname()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validateAddress()) isValid = false;
    if (!validateHousing()) isValid = false;
    if (!validateDogPlace(form)) isValid = false;
    if (!validatePetCount()) isValid = false;

    return isValid;
}

function validateFullname() {
    const fullname = document.getElementById('fullname');
    if (fullname.value.trim() === '') {
        showError(fullname, 'กรุณากรอกชื่อ-นามสกุล');
        return false;
    }
    clearError(fullname);
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone');
    if (phone.value.trim() === '') {
        showError(phone, 'กรุณากรอกเบอร์ติดต่อ');
        return false;
    }
    clearError(phone);
    return true;
}

function validateEmail() {
    const email = document.getElementById('email');
    if (email.value.trim() === '') {
        showError(email, 'กรุณากรอก Email');
        return false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'กรุณากรอกรูปแบบ Email ให้ถูกต้อง');
        return false;
    }
    clearError(email);
    return true;
}

function validateAddress() {
    const address = document.getElementById('address');
    if (address.value.trim() === '') {
        showError(address, 'กรุณากรอกที่อยู่');
        return false;
    }
    clearError(address);
    return true;
}

function validateHousing() {
    const housing = document.getElementById('housing');
    if (housing.value === '') {
        showError(housing, 'กรุณาเลือกลักษณะที่พักอาศัย');
        return false;
    }
    clearError(housing);
    return true;
}

function validateDogPlace(form) {
    const dogPlaceRadios = form.querySelectorAll('input[name="dog_place"]');
    const isDogPlaceSelected = Array.from(dogPlaceRadios).some(radio => radio.checked);
    if (!isDogPlaceSelected) {
        const dogPlaceGroup = form.querySelector('.form-group');
        showError(dogPlaceGroup, 'กรุณาเลือกวิธีการเลี้ยงสุนัข');
        return false;
    }
    const dogPlaceGroup = form.querySelector('.form-group');
    clearError(dogPlaceGroup);
    return true;
}

function validatePetCount() {
    const petCount = document.getElementById('pet_count');
    const petCountValue = petCount.value.trim();
    if (petCountValue === '') {
        showError(petCount, 'กรุณากรอกจำนวนสัตว์เลี้ยงที่มีอยู่ปัจจุบัน');
        return false;
    } else {
        const petCountNumber = parseInt(petCountValue, 10);
        if (isNaN(petCountNumber) || petCountNumber < 0 || petCountNumber > 100) {
            showError(petCount, 'จำนวนสัตว์เลี้ยงต้องเป็นตัวเลขระหว่าง 0 ถึง 100');
            return false;
        }
    }
    clearError(petCount);
    return true;
}

function clearError(element) {
    element.classList.remove('invalid');
    const next = element.nextSibling;
    if (next && next.classList && next.classList.contains('error-message')) {
        next.remove();
    }
}

function showError(element, message) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
        element.classList.add('invalid');
    }
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    element.parentNode.insertBefore(errorMessage, element.nextSibling);
}

function clearErrors() {
    const invalidElements = document.querySelectorAll('.invalid');
    invalidElements.forEach(el => el.classList.remove('invalid'));

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
