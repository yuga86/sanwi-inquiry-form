// script.js

// Accesses the DROPDOWN_DATA and CONSUMPTION_DATA constants loaded from data.js

// --- 1. DOM ELEMENTS & DROPDOWN ORDER ---
// Note: We only include the dependent dropdowns here
const dependentDropdowns = ['type', 'design', 'volume']; 
const selects = dependentDropdowns.map(id => document.getElementById(id));
const submitBtn = document.querySelector('.submit-button');
const consumptionSelect = document.getElementById('consumption');
const quantityInput = document.getElementById('quantity');
const locationInput = document.getElementById('location');

// --- 2. UTILITY FUNCTIONS ---

/**
 * Clears existing options and adds a default "Select..." option.
 */
function resetDropdown(selectElement) {
    selectElement.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.textContent = `Select ${selectElement.id}...`;
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);
}

/**
 * Populates a dropdown with keys from the given data.
 */
function populateDropdown(selectElement, items) {
    resetDropdown(selectElement);
    
    const keys = Array.isArray(items) ? items : Object.keys(items);

    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        selectElement.appendChild(option);
    });
    
    selectElement.disabled = false;
}

/**
 * Checks if the minimum required fields are selected/filled to enable the submit button.
 */
function checkSubmissionReadiness() {
    // 1. Dependent Check: Last dependent dropdown (Volume) must be selected
    const isVolumeSelected = selects[2].value && selects[2].value !== `Select ${selects[2].id}...`;
    
    // 2. Independent Check: Quantity and Location must have values
    const isQuantityFilled = quantityInput.value.trim() !== '' && parseInt(quantityInput.value) > 0;
    const isLocationFilled = locationInput.value.trim() !== '';

    // 3. Contact Info Check (Optional but good practice)
    const isContactFilled = document.getElementById('inquirer-name').value.trim() !== '' &&
                            document.getElementById('inquirer-email').value.trim() !== '' &&
                            document.getElementById('inquirer-phone').value.trim() !== ''; 


    if (isVolumeSelected && isQuantityFilled && isLocationFilled ) {
        alert("submitBtn.disabled = false");
        submitBtn.disabled = false;        
    } else {
        alert("submitBtn.disabled = true");
        submitBtn.disabled = true;
    }
}


// --- 3. MAIN LOGIC FUNCTION (Dependent Dropdowns) ---

/**
 * Handles the change event for Type and Design dropdowns.
 */
function handleDependentDropdownChange(event) {
    const changedSelect = event.target;
    const currentIndex = dependentDropdowns.indexOf(changedSelect.id);
    const nextIndex = currentIndex + 1;
    
    // 1. Reset all subsequent dropdowns
    for (let i = nextIndex; i < dependentDropdowns.length; i++) {
        resetDropdown(selects[i]);
        selects[i].disabled = true;
    }
    
    // 2. Traverse the Data Structure to find the next level's data
    let currentContext = DROPDOWN_DATA; 
    let isValidPath = true;

    for (let i = 0; i <= currentIndex; i++) {
        const selectedValue = selects[i].value;
        if (currentContext && currentContext[selectedValue]) {
            currentContext = currentContext[selectedValue];
        } else {
            isValidPath = false;
            break;
        }
    }

    // 3. Populate the next dropdown
    const nextSelect = selects[nextIndex];
    if (isValidPath && nextSelect && currentContext) {
        const hasData = Array.isArray(currentContext) ? currentContext.length > 0 : Object.keys(currentContext).length > 0;
        
        if (hasData) {
            populateDropdown(nextSelect, currentContext);
        }
    } 
    
    // Check readiness after any change
    checkSubmissionReadiness();
}


// --- 4. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // A. Initialize Dependent Dropdowns (Type, Design, Volume)
    selects.forEach(resetDropdown);
    
    // Populate the first dropdown ('type') using the global data
    populateDropdown(selects[0], DROPDOWN_DATA);
    selects[0].disabled = false;
    
    // Attach event listeners to all dependent dropdowns
    selects.forEach(select => {
        select.addEventListener('change', handleDependentDropdownChange);
    });
    
    // B. Initialize Independent Consumption Dropdown
    resetDropdown(consumptionSelect);
    consumptionSelect.id = 'consumption'; // Reset ID if necessary (for display)
    
    const defaultConsOption = consumptionSelect.querySelector('option');
    defaultConsOption.textContent = '4. Select Consumption...';
    
    populateDropdown(consumptionSelect, CONSUMPTION_DATA);
    consumptionSelect.disabled = false;


    // C. Attach listeners to check submission readiness on input change
    quantityInput.addEventListener('input', checkSubmissionReadiness);
    locationInput.addEventListener('input', checkSubmissionReadiness);
    
    document.getElementById('inquirer-name').addEventListener('input', checkSubmissionReadiness);
    document.getElementById('inquirer-email').addEventListener('input', checkSubmissionReadiness);
    document.getElementById('inquirer-phone').addEventListener('input', checkSubmissionReadiness);


    // D. Handle final form submission 
    document.getElementById('dynamicForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const finalSelections = 
            `1. Type: ${document.getElementById('type').value}\n` +
            `2. Design: ${document.getElementById('design').value}\n` +
            `3. Volume: ${document.getElementById('volume').value}\n` +
            `4. Consumption: ${document.getElementById('consumption').value}\n` +
            `5. Quantity: ${document.getElementById('quantity').value}\n` +
            `6. Location: ${document.getElementById('location').value}`;
        
        const inquirerInfo = `Name: ${document.getElementById('inquirer-name').value}\nEmail: ${document.getElementById('inquirer-email').value}\nPhone: ${document.getElementById('inquirer-phone').value}`;

        alert('Form submitted successfully!\n\n-- Product Request --\n' + finalSelections + '\n\n-- Contact Info --\n' + inquirerInfo);
    });
});