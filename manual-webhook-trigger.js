// Manual webhook trigger for successful payment
const sessionData = {
  "id": "cs_live_b1IjsLwZ2pEGmylvC5kWIANazUeegW8jI01KH2EQNpAOAnBITIpi8lvgTB",
  "object": "checkout.session",
  "payment_status": "paid",
  "status": "complete",
  "metadata": {
    "courseAccess": "true",
    "courseId": "ai-copywriting-course",
    "source": "elira-course-platform",
    "userId": "s3oUvVBfihRNpZIbNVT9NxrZ5f92"
  },
  "customer_details": {
    "email": "marquesesacue@gmail.com",
    "name": "Görgei Márk"
  },
  "amount_total": 49950
};

// Call our webhook handler directly
fetch('https://api-5k33v562ya-ew.a.run.app/api/payment/webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'stripe-signature': 'fake_signature_for_manual_test'
  },
  body: JSON.stringify({
    type: 'checkout.session.completed',
    data: {
      object: sessionData
    }
  })
})
.then(response => response.json())
.then(data => console.log('Webhook response:', data))
.catch(error => console.error('Error:', error));