package com.ayush.canteen_food_api.Controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

// --- NEW IMPORTS ---
import com.ayush.canteen_food_api.Service.AdminOrderService;
import com.ayush.canteen_food_api.dto.VerifiedOrderRequest;
// --- END NEW IMPORTS ---


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    // --- NEW INJECTION ---
    @Autowired
    private AdminOrderService adminOrderService;
    // --- END NEW INJECTION ---

    // === ENDPOINT 1: CREATE ORDER (No changes needed here) ===
    @PostMapping("/create-order")
    @ResponseBody
    public String createOrder(@RequestBody Map<String, Object> data) {
        System.out.println("--- Create Order API hit ---");
        try {
            int amount = (int) Math.round(Double.parseDouble(data.get("amount").toString()) * 100);
            String receipt = data.get("receipt").toString();

            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", receipt);

            Order order = razorpayClient.orders.create(orderRequest);
            System.out.println("Order created: " + order.toString());
            return order.toString();

        } catch (RazorpayException e) {
            System.err.println("RazorpayException: " + e.getMessage());
            return "Error creating order: " + e.getMessage();
        }
    }


    // === ENDPOINT 2: VERIFY PAYMENT (MODIFIED) ===
    @PostMapping("/verify-payment")
    public ResponseEntity<String> verifyPayment(@RequestBody VerifiedOrderRequest orderRequest) {

        System.out.println("--- Verify Payment API hit ---");
        
        String razorpayOrderId = orderRequest.getRazorpay_order_id();
        String razorpayPaymentId = orderRequest.getRazorpay_payment_id();
        String razorpaySignature = orderRequest.getRazorpay_signature();

        try {
            // 1. Create a JSONObject with the payment details
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);

            // 2. Use the correct method signature
            Utils.verifyPaymentSignature(options, keySecret);

            // 3. If no exception is thrown, the signature is valid.
            System.out.println("Payment Verified Successfully!");

            // --- NEW LOGIC: SAVE TO DATABASE ---
            // 4. After verification, save the order to the database.
            try {
                adminOrderService.saveLiveOrder(orderRequest);
                System.out.println("Order saved to live_orders database.");
            } catch (Exception e) {
                System.err.println("CRITICAL: Payment verified but FAILED to save order to database!");
                e.printStackTrace();
                // Even if DB save fails, we must tell the client the payment was OK
                // But we must log this error aggressively.
                return ResponseEntity.status(500).body("Payment verified but order save failed. Contact support.");
            }
            // --- END NEW LOGIC ---

            return ResponseEntity.ok("Payment verified and order saved successfully");

        } catch (RazorpayException e) {
            // 5. If an exception is thrown, the signature is invalid.
            System.err.println("Signature verification failed! " + e.getMessage());
            return ResponseEntity.status(400).body("Payment verification failed: Invalid signature");
        }
    }
}