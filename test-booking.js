// Test script to verify booking API
const testBooking = async () => {
  try {
    const response = await fetch('http://localhost:3003/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingType: 'diagnostic',
        parentName: 'Test Parent',
        email: 'nikhilsinghcr7@gmail.com',
        phone: '1234567890',
        suburb: 'Melbourne',
        studentName: 'Test Student',
        yearLevel: 'Year 5'
      })
    });
    
    const result = await response.json();
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

testBooking();
