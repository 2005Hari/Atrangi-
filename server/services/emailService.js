const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
        user: process.env.SMTP_USER || 'ethereal_user',
        pass: process.env.SMTP_PASS || 'ethereal_pass'
    }
});

const sendOrderConfirmation = async (order, userEmail) => {
    try {
        const mailOptions = {
            from: '"Atrangi Gallery" <no-reply@atrangi.com>',
            to: userEmail,
            subject: `Order Confirmation - #${order.id || order._id}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h1>Thank you for your order!</h1>
                    <p>Hi ${order.shippingDetails?.firstName || 'Art Lover'},</p>
                    <p>We have received your order and are getting it ready.</p>
                    <p><strong>Order ID:</strong> ${order.id || order._id}</p>
                    <p><strong>Total:</strong> ₹${order.total}</p>
                    <br>
                    <p>We will notify you once your art is on its way.</p>
                    <p>Warm regards,<br>The Atrangi Team</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending confirmation email:", error);
    }
};

const sendAdminAlert = async (order) => {
    try {
        const mailOptions = {
            from: '"Atrangi System" <system@atrangi.com>',
            to: process.env.ADMIN_EMAIL || 'admin@atrangi.com',
            subject: `New Order Received - #${order.id || order._id}`,
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>New Order Alert</h2>
                    <p>You have received a new order for <strong>₹${order.total}</strong>.</p>
                    <p><strong>Customer:</strong> ${order.shippingDetails?.firstName} ${order.shippingDetails?.lastName}</p>
                    <a href="http://localhost:5173/admin/orders">View Order</a>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Admin alert email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending admin alert:", error);
    }
};

module.exports = {
    sendOrderConfirmation,
    sendAdminAlert
};
