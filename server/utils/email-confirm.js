import { Resend } from 'resend'
import SubsModel from '../models/subscription.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailConfirmation = async (id) => {
  try {
    const userEmail = await SubsModel.findById(id)
    if (!userEmail) {
      console.log('Error in resend function')
      return
    }

    const { data, error } = await resend.emails.send({
      from: 'Chrono <onboarding@resend.dev>',
      to: userEmail.email ?? 'abhimanyug987@gmail.com',
      subject: "You're on the waitlist",
      html: `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>You’re on the waitlist</title>
      </head>
      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f6f7f9;
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica,
            Arial, sans-serif;
          color: #111827;
        ">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 40px 16px">
              <!-- Card -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 560px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  padding: 32px;
                ">
                <!-- Logo -->
                <tr>
                  <td align="center" style="padding-bottom: 24px">
                    <div
                      style="
                        font-size: 20px;
                        font-weight: 700;
                        color: black;
                        text-transform: uppercase;
                        letter-spacing: 0px;
                      ">
                      Chrono
                    </div>
                  </td>
                </tr>
    
                <!-- Heading -->
                <tr>
                  <td style="padding-bottom: 20px">
                    <h1
                      style="
                        font-size: 24px;
                        line-height: 1.3;
                        margin: 0;
                        font-weight: 600;
                      ">
                      You’re on the waitlist.
                    </h1>
                  </td>
                </tr>
    
                <!-- Body -->
                <tr>
                  <td style="font-size: 16px; line-height: 1.6">
                    <p style="margin: 0 0 16px">Hi,</p>
    
                    <p style="margin: 0 0 16px">Thanks for joining the waitlist.</p>
    
                    <p style="margin: 0 0 16px">
                      This project is currently in
                      <strong>Preview</strong>, and you’ll get an email as soon as
                      early access opens.
                    </p>
    
                    <p style="margin: 0 0 16px">
                      No spam, no noise — just a heads-up when it’s ready.
                    </p>
    
                    <p style="margin: 0 0 24px">
                      If you’re curious or have feedback, you can reply directly to
                      this email. I read everything.
                    </p>
    
                    <p style="margin: 0">— Vishal</p>
                  </td>
                </tr>
    
                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding-top: 32px;
                      font-size: 13px;
                      color: #111827;
                      text-align: center;
                    ">
                    Built as a learning-first product.
                  </td>
                </tr>
              </table>
              <!-- End Card -->
            </td>
          </tr>
        </table>
      </body>
    </html>    
      `,
    })

    if (error) {
      console.log('Resend API Error:', error)
      return false
    }

    const emailConfirmed = await SubsModel.findByIdAndUpdate(id, {
      confirmationSent: true,
    })
    console.log('Email confirmed', emailConfirmed)
    if (!emailConfirmed) {
      console.log('Database update failed')
      return false
    }

    console.log({ data })
    return true
  } catch (error) {
    console.log('Error in resend function', error)
    return false
  }
}

export default emailConfirmation
