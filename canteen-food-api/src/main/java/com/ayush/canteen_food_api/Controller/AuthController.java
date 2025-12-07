package com.ayush.canteen_food_api.Controller;

import com.ayush.canteen_food_api.Entity.User;
import com.ayush.canteen_food_api.Repository.UserRepository;
import com.ayush.canteen_food_api.Service.JwtService;
import com.ayush.canteen_food_api.dto.JwtResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")

public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authManager,
                          UserRepository userRepo,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.authManager = authManager;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
//        user.setUsername(user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        user.setRole(user.getRole());
        userRepo.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody User user) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        var dbUser = userRepo.findByUsername(user.getUsername()).get();
        String token = jwtService.generateToken(dbUser.getUsername());

        return ResponseEntity.ok(new JwtResponse(token));
    }

}

