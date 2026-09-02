export const formatData = (form) => {
    const formData = new FormData(form);

    return Object.fromEntries(
        [...formData.entries()].map(([key, value]) => {
            if (value instanceof File) {
                return [key, value];
            }

            if (value === 'true') return [key, true];
            if (value === 'false') return [key, false];
            if (value !== '' && !Number.isNaN(Number(value))) {
                return [key, Number(value)];
            }

            return [key, value];
        })
    );
};