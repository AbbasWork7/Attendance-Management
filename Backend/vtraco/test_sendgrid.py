import sendgrid
from sendgrid.helpers.mail import Mail

sg = sendgrid.SendGridAPIClient(api_key='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')
message = Mail(
    from_email='admin@vtraco.com',  # Must be verified in SendGrid
    to_emails='rushmistemiyla2003@gmail.com',               # The email you want to send to
    subject='Test Email from SendGrid',
    html_content='<strong>This is a test email from SendGrid!</strong>'
)

try:
    response = sg.send(message)
    print("Status Code:", response.status_code)
    print("Response Body:", response.body)
except Exception as e:
    print("Error sending email:", e)