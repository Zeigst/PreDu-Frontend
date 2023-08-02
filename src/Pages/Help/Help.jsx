import React from "react";

const Help = () => {
  return (
    <main className="help">
      <h1>ChatBot Guide</h1>

      <div className="container">
        <h2>Please consider the following guides when interacting with our chatbot:</h2>
        <p>1. The chatbot can be slow sometimes. Please be patient and avoid sending another message until after the chatbot has finished answering your previous message.</p>
        <p>2. The chatbot does have power of ChatGPT. But to avoid wasting tokens in chat requests, it has been instructed to only answer questions related to the shop. You can still have small conversations, but don't expect to get answers of great value if the question is outside of the chatbot scope.</p>
        <p>3. Be specific with your question. The more specific your question is, the more acurate the answer. Vague questions have a higher chance of getting a wrong response.</p>
        <p>4. If you are not satisfy with the response, consider rephrasing your question.</p>
      </div>

      <div className="seperator"></div>

      <h1>Coupons Guide</h1>
      <div className="container">
        <h2>Please consider the following guides when using coupons:</h2>
        <p>1. Each Coupon has a required value that your order must meet to be able to apply.</p>
        <p>2. Each Coupon has a maximum value it can apply to your order. </p>
        <p>3. Each Coupon has a limited time it can be used. If you reach it, you won't be able to apply it to your order.</p>
        <p>4. You can always ask the chatbot for coupons to use. Remember to provide it the value of your order so it can search for valid coupons</p>
      </div>
    </main>
  )
}

export default Help