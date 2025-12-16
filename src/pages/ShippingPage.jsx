import React from 'react';

const ShippingPage = () => {
    return (
        <div className="min-h-screen bg-cream pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="text-4xl font-display text-charcoal mb-8">Shipping Policy</h1>

                <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm space-y-8 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-charcoal mb-4">Processing Time</h2>
                        <p>
                            All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
                            If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-charcoal mb-4">Shipping Rates & Delivery Estimates</h2>
                        <p className="mb-4">
                            Shipping charges for your order will be calculated and displayed at checkout.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Standard Shipping (India):</strong> 5-7 business days - Free</li>
                            <li><strong>Express Shipping (India):</strong> 2-3 business days - ₹500</li>
                            <li><strong>International Shipping:</strong> 10-15 business days - Calculated at checkout</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-charcoal mb-4">Shipment Confirmation & Order Tracking</h2>
                        <p>
                            You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).
                            The tracking number will be active within 24 hours. You can also track your order directly from your account dashboard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-charcoal mb-4">Damages</h2>
                        <p>
                            Atrangi is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.
                            Please save all packaging materials and damaged goods before filing a claim.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
