import * as emailjs from 'emailjs-com';

export const sendWelcomeEmail = (username: string, email_user: string) => {
    // Configura los parámetros del correo electrónico
    const params = {
        username: username,
        email_user: email_user,
        // Otros parámetros que necesites para tu plantilla de correo electrónico
    };

    // Envía el correo electrónico utilizando EmailJS
    return emailjs.send('service_9tx5ljj', 'template_2jr8kup', params, 'R0Ce-MCDIlSP5Vi_e');
};