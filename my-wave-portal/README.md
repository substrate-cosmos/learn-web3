# Wave Web3 Project




## add input box 

1. Create a new state variable like this
  const [tweetValue, setTweetValue] = React.useState("")

2. Add a textbox if the account is connected using this
        {
          currAccount ? (<textarea name="tweetArea"
            placeholder="type your tweet"
            type="text"
            id="tweet"
            value={tweetValue}
            onChange={e => setTweetValue(e.target.value)} />) : null
        }

3. Call the wave function using this text value
    const waveTxn = await waveportalContract.wave(tweetValue,{gasLimit:300000})


Here the onChange function changes the tweetValue state to the new state every time a change is made in the text box. Then once the state is set, you simply have to call Wave with the text.