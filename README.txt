Create REST API for ticketing payment.
Requirement :
● Use ExpressJS to create REST API
● Use SQL as a data store (MySQL, PostgreSQL, etc)
● Implement sequelize as an ORM

Features :
● User can register
○ Register must contain email, username, phone number, password, and password confirmation
○ Check if email or username is available (not duplicate)
○ Check if password and password confirmation have a same value
○ Password only valid if length is more than 8
● User can login to the apps
○ Email, username, or phone number could be used as a login process
○ Login success if email, username, or phone number and password is match
○ If email, username, or phone number used in login process input the wrong password three times,
the account would be suspended
● User can view all events
○ Show upcoming events only
○ Show events where ticket quota is still available

● User can buy ticket
○ User can buy only 3 tickets for each transaction
● User can see history transaction

Admin can login to the apps
○ Email, username, or phone number could be used as a login process
○ Login success if email, username, or phone number and password is match
○ If email, username, or phone number used in login process input the wrong password three times,
the account would be suspended
● Admin can create events
○ Admin must input event’s name
○ Admin must input date of event
○ Admin must input venue of event
○ Admin must input total of tickets quota
○ Admin must input price of event
○ *** Notes: You must record admin id on events table
● Admin can view users attendance from each event