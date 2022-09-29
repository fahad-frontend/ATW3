# ATW3
All Things Web3 (ATW3) is a one stop shop for all things related to web3. From live coin prices to breaking news in the web3 world, use the site's simple interface to get your daily news fix.
  
## Functionalities added include:
[1] Ability to compare various metrics of the top 10 cryptocurrencies through a clean graphical representation.<br />
[2] Ability to see the latest tweets around the web3 hashtag taken directly from the Twitter API.<br />
[3] Ability to see excerpts from news articles from various sites and view them fully by clicking them. Infinite scrolling also added.<br />
[4] Caching has been done using Firestore database so that unnecessary API requests can be avoided.<br />
[5] Fully working express backend server for querying API and saving info to database. Fully responsive frontend in React.<br />


**Deployed site:** https://metaschool-atw3.netlify.app

**To run locally:**<br />
  *Frontend:* Open terminal => cd client => yarn => yarn start<br />
  *Server:* Open terminal => cd api => yarn => yarn start<br />
  You will also need to add the following keys to .env file in api root folder: <br />

    NEWS_API_KEY='5c9cqxzlxbzrvr5xf7wowvzcuhob4waeuyjsyict'
    PRICES_API_KEY='47ee41f5-9d81-43af-8657-ebf833b2ed8d'
    BEARER_TOKEN='AAAAAAAAAAAAAAAAAAAAAGBchgEAAAAAJhyF26onTNqCzZByen82NQFT0Tw%3DBC1IOK0xFCjtpSWRVfSAuQQuEP73pATJ0UKP7t60h1sgu4BUQs'
