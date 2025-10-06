<?php

namespace App\Helpers;

use Config\Email as EmailConfig;

class EmailService
{
    protected $email;
    protected $emailConfig;

    public function __construct()
    {
        $this->emailConfig = new EmailConfig();
        $this->email = \Config\Services::email();
    }

    /**
     * Send booking notification to booking email
     */
    public function sendBookingNotification($bookingData)
    {
        try {
            $this->email->setFrom($this->emailConfig->fromEmail, $this->emailConfig->fromName);
            $this->email->setTo($this->emailConfig->bookingEmail);
            $this->email->setSubject('New Booking Received - TravelTrust');

            $message = $this->getBookingEmailTemplate($bookingData);
            $this->email->setMessage($message);

            if ($this->email->send()) {
                log_message('info', 'Booking notification email sent successfully to ' . $this->emailConfig->bookingEmail);
                return true;
            } else {
                log_message('error', 'Failed to send booking notification: ' . $this->email->printDebugger());
                return false;
            }
        } catch (\Exception $e) {
            log_message('error', 'Email service error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Send inquiry notification to inquiry email
     */
    public function sendInquiryNotification($inquiryData)
    {
        try {
            $this->email->setFrom($this->emailConfig->fromEmail, $this->emailConfig->fromName);
            $this->email->setTo($this->emailConfig->inquiryEmail);
            $this->email->setSubject('New Contact Inquiry - TravelTrust');

            $message = $this->getInquiryEmailTemplate($inquiryData);
            $this->email->setMessage($message);

            if ($this->email->send()) {
                log_message('info', 'Inquiry notification email sent successfully to ' . $this->emailConfig->inquiryEmail);
                return true;
            } else {
                log_message('error', 'Failed to send inquiry notification: ' . $this->email->printDebugger());
                return false;
            }
        } catch (\Exception $e) {
            log_message('error', 'Email service error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get HTML template for booking notification
     */
    private function getBookingEmailTemplate($data)
    {
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
                .label { font-weight: bold; color: #667eea; display: inline-block; width: 150px; }
                .value { color: #333; }
                .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 New Booking Received!</h1>
                </div>
                <div class="content">
                    <p>You have received a new booking request:</p>

                    <div class="info-row">
                        <span class="label">Name:</span>
                        <span class="value">' . htmlspecialchars($data['customer_name'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Email:</span>
                        <span class="value">' . htmlspecialchars($data['customer_email'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Phone:</span>
                        <span class="value">' . htmlspecialchars($data['customer_phone'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Destination:</span>
                        <span class="value">' . htmlspecialchars($data['destination'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Travel Date:</span>
                        <span class="value">' . htmlspecialchars($data['travel_date'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Number of Travelers:</span>
                        <span class="value">' . htmlspecialchars($data['number_of_travelers'] ?? 'N/A') . '</span>
                    </div>

                    ' . (isset($data['special_requests']) && $data['special_requests'] ? '
                    <div class="info-row">
                        <span class="label">Special Requests:</span>
                        <span class="value">' . nl2br(htmlspecialchars($data['special_requests'])) . '</span>
                    </div>
                    ' : '') . '

                    <p style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; color: #856404;">
                        <strong>⚠️ Action Required:</strong> Please review and respond to this booking request as soon as possible.
                    </p>
                </div>
                <div class="footer">
                    <p>This is an automated notification from TravelTrust Admin System.</p>
                </div>
            </div>
        </body>
        </html>
        ';

        return $html;
    }

    /**
     * Get HTML template for inquiry notification
     */
    private function getInquiryEmailTemplate($data)
    {
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
                .label { font-weight: bold; color: #667eea; display: inline-block; width: 180px; }
                .value { color: #333; }
                .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📧 New Contact Inquiry!</h1>
                </div>
                <div class="content">
                    <p>You have received a new contact inquiry:</p>

                    <div class="info-row">
                        <span class="label">Name:</span>
                        <span class="value">' . htmlspecialchars($data['full_name'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Email:</span>
                        <span class="value">' . htmlspecialchars($data['email'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Phone:</span>
                        <span class="value">' . htmlspecialchars($data['phone'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Travelers:</span>
                        <span class="value">' . htmlspecialchars($data['travelers'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Departure Airport:</span>
                        <span class="value">' . htmlspecialchars($data['departure_airport'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Arrival Airport:</span>
                        <span class="value">' . htmlspecialchars($data['arrival_airport'] ?? 'N/A') . '</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Departure Date:</span>
                        <span class="value">' . htmlspecialchars($data['departure_date'] ?? 'N/A') . '</span>
                    </div>

                    ' . (isset($data['return_date']) && $data['return_date'] ? '
                    <div class="info-row">
                        <span class="label">Return Date:</span>
                        <span class="value">' . htmlspecialchars($data['return_date']) . '</span>
                    </div>
                    ' : '') . '

                    <div class="info-row">
                        <span class="label">Trip Type:</span>
                        <span class="value">' . htmlspecialchars($data['trip_type'] ?? 'N/A') . '</span>
                    </div>

                    ' . (isset($data['message']) && $data['message'] ? '
                    <div class="info-row">
                        <span class="label">Message:</span>
                        <span class="value">' . nl2br(htmlspecialchars($data['message'])) . '</span>
                    </div>
                    ' : '') . '

                    <p style="margin-top: 30px; padding: 15px; background: #d1ecf1; border-left: 4px solid #17a2b8; color: #0c5460;">
                        <strong>📌 Note:</strong> Please respond to this inquiry within 24 hours for best customer service.
                    </p>
                </div>
                <div class="footer">
                    <p>This is an automated notification from TravelTrust Admin System.</p>
                </div>
            </div>
        </body>
        </html>
        ';

        return $html;
    }
}
