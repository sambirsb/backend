export const personalizedReplacement = (user: any, message: any) => {
    const replacements = {
        '%firstfanname%': user.name.split(' ')[0] || message.fallbackName,
        '%ufirstfanname%':
            user.name.split(' ')[0].toUpperCase() ||
            message.fallbackName.toUpperCase(),
        '%lfirstfanname%':
            user.name.split(' ')[0].toLowerCase() ||
            message.fallbackName.toLowerCase(),
        '%fanname%': user.name || message.fallbackName,
        '%ufanname%':
            user.name.toUpperCase() || message.fallbackName.toUpperCase(),
        '%lfanname%':
            user.name.toLowerCase() || message.fallbackName.toLowerCase(),
        '%customname%': user.displayName
            ? user.displayName
            : message.fallbackName,
        '%ucustomname%': user.displayName
            ? user.displayName.toUpperCase()
            : message.fallbackName.toUpperCase(),
        '%lcustomname%': user.displayName
            ? user.displayName.toLowerCase()
            : message.fallbackName.toLowerCase(),
    };

    return message.text.replace(
        /%firstfanname%|%ufirstfanname%|%lfirstfanname%|%fanname%|%ufanname%|%lfanname%|%customname%|%ucustomname%|%lcustomname%/g,
        (match: any) => replacements[match as keyof typeof replacements]
    );
};
