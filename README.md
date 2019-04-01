Stores the evolution of metadata for a given set of accounts on Twitter.

# Configuration

In the file `.env`, specify your twitter credentials:
```
    CONSUMER_KEY=<TWITTER_CONSUMER_KEY>
    CONSUMER_SECRET=<TWITTER_CONSUMER_SECRET>
    ACCESS_TOKEN=<TWITTER_ACCESS_TOKEN>
    ACCESS_TOKEN_SECRET=<TWITTER_ACCESS_TOKEN_SECRET>
```

- Specify users to tracks in the array `accountsToFollow` in `accountsToFollow.js` file:
```
    const accountsToFollow = [
        ndpnt,
        matti_sg,
    ];
```

# Usage

Install dependencies:

```
    npm install
```

Start following accounts by running:
```
    node index.js
```

# Result

As result, the script stores users in a `twitterusers` collection.