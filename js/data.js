// data.js

const DROPDOWN_DATA = {
    // 1. Type
    'Plastic': {
        // 2. Design based on Plastic Type
        'Plastic Design-1': ['1ltr', '5ltr', '500ml', '250ml', '100ml'], // 3. Volume
        'Plastic Design-2': ['1ltr', '5ltr', '500ml', '250ml', '100ml'],
        'Plastic Design-3': ['1ltr', '5ltr', '500ml', '250ml', '100ml']
    },
    'Metal': {
        // 2. Design based on Metal Type
        'Metal Design-1': ['1ltr', '5ltr', '500ml', '250ml', '100ml'], // 3. Volume
        'Metal Design-2': ['1ltr', '5ltr', '500ml', '250ml', '100ml']
    },
    'Box': {
        // 2. Design based on Box Type
        'Box Design-1': ['1kg', '500g', '250g'], // 3. Volume
        'Box Design-2': ['1kg', '500g', '250g'],
        'Box Design-3': ['1kg', '500g', '250g']
    },
    'Labels': {
        // 2. Design based on Label Type
        'Label Design-1': ['1kg', '500g', '250g'], // 3. Volume
        'Label Design-2': ['1kg', '500g', '250g']
    }
};

const CONSUMPTION_DATA = [];
// Generate 20 Consumption options
for (let i = 1; i <= 20; i++) {
    CONSUMPTION_DATA.push(`Consumption-${i}`);
}