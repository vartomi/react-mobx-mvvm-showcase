export const getValidationErrorMessage = (value: string, max: number, min: number = 0) => {
    if (isNaN(parseInt(value))) {
        return 'Please enter a valid integer';
    }

    if (parseInt(value) < min) {
        return 'Value must be 0 or positive';
    }

    if (max && parseInt(value) > max) {
        return 'Downpayment exceeds final price';
    }
}