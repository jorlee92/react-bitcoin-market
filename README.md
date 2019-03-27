
**React Crypto Market**

A nodeJS/Express/React/SQL site for trading crypto (virtually).

The backend is built using Express and Node, it uses a PostgresSQL database alongside sequelize for storing data. It also uses passportjs to support login and sessions, and connects to the CryptoCompare API to grab pricing data.

The current functionality that exists includes:

 - Account creation and the ability to log into an existing account.
 - You can purchase one of a select few cryptocurrencies (There are quite a few out there, so I selected some of the largest). These purchases come out of the starting balance you are given when signing up ($10,000)
 - You can view a up to date leaderboard that shows the value of each users crypto-portfolio in addition to their cash.
