const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendEmailReport = (loginEmail, fromName, toName, amount, description, action) => {
    
    try {
        sgMail.send({
            to: loginEmail,
            from: 'bobachandra@gmail.com',
            subject: `Expense ${action}`,
            html: ` <h4>Hi, </h4>
                    <h4>User ${loginEmail} ${action} expense. Find below for more details</h4>
                    <h4>Description about the ${action} expense (${description}).</h4>
                    <table width="100%" border=".5" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th width="40%" style="font:14px Arial,Helvetica,sans-serif;font-weight:bold;padding:13px 0px 13px 13px">From expenses </th>
                            <th width="40%" style="font:14px Arial,Helvetica,sans-serif;font-weight:bold;padding:13px 0px 13px 13px">To expenses</th>
                            <th width="40%" style="font:14px Arial,Helvetica,sans-serif;font-weight:bold;padding:13px 0px 13px 13px">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="40%" style="font:14px Arial,Helvetica,sans-serif;font-weight:bold;padding:13px 0px 13px 13px"> ${fromName} </td>
                            <td width="40%" style="font:14px Arial,Helvetica,sans-serif;font-weight:bold;padding:13px 0px 13px 13px"> ${toName} </td>
                            <td align="left" style="padding:13px 0px 13px 13px">${amount}</td>
                        </tr>
                    </tbody>
                    </table>
                    <br></br>
                        <span>Thanks & Regards</span><br></br>
                        <span>Money Management Team</span>`
        })
    } catch (error) {
        console.log(error)
    }    
}

module.exports={
    sendEmailReport
}