// import React, { useEffect, useState } from 'react';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import './checkoutForm.css'
// import useAuth from '../../hook/useAuth';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// const CheckoutForm = ({ booking }) => {
//     const{user}=useAuth()
//   console.log(booking)
//   const stripe = useStripe();
//   const elements = useElements();
// // 
// const [couponCode, setCouponCode] = useState('');
//   const [finalPrice, setFinalPrice] = useState(booking?.totalPrice|| 0);
//   const [error, setError] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const [clientSecret, setClientSecret] = useState('');
//  const queryClient = useQueryClient();


//  // 📌 1. Mutation: Get Stripe Client Secret
//   const createPaymentIntentMutation = useMutation({
//     mutationFn: (price) => axios.post('http://localhost:3000/create-payment-intent', { price }),
//     onSuccess: (res) => setClientSecret(res.data.clientSecret),
//     onError: () => Swal.fire('Error', 'Failed to initialize payment', 'error'),
//   });

//   useEffect(() => {
//     if (booking) {
//       createPaymentIntentMutation.mutate(finalPrice);
//     }
//   }, [booking, finalPrice]);

//    // 📌 2. Mutation: Apply Coupon
//   const couponMutation = useMutation({
//     mutationFn: (couponCode) => axios.post(`http://localhost:3000/coupons/${couponCode}`),
//     onSuccess: (res) => {
//       const { discount } = res.data;
//       if (discount) {
//         const discounted = booking.totalPrice - booking.totalPrice * (discount / 100);
//         const rounded = Math.round(discounted);
//         setFinalPrice(rounded);
//         Swal.fire('Coupon Applied!', `New price: ₹${rounded}`, 'success');
//       } else {
//         Swal.fire('Invalid Coupon', '', 'error');
//       }
//     },
//     onError: () => Swal.fire('Error', 'Failed to apply coupon', 'error'),
//   });

//   const handleApplyCoupon = () => {
//     if (couponCode) couponMutation.mutate(couponCode);
//   };
//   // 📌 3. Mutation: Save Payment to DB
//   const paymentMutation = useMutation({
//     mutationFn: (paymentData) => axios.post('http://localhost:3000/payments', paymentData),
//   });

//   // 📌 4. Mutation: Update Booking Status
//   const updateBookingMutation = useMutation({
//     mutationFn: (id) => axios.patch(`http://localhost:3000/bookings/${id}`, { status: 'confirmed' }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['approvedBookings']);
//     },
//   });

//   // 📌 Handle Stripe Payment
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setProcessing(true);
//     setError('');

//     const card = elements.getElement(CardElement);
//     const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card,
//     });

//     if (cardError) {
//       setError(cardError.message);
//       setProcessing(false);
//       return;
//     }

//     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: paymentMethod.id,
//       receipt_email: user?.email,
//     });

//     if (confirmError) {
//       setError(confirmError.message);
//       setProcessing(false);
//       return;
//     }

//     if (paymentIntent.status === 'succeeded') {
//       // ✅ Save Payment & Update Booking
//       const paymentData = {
//         email: user.email,
//         amount: finalPrice,
//         transactionId: paymentIntent.id,
//         courtType: booking.courtType,
//         date: booking.date,
//         slots: booking.slot,
//         bookingId: booking._id,
//         createdAt: new Date(),
//       };

//       await paymentMutation.mutateAsync(paymentData);
//       await updateBookingMutation.mutateAsync(booking._id);

//       Swal.fire('Payment Successful!', '', 'success');
//       navigate('/dashboard/confirmed-bookings');
//     }

//     setProcessing(false);
//   };

//   if (!booking) return <p className="text-center text-red-500">No booking selected.</p>;





//   return (
//     <>
//       <div className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Enter coupon code"
//           className="border px-2 py-1 rounded w-full"
//           value={couponCode}
//         onChange={(e) => setCouponCode(e.target.value)}
//         />
//        <button
//     onClick={() => couponMutation.mutate(couponCode)}
//     className="bg-blue-600 text-white px-3 py-1 rounded"
//   >
//     Apply
//   </button>
//       </div>
//     {/*  */}
//  <form onSubmit={handleSubmit}>
//     <input value={user.email} readOnly className="w-full border px-2 py-1 rounded" />
//         <input value={booking.courtType} readOnly className="w-full border px-2 py-1 rounded" />
//         <input
//   value={booking.slots.join(' -')}
//   readOnly
//   className="w-full border px-2 py-1 rounded"
// />
//         <input value={booking.date} readOnly className="w-full border px-2 py-1 rounded" />
//         <input value={`₹${finalPrice}`} readOnly className="w-full border px-2 py-1 rounded font-semibold" />
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
//       <button type="submit" disabled={!stripe || processing}>
//          {processing ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//     </>
   
//   );
// };

// export default CheckoutForm ;


import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './checkoutForm.css'
import useAuth from '../../hook/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';

const CheckoutForm = ({ booking }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()

  const [couponCode, setCouponCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(booking?.totalPrice || 0);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  // 1. Get Stripe client secret
  const createPaymentIntentMutation = useMutation({
    mutationFn: (price) => axiosSecure.post('/create-payment-intent', { price }),
    onSuccess: (res) => setClientSecret(res.data.clientSecret),
    onError: () => Swal.fire('Error', 'Failed to initialize payment', 'error'),
  });

  useEffect(() => {
    if (booking) {
      createPaymentIntentMutation.mutate(finalPrice);
    }
  }, [booking, finalPrice]);

  // 2. Apply coupon (GET request)
  const couponMutation = useMutation({
    mutationFn: (couponCode) => axiosSecure.get(`/couponsed/${couponCode}`),
    onSuccess: (res) => {
      const { discount } = res.data;
      if (discount) {
        const discounted = booking.totalPrice - booking.totalPrice * (discount / 100);
        const rounded = Math.round(discounted);
        setFinalPrice(rounded);
        Swal.fire('Coupon Applied!', `New price: ₹${rounded}`, 'success');
      } else {
        Swal.fire('Invalid Coupon', '', 'error');
      }
    },
    onError: (err) => {
      Swal.fire('Error', err?.response?.data?.message || 'Failed to apply coupon', 'error');
    },
  });

  const handleApplyCoupon = () => {
    if (couponCode.trim() !== '') {
      couponMutation.mutate(couponCode.trim());
    } else {
      Swal.fire('Please enter a coupon code', '', 'warning');
    }
  };

  // 3. Save payment
  const paymentMutation = useMutation({
    mutationFn: (paymentData) => axiosSecure.post('/payments', paymentData),
  });

  // 4. Update booking status
  const updateBookingMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/bookings/${id}`, { status: 'confirmed' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['approvedBookings']);
    },
  });

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    const card = elements.getElement(CardElement);

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (cardError) {
      setError(cardError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      receipt_email: user?.email,
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === 'succeeded') {
  const paymentData = {
    email: user.email,
    amount: finalPrice,
    transactionId: paymentIntent.id,
    courtType: booking.courtType,
    courttitle: booking.courttitle,
    date: booking.date,
    slots: booking.slot,
    bookingId: booking._id,
    createdAt: new Date(),
  };

  await paymentMutation.mutateAsync(paymentData);
  await updateBookingMutation.mutateAsync(booking._id);

  // ✅ Show alert and then navigate
 Swal.fire({
  title: 'Payment Successful!',
  icon: 'success',
  timer: 1500,
  showConfirmButton: false,
}).then(() => {
  navigate('/dashboard/confirmed-bookings');
});
}


    setProcessing(false);
  };

  if (!booking) return <p className="text-center text-red-500">No booking selected.</p>;
  return (
    <>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="border px-2 py-1 rounded w-full"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Apply
        </button>
      </div>

      {finalPrice !== booking.totalPrice && (
        <p className="text-green-600 font-semibold mb-4">Coupon Applied! New price: ${finalPrice}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input value={user.email} readOnly className="w-full border px-2 py-1 rounded mb-2" />
        <input value={booking.courtType} readOnly className="w-full border px-2 py-1 rounded mb-2" />
        <input
          value={booking.slots.join(' -')}
          readOnly
          className="w-full border px-2 py-1 rounded mb-2"
        />
        <input value={booking.date} readOnly className="w-full border px-2 py-1 rounded mb-2" />
        <input
          value={ `$${finalPrice}`}
          readOnly
          className="w-full border px-2 py-1 rounded font-semibold mb-4"
        />
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || processing || processing} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </>
  );
};

export default CheckoutForm;
