export const formatData = (form) => {
    const formData = new FormData(form);

    return Object.fromEntries(formData);
}