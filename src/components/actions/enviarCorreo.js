import { Resend } from 'resend';
const resend = new Resend('re_QGmifLBK_8oCsGU9oVPSJXE4o8Ar86ZVU');

export function enviarCorreo(){
    (async function () {
        const { data, error } = await resend.emails.send({
        from: 'Acme <auroramail@aurora.com>',
        to: ['hayland.montalvo@udla.edu.ec'],
        subject: 'VOUCHER DISCOTECA',
        html: '<strong> CHjs</strong>',
        });
    
        if (error) {
        return console.error({ error });
        }
    
        console.log({ data });
    })();
}


